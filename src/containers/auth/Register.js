import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout';
import { postRegister } from '../../store/actions/authActions';
import toast, { Toaster } from 'react-hot-toast';
import { withRouter } from 'react-router'


const Register = (props) => {
  
    const dispatch = useDispatch();
    const {loading, registerErrors, user} = useSelector(state => state.AuthReducer);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInputs = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const SubmitForm = async (e) => {
        e.preventDefault();
        dispatch(postRegister(state));
        
    }


    useEffect( () => {
      registerErrors.map( (error) => (toast.error(error.msg)));

      if(user){
       props.history.push('/')
      }
    }, [registerErrors, user])

    return (
      <>
        <Layout>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{
    style: {
      fontSize: "12px"
    },
  }} />
          <div className="container2">
            <div className="account">
              <div className="title1">Sign Up</div>
              <div className="account__section">
                <form onSubmit={SubmitForm}>
                  <div className="group">
                    <input
                      className="group__control"
                      value={state.name}
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      onChange={handleInputs}
                    ></input>
                  </div>
                  <div className="group">
                    <input
                      className="group__control"
                      value={state.email}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={handleInputs}
                    ></input>
                  </div>
                  <div className="group">
                    <input
                      className="group__control"
                      value={state.password}
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      onChange={handleInputs}
                    ></input>
                  </div>
                  <div className="group">
                    <input
                      className="btn1 btn-default btn-block"
                      type="submit"
                      value={loading ? "..." : "Register" }
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
}
export default Register;
