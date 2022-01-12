import React from "react";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";

const Comments = ( {comments}) => {
     return comments.length > 0 ? comments.map( (comment => (
         
        <div className="commentSection">
        <div className="post__header">
                         <div className="post__header__avator">
                           {comment.userName ? comment.userName[0] : ""}
                         </div>
                         <div className="post__header__user">
                           <span>{comment.userName}</span>
                         </div>
                       </div>
            <div className="comment__body">
                {comment.comment}
            <GoThumbsup className="LikeButton" ></GoThumbsup>
            
            </div>
    </div>

     ))) : 'No Comments'
       
    
}

export default Comments;