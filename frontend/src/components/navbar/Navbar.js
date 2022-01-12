import React, { useState} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import {useDispatch, useSelector} from 'react-redux'
import logo from "../../img/ShopX-logo.png";
import "./navbar.css";
import { ButtonContainer } from "../card/button";
import { LOGOUT } from "../../store/Constants/AuthConstants";
import { FaSearch } from "react-icons/fa";


const Navbar = (props) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [search, setSearch] = useState('');
  
  const {user} = useSelector(state => state.AuthReducer)
  const dispatch = useDispatch();
  
  const logout = () =>{
    localStorage.removeItem("myToken");
    dispatch({ type: LOGOUT })
  }

  const Links = user ? (
    <NavWrapper className="navbar navbar-expand-sm px-sm-5 py-3 navContain">
      <Link to="/" className="">
        <img className="navbar-brand" src={logo} alt="" />
      </Link>

      <ul className="navbar-nav align-items-center navbar-opt">
        <li className="nav-item ms-5 opt">
          <Link to="/Products" className="nav-link opt">
            products
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav align-items-center navbar-opt">
        <li className="nav-item ms-5 opt">
          <Link to="/About" className="nav-link opt">
            About us
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav align-items-center navbar-opt">
        <li className="nav-item ms-5">
          <Link to="/faq" className="nav-link opt">
            FAQ
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav align-items-center navbar-opt">
        <li className="nav-item ms-5">
        <div class="wrap">
            <div class="search">
                <input
                    placeholder="What are you looking for?"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="searchTerm"
                    id="input_text"
                ></input>
                <button type="submit" className="searchButton">
                    <FaSearch></FaSearch>
                </button>
            </div>
        </div>
        </li>
      </ul>

      <ul className="navbar-nav align-items-center navbar-opt">
        <li className="nav-item ms-5">
          <Link to="/dashboard" className="nav-link opt">
           Dashboard
          </Link>
        </li>
      </ul>


      <Link to="/cart" className="ms-5 navbar-nav ">
        <ButtonContainer>
          <span className="me-2">
            <i className="fas fa-cart-plus"></i>
          </span>
          my cart
        </ButtonContainer>
      </Link>

      <div>
        <Link to="/login" className="ms-auto">
          <span onClick={logout}>Log Out</span>
        </Link>
        <div>{user.name}</div>
      </div>
    </NavWrapper>
  ) : (

    <NavWrapper className="navbar navbar-expand-sm px-sm-5 py-2">
    <img className="navbar-brand" src={logo} alt="" />
   
     <ul className="navbar-nav navbar-opt">
       <li className="nav-item  opt">
         <Link to="/About" className="nav-link opt">
           About us
         </Link>
       </li>
     </ul>

     <ul className="navbar-nav navbar-opt">
       <li className="nav-item">
         <Link to="/faq" className="nav-link opt">
           FAQ
         </Link>
       </li>
     </ul>

    <div className="moveToRight"> 
    <Link to="/Register" className="nav-link">
           Sign Up
         </Link>

   
      <Link to="/Login" className="nav-link">
           Login
    </Link>
    </div>
       
   </NavWrapper>

  );

  return (
    <>
     {Links}
    </>
  );
};

const NavWrapper = styled.nav`
background: none;
background-color: transparent;
z-index: 3;
flex =1;
.nav-link{
    color: var(--maindark) !important;
    font-size: 1.2rem !important;
    text-transform: capitalize;
}
`;




;

export default Navbar;
