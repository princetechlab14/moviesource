const { ReactionModel } = require('../../models/index');
const Joi = require('joi');

const movieIdSchema = Joi.object({ movieId: Joi.string().required() });

const reactionSchema = Joi.object({
    id: Joi.string().optional(),
    movieId: Joi.string().required(),
    userId: Joi.string().required(),
    name: Joi.string().required(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
});

const handlePostReaction = async (req, res) => {
    try {
        const body = req.body;

        // 1. If only movieId present → Fetch reactions
        if ('movieId' in body && Object.keys(body).length === 1) {
            const { error } = movieIdSchema.validate(body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const reactions = await ReactionModel.find({ movieId: body.movieId });
            return res.status(200).json({ reactions, count: reactions.length });
        }

        // 2. Otherwise → Create new reaction
        const { error } = reactionSchema.validate(body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        await ReactionModel.create(body); // Use `.create()` instead of `.insert()` in Mongoose
        return res.status(200).json(true);

    } catch (err) {
        console.error('POST /api/reaction failed:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateReaction = async (req, res) => {
    const { error, value } = reactionSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ errors: error.details.map(d => d.message) });

    try {
        const { id } = value;
        if (!id) return res.status(400).json({ message: 'Reaction ID is required' });

        const reaction = await ReactionModel.findByPk(id);
        if (!reaction) return res.status(404).json({ message: 'Reaction not found' });

        await reaction.update(value);
        return res.status(200).json({ success: true, reaction });
    } catch (err) {
        console.error('Update Reaction Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteReaction = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'Reaction ID is required' });

    try {
        const reaction = await ReactionModel.findByPk(id);
        if (!reaction) return res.status(404).json({ message: 'Reaction not found' });

        await reaction.destroy();
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Delete Reaction Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { updateReaction, deleteReaction, handlePostReaction };