const { MovieModel, NewsModel } = require('../../models/index');

const getHome = async (req, res) => {
    try {
        const movies = await MovieModel.find().sort({ createdAt: -1 }).limit(50);
        const news = await NewsModel.find().sort({ createdAt: -1 }).limit(50);
        res.status(200).json({ movies, news });
    } catch (error) {
        console.error("Home API Error:", err);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

module.exports = { getHome };