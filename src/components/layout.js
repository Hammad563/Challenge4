
import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import Navbar from './navbar/Navbar'

const Layout = (props) => {
    return (
        <Fragment>
            <Navbar></Navbar>
            {props.children}
        </Fragment>
    )
}

export default Layout
