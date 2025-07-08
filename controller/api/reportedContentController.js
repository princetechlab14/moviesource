const { ReportedContentModel } = require('../../models/index');
const Joi = require('joi');

const reportedContentSchema = Joi.object({
    movieId: Joi.string().required(),
    username: Joi.string().required(),
    comment: Joi.string().required(),
});

const reportContent = async (req, res) => {
    const { error, value } = reportedContentSchema.validate(req.body);
    if (error) return res.status(400).json({ status: false, message: error.message });
    try {
        const report = await ReportedContentModel.create(value);
        return res.status(200).json({ status: true, data: report });
    } catch (e) {
        console.error("Error reporting content:", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

module.exports = { reportContent };