import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux';

const RouteL = (props) => {
    const {user} = useSelector(state => state.AuthReducer)
    return user ? (<Redirect to='/'></Redirect>) 
    : (<Route path={props.path} exact={props.exact} component={props.component}></Route>)
}

export default RouteL