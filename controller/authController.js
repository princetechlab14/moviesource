const { AdminModel } = require('../models/index');
const { generateHashPassword, passwordCompare, generateToken } = require('../services/passwordUtils');

const getRegister = (req, res) => {
    res.render("register", { title: "Register", error: "" });
};

const register = async (req, res) => {
    const { name, email, password, repeatPassword } = req?.body;

    if (password !== repeatPassword || password.length < 8) {
        return res.render("register", {
            title: "Register",
            error: "Password must match and be at least 8 characters.",
            oldVal: { name, email }
        });
    }

    try {
        const existingUser = await AdminModel.findOne({ email });
        if (existingUser) {
            return res.render("register", {
                title: "Register",
                error: "Email already exists.",
                oldVal: { name, email }
            });
        }
        const hashPassword = await generateHashPassword(password, 8);
        const newUser = new AdminModel({
            name,
            email,
            password: hashPassword
        });
        await newUser.save();
        res.redirect("/admin/login");
    } catch (error) {
        console.error("Register Error:", error);
        res.render("register", {
            title: "Register",
            error: "Server error occurred.",
            oldVal: { name, email }
        });
    }
};

const getLogin = (req, res) => {
    res.render("login", { title: "Login", error: "" });
};

const login = async (req, res) => {
    const { email, password: pwd } = req?.body;
    try {
        const user = await AdminModel.findOne({ email, status: "Active" }).select("id name email password status");
        if (!user) {
            return res.render("login", {
                title: "Login",
                error: "Credential not valid."
            });
        }

        const isValid = await passwordCompare(pwd, user.password);
        if (!isValid) {
            return res.render("login", {
                title: "Login",
                error: "Credential not valid."
            });
        }

        const token = await generateToken(user);
        res.cookie("_gmtls", token);
        res.redirect("/admin/");
    } catch (err) {
        console.error("Login Error:", err);
        res.render("login", {
            title: "Login",
            error: "An error occurred during login."
        });
    }
};

const logout = (req, res) => {
    res.clearCookie("_gmtls");
    res.redirect("/");
};

const profileGet = async (req, res) => {
    const authId = req?.auth?.id;
    try {
        let query = {
            where: { id: authId, status: "Active" },
            attributes: ["id", "name", "email", "password"],
        };
        const admin = await AdminModel.findOne(query);
        if (admin) {
            res.render("profile", { title: "Update Profile", admin, error: "" });
        } else {
            res.redirect("/admin");
        }
    } catch (error) {
        console.error("Error fetching admin profile details:", error);
        res.redirect('/admin');
    }
};

const profileUpdate = async (req, res) => {
    const { id } = req.auth;
    const { name, password } = req.body;
    try {
        const admin = await AdminModel.findOne({ where: { id } });
        if (admin) {
            admin.name = name;
            if (password) {
                admin.password = await generateHashPassword(password, 10);
            }
            await admin.save();
            res.redirect("/admin/profile");
        } else {
            res.render("profile", {
                title: "Update Profile Page",
                admin: null,
                error: "Admin not found",
            });
        }
    } catch (error) {
        console.error("Error updating admin details:", error);
        res.render("profile", {
            title: "Update Profile Page",
            admin: null,
            error: "Internal server error",
        });
    }
};

module.exports = { getLogin, getRegister, register, login, logout, profileGet, profileUpdate };