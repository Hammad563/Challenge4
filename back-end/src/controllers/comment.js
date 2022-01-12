const CommentSchema = require('../models/comment');

// comment api

module.exports.postComment = async (req,res) => {
    const {id,comment, userName} = req.body;
   
    try{
        const response = await CommentSchema.create({postId: id, comment, userName})
        
        return res.status(200).json({msg: 'Comment Created'})
    }catch(error){
        return res.status(400).json({errors: error, msg: error.message})
    }
    
}