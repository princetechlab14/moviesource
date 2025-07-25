const { MovieModel } = require('../../models/index');
const Joi = require('joi');

const movieSchema = Joi.object({
    id: Joi.string().optional(),
    creatorId: Joi.string().required(),
    title: Joi.string().allow(null, '').optional(),
    description: Joi.string().allow(null, '').optional(),
    genre: Joi.string().allow(null, '').optional(),
    category: Joi.string().valid('Movie', 'Highlight', 'Thank you').allow(null, '').optional(),
    keywords: Joi.array().items(Joi.string()).optional(),
    originalUrl: Joi.string().uri().allow(null, '').optional(),
    hlsUrl: Joi.string().uri().allow(null, '').optional(),
    isThankYou: Joi.boolean().optional(),
    isHighlight: Joi.boolean().optional(),
});

const getAll = async (req, res) => {
    const { creatorId } = req.query;
    if (!creatorId) return res.status(400).json({ message: 'Missing creatorId' });

    try {
        const movies = await MovieModel.find({ creatorId });
        return res.status(200).json({ status: true, data: movies });
    } catch (e) {
        console.error("movies getAll =>", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


const create = async (req, res) => {
    const { error, value } = movieSchema.validate(req.body);
    if (error) return res.status(400).json({ status: false, message: error.message });
    try {
        const movie = new MovieModel(value);
        await movie.save();
        return res.status(200).json({ status: true, data: movie });
    } catch (e) {
        console.error("Movie create error=>", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await MovieModel.findById(id);
        if (!movie) return res.status(404).json({ status: false, message: 'Movie not found' });
        return res.status(200).json({ status: true, data: movie });
    } catch (e) {
        console.error("Movie getById =>", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


const update = async (req, res) => {
    const { error, value } = movieSchema.validate(req.body);
    if (error) return res.status(400).json({ status: false, message: error.message });

    try {
        const movie = await MovieModel.findByIdAndUpdate(value.id, value, { new: true });
        if (!movie) return res.status(404).json({ status: false, message: 'Movie Not Found' });
        return res.status(200).json({ status: true, data: movie });
    } catch (e) {
        console.error("Movie update error =>", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


const deleteMovieByParam = async (req, res) => {
    const { id } = req.params;
    return deleteMovieById(id, res);
};

const deleteMovieByQuery = async (req, res) => {
    const { id } = req.query;
    return deleteMovieById(id, res);
};


const uploadMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movies = await MovieModel.findById(movieId);
        if (!movies) return res.status(404).json({ status: false, message: 'Movie Not found' });
        const isAWS = process.env.FILE_STORAGE === "aws";
        const imageUrl = req.file
            ? isAWS
                ? req.file.location
                : `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
            : null;
        movies.originalUrl = imageUrl;
        await movies.save();
        return res.status(200).json(movies);
    } catch (e) {
        console.error("Movies uploadPicture => ", e);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


const getThankYouMovie = async (req, res) => {
    const { userId } = req.params;
    try {
        const movie = await MovieModel.findOne({ creatorId: userId, isThankYou: true });
        if (!movie) return res.status(404).json({ message: 'Thank you movie not found' });
        res.status(200).json(movie);
    } catch (err) {
        console.error('Error fetching thank you movie:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteMovieById = async (id, res) => {
    if (!id) return res.status(400).json({ message: 'Missing id' });

    try {
        const movie = await MovieModel.findByIdAndDelete(id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        return res.status(200).json(true);
    } catch (err) {
        console.error("Delete Movie error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const getAllMovies = async (req, res) => {
    const { creatorId } = req.params;
    try {
        const movies = await MovieModel.find({ creatorId });
        res.status(200).json(movies);
    } catch (err) {
        console.error("Get All Movies Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};


const getAllHighlights = async (req, res) => {
    const { creatorId } = req.params;
    try {
        const highlights = await MovieModel.find({ creatorId, isHighlight: true });
        res.status(200).json(highlights);
    } catch (err) {
        console.error("Get Highlights Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};


const getMyMovies = async (req, res) => {
    const { userId } = req.params;
    try {
        const movies = await MovieModel.findOne({ creatorId: userId });
        if (!movies) return res.status(404).json({ message: 'No movies found for user' });
        return res.status(200).json(movies);
    } catch (err) {
        console.error('Error fetching user movies:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getAll, create, getById, update, deleteMovieByParam, deleteMovieByQuery, uploadMovie, getThankYouMovie, getAllMovies, getAllHighlights, getMyMovies };