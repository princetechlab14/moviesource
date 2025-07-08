const { ProfileModel } = require('../../models/index');
const Joi = require('joi');
const { v4: uuidV4 } = require('uuid');

const profileSchema = Joi.object({
    creatorId: Joi.alternatives().try(Joi.string(), Joi.number().integer()).required(),
    displayName: Joi.string().allow(null, '').optional(),
    bio: Joi.string().allow(null, '').optional(),
    twitterId: Joi.string().allow(null, '').optional(),
    website: Joi.string().uri().allow(null, '').optional(),
    profileImageUrl: Joi.string().uri().allow(null, '').optional()
});

const updateProfileSchema = profileSchema.keys({ id: Joi.string().required() });

const create = async (req, res) => {
    const { error, value } = profileSchema.validate(req.body);
    if (error) return res.status(400).json({ status: false, message: error.message });
    const generatedId = uuidV4();
    try {
        const profile = await ProfileModel.create({ ...value, id: generatedId });
        return res.status(200).json(profile);
    } catch (e) {
        console.error("Profile create =>", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

const getProfile = async (req, res) => {
    const { creatorId } = req.params;
    try {
        const profile = await ProfileModel.findOne({ where: { creatorId } });
        if (!profile) return res.status(404).json({ status: false, message: 'Profile Not found' });
        return res.status(200).json(profile);
    } catch (e) {
        console.error("Profile getProfile =>", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

const update = async (req, res) => {
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ status: false, message: error.message });

    try {
        const profile = await ProfileModel.findByPk(value.id);
        if (!profile) return res.status(404).json({ status: false, message: 'Profile Not found' });

        await profile.update(value);
        return res.status(200).json(profile);
    } catch (e) {
        console.error("Profile update =>", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

const uploadPicture = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await ProfileModel.findByPk(id);
        if (!profile) return res.status(404).json({ status: false, message: 'Profile Not found' });
        profile.profileImageUrl = req.file ? req.file.location : null;
        await profile.save();
        return res.status(200).json(profile);
    } catch (e) {
        console.error("Profile uploadPicture => ", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

module.exports = { create, getProfile, update, uploadPicture };