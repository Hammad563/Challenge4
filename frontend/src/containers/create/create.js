import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from "react-redux";
import 'react-quill/dist/quill.snow.css';
import { createAction } from "../../store/actions/postMethods";
import toast, { Toaster } from 'react-hot-toast';

const Create = (props) => {
    const {createErrors, redirect} = useSelector(state => state.PostReducer)
    const [currentImage, setImage] = useState('Choose Image');
    const [value, setValue] = useState('');
    const [slug, setSlug] = useState('');
    const [slugBtn, setSlugBtn] = useState(false);
    const [imagePreview, setImagePreview] = useState('')
    const [state, setState] = useState({
        title: '',
        image: ''
    })
    const dispatch = useDispatch();
    const {user: {_id, name}} = useSelector(state => state.AuthReducer)
    
    console.log('currentImg', currentImage)
    console.log('state', state)
    console.log('image', state.image);

    const filehandle = (e) => {
        if(e.target.files.length !== 0){
            setImage(e.target.files[0].name)

        setState({
            ...state,
            [e.target.name]: [e.target.files[0]],
        })
    
        const read = new FileReader();
        read.onloadend = () => {
            setImagePreview(read.result);
        }
        read.readAsDataURL(e.target.files[0])
        }
    }

    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        const createSlug = e.target.value.trim().split(' ').join('/');
        setSlug(createSlug);
    }

    console.log('state', state)
    const slugHandle = (e) => {
        setSlugBtn(true);
        setSlug(e.target.value);
    }
    const handleSlugUrl = (e) => {
        e.preventDefault();
        setSlug(slug.trim().split(' ').join('/'))
    }

    const createPost = (e) => {
        e.preventDefault();
       const {title, image} = state;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', value);
        formData.append('image', image);
        formData.append('slug', slug);
        formData.append('name', name);
        formData.append('id', _id);

        dispatch(createAction(formData))
    }

    useEffect( () =>{
        if(redirect){
            props.history.push('/dashboard')
        }

        if(createErrors.length !== 0){
            createErrors.map( (e) => toast.error(e.msg))
        }
    }, [createErrors, redirect])

  return (
    <Layout>
      <div className="create">
        <div className="contain1">
          <div className="row1">
            <div className="col-8 p-15">
            <form onSubmit={createPost}> 
            <Toaster position="top-center" reverseOrder={false} toastOptions={{
            style: {
             fontSize: "12px"
            },
            }} />
              <div className="card1">
              
                <h5 className="card1__h3">Create a new review</h5>
                
                    <div className="group">
                        <label className="label" htmlFor="title">Post Title</label>
                        <input type="text" name="title" id="title" value={state.title} onChange={handleInput} className="group__control" placeholder="Post Title..." />
                    </div>

                    <div className="group">
                        <label className="image1__label" htmlFor="image">Choose image</label>
                        <input type="file" name="image" id="image" className="group__control" onChange={filehandle} />
                        <p>{currentImage}</p>
                    </div>
                   
                   <div className="group">
                       <label htmlFor="body"></label>
                       <ReactQuill theme="snow" value={value} id="body" onChange={setValue}/>
                   </div>

                    <div className="group">
                        <input type="submit" value='Create Post' className="submitPost" />
                    </div>

                    
              </div>

                <div className="card1 p-15">
                    <div className="group">
                        <label htmlFor="slug">Post Url</label>
                        <input type="text" name="slug" id="slug" value={slug} onChange={slugHandle} className="group__control" placeholder="Url..."/>
                    </div>
                    <div className="group">
                         {slugBtn ? <button className="updateBtn" onClick={handleSlugUrl}>Update Url</button> : null}
                    </div>
                    <div className="group">
                    <label htmlFor="slug">Image Preview</label>
                        <div className="imagePreview">
                            {imagePreview ? <img src={imagePreview}></img> : ''}
                        </div>
                    </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
