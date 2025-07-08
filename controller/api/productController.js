const Joi = require('joi');
const { MyProductModel } = require('../../models/index');

const productSchema = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().optional(),
    quantity: Joi.number().integer().min(1).required()
});

const getUserProducts = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });

    try {
        const products = await MyProductModel.findAll({ where: { userId } });
        return res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching user products:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const createProduct = async (req, res) => {
    const { error, value } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        await MyProductModel.create(value);
        return res.status(200).json(true);
    } catch (err) {
        console.error('Error creating product:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { getUserProducts, createProduct };