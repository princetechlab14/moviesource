const { MovieModel, ProfileModel } = require('../../models/index');

const getThankYou = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });
    try {
        const movies = await MovieModel.findAll({ where: { creatorId: userId } });
        const creatorIds = [...new Set(movies.map(m => m.creatorId))];
        const profiles = await ProfileModel.findAll({ where: { creatorId: creatorIds } });
        return res.status(200).json({ profiles, movies });
    } catch (error) {
        console.error('Error fetching Thank You data:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getThankYou };