const { MovieModel, NewsModel } = require('../../models/index');

const getHome = async (req, res) => {
    try {
        const movies = await MovieModel.findAll({ limit: 50, order: [['createdAt', 'DESC']] });
        const news = await NewsModel.findAll({ limit: 50, order: [['createdAt', 'DESC']] });
        res.status(200).json({ movies, news });
    } catch (error) {
        console.error("Home API Error:", err);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

module.exports = { getHome };