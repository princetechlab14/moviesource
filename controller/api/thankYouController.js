const { MovieModel, ProfileModel } = require('../../models/index');

const getThankYou = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });
    try {
        const movies = await MovieModel.find({ creatorId: userId });
        const creatorIds = [...new Set(movies.map(m => m.creatorId.toString()))];
        const profiles = await ProfileModel.find({ creatorId: { $in: creatorIds } });
        return res.status(200).json({ profiles, movies });
    } catch (error) {
        console.error('Error fetching Thank You data:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getThankYou };