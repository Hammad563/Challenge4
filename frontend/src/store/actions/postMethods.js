import axios from 'axios';
import { CLOSE_LOADER, CREATE_ERRORS, CREATE_POST, DISPLAY_POSTS, MESSAGE, REDIRECT_TRUE, REMOVE_ERRORS, SET_COMMENTS, SET_DETAILS, SET_LOADER } from '../Constants/PostConstants';




export const createAction = (postData) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token}} = getState();

        dispatch({type: SET_LOADER})
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const {data: {msg}} = await axios.post('/createPost', postData, config);
            dispatch({type: CLOSE_LOADER})
            dispatch({type: REMOVE_ERRORS})
            dispatch({type: REDIRECT_TRUE})
            dispatch({type: MESSAGE, payload: msg})
            
        }catch (error){
            const {errors} = error.response.data;
            console.log(error.response)
            dispatch({type: CLOSE_LOADER})
            dispatch({type: CREATE_ERRORS, payload: errors})
        }
    }
}

export const fetchPosts = (id, page) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token}} = getState();
        dispatch({type: SET_LOADER})
        try{
            const config = { headers: {Authorization: `Bearer ${token}`}}
            const {data: {response, count, maxPage}} = await axios.get(`/posts/${id}/${page}`, config)
            dispatch({type: CLOSE_LOADER})
            dispatch({type: DISPLAY_POSTS, payload: {response, count, maxPage}})
            console.log("data",response);
        }catch(error){
            dispatch({type: CLOSE_LOADER});
        }
    }
}

export const postDetails = (id) =>{
    return async (dispatch,getState) => {
        const {AuthReducer: {token}} = getState();
        dispatch({type: SET_LOADER});
        try{
            const config = { headers: {Authorization: `Bearer ${token}`}}
            const {data: {post, comments}} = await axios.get(`/details/${id}`, config);
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_DETAILS, payload: post})
            dispatch({type: SET_COMMENTS, payload: comments})
        }catch(error){
            dispatch({type: CLOSE_LOADER})
            console.log(error)
        }
    }
}


export const commentAction = (commentInfo) => {
    return async(dispatch,getState) => {
        const {AuthReducer: {token}} = getState();
        const config = { headers: {Authorization: `Bearer ${token}`}};
        dispatch({type: SET_LOADER});
        try{
            const{data} = await axios.post(`/comment`, commentInfo, config)
            dispatch({type: CLOSE_LOADER});
            console.log("data is",data);
        }catch(error){
            dispatch({type: CLOSE_LOADER});
            console.log(error);
        }
    }
    
}