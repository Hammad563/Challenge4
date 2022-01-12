import { CLOSE_LOADER, CREATE_ERRORS, DISPLAY_POSTS, MESSAGE, REDIRECT_FALSE, REDIRECT_TRUE, REMOVE_ERRORS, REMOVE_MESSAGE, SET_COMMENTS, SET_DETAILS, SET_LOADER } from "../Constants/PostConstants";

const initState=  {
    loading: false,
    createErrors: [],
    redirect: false,
    message: '',
    posts: [],
    maxPage: 0,
    count: 0,
    details: {},
    comments: []
}


export const PostReducer = (state = initState,action) => {
     if(action.type === SET_LOADER){
         return {
             ...state,
             loading: true
         }
     } else if (action.type === CLOSE_LOADER){
         return {
             ...state,
             loading:false
         }
     } else if(action.type === CREATE_ERRORS){
         return{
             ...state,
             createErrors: action.payload
         }
     } else if(action.type === REDIRECT_TRUE){
         return{
             ...state,
             redirect: true
         }
     } else if(action.type === REDIRECT_FALSE){
         return{
             ...state,
             redirect: false
         }
     } 
     else if(action.type === MESSAGE){
         return{
             ...state,
             message: action.payload
         }
     } else if(action.type === REMOVE_MESSAGE){
         return{
             ...state,
             message: ''
         }
     }
      else if(action.type === REMOVE_ERRORS){
         return{
             ...state,
             createErrors: []
         }
     } else if (action.type === SET_DETAILS){
        return{
            ...state,
            details: action.payload
        }
     } else if(action.type === SET_COMMENTS){
         return{
             ...state,
            comments: action.payload
         }
     }
      else {
        return state;
     }
}


export const FetchPosts = (state = initState, action) => {
    if( action.type === DISPLAY_POSTS){
        return {
            ...state,
            posts: action.payload.response,
            count: action.payload.count,
            maxPage: action.payload.maxPage
        }
    } else{
        return state;
    }
}