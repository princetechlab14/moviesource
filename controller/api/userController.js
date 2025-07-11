const  UserModel = require('../../models/userModel');
const Joi = require('joi');
const { hashPassword, generateJWTToken, comparePassword } = require('../../services/passwordUtils');


const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const SignUp = async (req, res) => {
    try {
        const { error, value } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, userName, password } = value;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered.' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new UserModel({ email, userName, password: hashedPassword });
        await newUser.save();
        const token = await generateJWTToken({ id: newUser.id, email, userName });
        return res.status(201).json({ userId: newUser.id, userName, token });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

const SignIn = async (req, res) => {
    try {
        const { error, value } = signInSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = value;

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await comparePassword(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await generateJWTToken({ id: existingUser.id, email: existingUser.email, userName: existingUser.userName });
        return res.status(201).json({ userId: existingUser.id, userName: existingUser.userName, token });
    } catch (err) {
        console.error('Sign-in error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { SignUp, SignIn };