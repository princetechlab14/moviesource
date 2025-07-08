const { MovieModel, ProfileModel, ReactionModel } = require('../../models/index');

const getPlayer = async (req, res) => {
    const { movieId } = req.query;
    if (!movieId) return res.status(400).json({ message: 'Missing movieId' });

    try {
        const movie = await MovieModel.findByPk(movieId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        const profile = await ProfileModel.findByPk(movie.creatorId);
        const reactions = await ReactionModel.findAll({ where: { movieId } });
        return res.status(200).json({ profile, movie, reactions });
    } catch (error) {
        console.error("Get Player error:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getPlayer };