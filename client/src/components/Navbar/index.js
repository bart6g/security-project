import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [token,setToken] = useState(null);
  let history = useHistory();

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };
  const logout = () => {
    localStorage.clear();
    setToken(null);
    history.push('/home');
  }

  const getToken = () => {
    const auth = localStorage.getItem("auth-token");
    setToken(auth);
    console.log(auth);
  }

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    getToken();
  }, []);
  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <MobileIcon onClick={() => toggle()}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="/">Home</NavLinks>
            </NavItem>
          </NavMenu>
          {!token ? 
            (<NavBtn>
              <NavBtnLink to="/register">Register</NavBtnLink>
              <NavBtnLink to="/login">Login</NavBtnLink>
            </NavBtn>) : (<NavBtn>
              <NavBtnLink to="/register">Register</NavBtnLink>
              <NavBtnLink onClick={()=>logout()}>Logout</NavBtnLink>
            </NavBtn>)
          }
          
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
