const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs  = require('fs');
const Post = require('../models/post');
const CommentSchema = require('../models/comment');

// creating a post API
module.exports.createPost = (req,res) => {

    const form = formidable({multiples: true});
    form.parse(req, async (err, fields, files) => {
        const {title, body,slug,id,name, image} = fields;
        
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Title is required please'})
        }
        if(body === ''){
            errors.push({msg: 'Post data is required please'})
        }
        if(slug === ''){
            errors.push({msg: 'Slug is required please'})
        }
        const checkSlug = await Post.findOne({slug});
        if(checkSlug){
            errors.push({msg: 'Please choose a unique URL'})
        }
        if(errors.length !== 0){
            return res.status(400).json({errors, files})
        } else if (errors.length == 0){
                try{
                    const response  = await Post.create({
                        title,
                        body,
                        slug,
                        image,
                        userName: name,
                        userId: id
                    });
                    return res.status(200).json({msg: 'Your post has been created!', response})
                }catch (error){
                    return res.status(500).json({errors: error})
                }
        }
    })
}
// retrieving Posts API
module.exports.fetchPosts = async (req,res) => {
    const id = req.params.id;
    const page = req.params.page;
    const maxPage = 5;
    const skip = (page - 1) * maxPage;
    try{
        const count = await Post.find({userId: id}).countDocuments();
        const response = await Post.find({userId: id}).skip(skip).limit(maxPage).sort({updatedAt: -1})
        return res.status(200).json({response: response, count, maxPage})
    }catch (error) {
        return res.status(500).json({errors: error})
    }
}

// deleting Posts API
module.exports.deletePost = async (req, res) => {
    const ids = req.params.id;
    console.log(ids)
    try{
        const response = await Post.findByIdAndRemove(ids)
        return res.status(200).json({msg: 'Post has been deleted'})
    }catch(error){
        return res.status(500).json({errors: error})
    }
}

// post details API
module.exports.details = async (req,res) => {
    const id = req.params.id;
    
    try{
        const post = await Post.findOne({_id: id})
        const comments = await CommentSchema.find({postId: post._id}).sort({updatedAt: -1})
        return res.status(200).json({post, comments})
    }catch(error){
        return res.status(500).json({errors: error})
    }
}




