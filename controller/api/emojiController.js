const { EmojiModel } = require('../../models/index');

const getUserEmojis = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    try {
        const emojis = await EmojiModel.findAll({ where: { userId } });
        return res.status(200).json(emojis);
    } catch (err) {
        console.error('Error fetching emojis:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getUserEmojis };