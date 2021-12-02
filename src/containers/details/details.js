import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import Layout from "../../components/layout";
import { commentAction, postDetails } from "../../store/actions/postMethods";
import { htmlToText } from 'html-to-text';
import { useState } from "react";
import Comments from "./comments";
const Details = () => {
    const {id} = useParams();
    const {loading, details, comments} = useSelector(state => state.PostReducer);
    const {user} = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch();

    const [comment, setComment] = useState('')
    
    const addComment = (e) => {
        e.preventDefault();
        dispatch(commentAction({id: details._id, comment, userName: user.name }))
        setComment('');
    }

    useEffect( () => {
    dispatch(postDetails(id));
    }, [id]) 

    return (
      <>
        <Layout>
          <div className="container1">
            <div className="row mt-50">
              <div className="col-8">
                {!loading ? (
                  <>
                    <h1 className="p-1 mx-auto text-center">Review Details</h1>
                    <div className="post">
                      <div className="post__details">
                        <div className="post__header">
                          <div className="post__header__avator">
                            {details.userName ? details.userName[0] : ""}
                          </div>
                          <div className="post__header__user">
                            <span>{details.userName}</span>
                          </div>
                        </div>
                        <div className="post__body">
                          <h1 className="post__body__title">{details.title}</h1>
                          <div className="post__body__details">
                            {htmlToText(details.body)}
                          </div>
                        </div>
                      </div>
                      {user ? (
                        <>
                            <h3>Comments ({comments.length})</h3>
                          <Comments comments = {comments}></Comments>
                          <div className="post__comment">
                            <form onSubmit={addComment}>
                              <div className="group">
                                <input
                                  type="text"
                                  className="group__control"
                                  onChange={(e) => setComment(e.target.value)}
                                  value={comment}
                                  placeholder="Comment..."
                                />
                                <div className="group py-3">
                                  <input type="submit" className="updateBtn" />
                                </div>
                              </div>
                            </form>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  "...loading"
                )}
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
}
export default Details;