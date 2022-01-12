import React from  'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { CLOSE_LOADER, MESSAGE, REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER } from '../../store/Constants/PostConstants';
import toast, { Toaster } from 'react-hot-toast';
import Layout from '../../components/layout';
import { fetchPosts } from '../../store/actions/postMethods';
import { Link, useParams } from 'react-router-dom';
import { BsPencilFill} from "react-icons/bs";
import {BsFillTrash2Fill} from "react-icons/bs";
import Pagination from '../pagination';
import axios from 'axios';


const Blog = () => {
    const {redirect, message, loading} = useSelector(state => state.PostReducer)
    const {user: {_id}, token} = useSelector(state => state.AuthReducer);
    const {posts, count, maxPage} = useSelector(state => state.FetchPosts);
    let {page} = useParams();
    if(page === undefined){
        page = 1;
    }

    console.log('myposts', posts)
    const dispatch = useDispatch();

    const deletePost = async (id) => {
        const confirm = window.confirm("Are you sure?")
        if(confirm){
            dispatch({type: SET_LOADER})
            try{
            const config = { headers: {Authorization: `Bearer ${token}`}}
               const {data: {msg}} = await axios.get(`/delete/${id}`, config);
               dispatch(fetchPosts(_id, page));
               dispatch({type: MESSAGE, payload: msg})
            }catch(error){
                dispatch({type: CLOSE_LOADER})
                console.log(error)
            }
        }
    }

    useEffect( () => {
        if(redirect){
            dispatch({type: REDIRECT_FALSE})
        }
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_MESSAGE})
        }
        
    }, [message]);

    useEffect( () => {
        dispatch(fetchPosts(_id, page))
    }, [page])
    posts.map( (post) => {
        console.log('slug', post.slug)
    })
    
    return(
        <>
            <Layout>  
            <Toaster position="top-center" reverseOrder={false} toastOptions={{
                style: {
                fontSize: "12px"
                },
                }} />
                <h1 className='p-1 mx-auto text-center'>Your Posts</h1>
                <ul className="navbar-nav align-items-center navbar-opt">
                 <li className="nav-item ms-5">
                     <Link to="/create" className="nav-link opt text-center" style={{marginLeft: '400px', fontSize: '16px'}}>
                        Create a Review
                    </Link>
                 </li>
                </ul>
                <div className='container1 mt-30'>
                    <div className='row'>
                       
                        <div className='col-9'>
                            {!loading ? posts.length > 0 ? posts.map( (post) => (
                                <div className='dashboard__posts' key={post._id}>
                                    <div className='dashboard__posts__title'>
                                        <Link to={`/details/${post._id}`}>{post.title}</Link>
                                    </div>
                                    <div className='dashboard__posts__links'>
                                        <Link to='/'> <BsPencilFill className='iconblog'></BsPencilFill> </Link>
                                        <BsFillTrash2Fill className='iconblog' onClick={ () => deletePost(post._id)}></BsFillTrash2Fill>
                                    </div>
                                </div>
                            )) : 'You have no posts' : 'loading...'}
                            <Pagination page={page} maxPage={maxPage} count={count}></Pagination>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default Blog;