const { PostModel } = require('../../models/index');
const { deleteLocalFile, deleteObjS3 } = require('../../services/fileupload');

const createPost = async (req, res) => {
    try {
        const { userId } = req.params;
        const { title = null, description = null } = req.body;
        const isAWS = process.env.FILE_STORAGE === 'aws';

        const imageFiles = req.files && req.files.image ? req.files.image : [];
        const videoFiles = req.files && req.files.video ? req.files.video : [];

        // Map file URLs
        const imageUrls = imageFiles.map(file => isAWS ? file.location : `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        const videoUrls = videoFiles.map(file => isAWS ? file.location : `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

        const newPost = new PostModel({ userId, title, description, image: imageUrls.length > 0 ? imageUrls : [], video: videoUrls.length > 0 ? videoUrls : [] });
        const savedPost = await newPost.save();
        return res.status(201).json({ status: true, message: 'Post created successfully', post: savedPost.toJSON() });
    } catch (err) {
        console.error('❌ createPost error:', err);
        return res.status(500).json({
            status: false,
            message: 'Server error while creating post'
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const isAWS = process.env.FILE_STORAGE === 'aws';

        const imageFiles = req.files?.image || [];
        const videoFiles = req.files?.video || [];

        const imageUrls = imageFiles.map(file => isAWS ? file.location : `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        const videoUrls = videoFiles.map(file => isAWS ? file.location : `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ status: false, message: 'Post not found' });

        post.image = [...new Set([...(post.image || []), ...imageUrls])];
        post.video = [...new Set([...(post.video || []), ...videoUrls])];
        await post.save();

        return res.status(200).json({ status: true, message: 'Post media updated successfully', post: post.toJSON() });
    } catch (err) {
        console.error('❌ updatePost error:', err);
        return res.status(500).json({ status: false, message: 'Server error while updating media' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 });
        return res.status(200).json({ status: true, posts });
    } catch (err) {
        console.error('❌ getAllPosts error:', err);
        return res.status(500).json({ status: false, message: 'Server error while fetching posts' });
    }
};

const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ status: false, message: 'Post not found' });

        return res.status(200).json({ status: true, post });
    } catch (err) {
        console.error('❌ getPostById error:', err);
        return res.status(500).json({ status: false, message: 'Server error while fetching post' });
    }
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const isAWS = process.env.FILE_STORAGE === 'aws';

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ status: false, message: 'Post not found' });

        const allMedia = [...(post.image || []), ...(post.video || [])];
        for (const url of allMedia) {
            if (isAWS) {
                await deleteObjS3(url);
            } else {
                deleteLocalFile(url);
            }
        }
        await PostModel.findByIdAndDelete(postId);
        return res.status(200).json({ status: true, message: 'Post and media deleted successfully' });
    } catch (err) {
        console.error('❌ deletePost error:', err);
        return res.status(500).json({ status: false, message: 'Server error while deleting post' });
    }
};

const toggleLikePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { id } = req.user;

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ status: false, message: 'Post not found' });

        const alreadyLiked = post.likes.includes(id);
        if (alreadyLiked) {
            post.likes.pull(id);
        } else {
            post.likes.push(id);
        }

        await post.save();
        return res.status(200).json({
            status: true,
            message: alreadyLiked ? 'Post unliked' : 'Post liked',
            likeCount: post.likes.length,
        });
    } catch (err) {
        console.error('❌ toggleLikePost error:', err);
        return res.status(500).json({ status: false, message: 'Server error while liking post' });
    }
};

const toggleSharePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { id } = req.user;

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ status: false, message: 'Post not found' });

        const alreadyShared = post.shares.includes(id);
        if (alreadyShared) {
            post.shares.pull(id);
        } else {
            post.shares.push(id);
        }

        await post.save();
        return res.status(200).json({
            status: true,
            message: alreadyShared ? 'Post unshared' : 'Post shared',
            shareCount: post.shares.length,
        });
    } catch (err) {
        console.error('❌ toggleSharePost error:', err);
        return res.status(500).json({ status: false, message: 'Server error while sharing post' });
    }
};

const deletePostMedia = async (req, res) => {
    try {
        const { postId } = req.params;
        const { mediaUrl } = req.body;

        if (!mediaUrl) return res.status(400).json({ status: false, message: 'mediaUrl is required' });

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ status: false, message: 'Post not found' });

        // Check and remove from image or video arrays
        const isImage = post.image.includes(mediaUrl);
        const isVideo = post.video.includes(mediaUrl);

        if (!isImage && !isVideo) return res.status(400).json({ status: false, message: 'Media URL not found in post' });

        if (isImage) post.image = post.image.filter(url => url !== mediaUrl);
        if (isVideo) post.video = post.video.filter(url => url !== mediaUrl);

        await post.save();
        await deleteObjS3(mediaUrl);
        deleteLocalFile(mediaUrl);

        return res.status(200).json({
            status: true,
            message: 'Media deleted successfully',
            post: post.toJSON()
        });

    } catch (err) {
        console.error('❌ deletePostMedia error:', err);
        return res.status(500).json({ status: false, message: 'Server error while deleting media' });
    }
};

module.exports = { createPost, updatePost, getAllPosts, getPostById, deletePost, toggleLikePost, toggleSharePost, deletePostMedia };