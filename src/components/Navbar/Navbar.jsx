import React from "react";
import { Link } from "react-router-dom";

import { SearchBar } from "./Search";
import ProfileDropDown from "./ProfileDropDown";
import CreatePost from "../Modal/CreatePost";

import "./Navbar.css";
import DA_Logo from "./DA-logo.png";

function Logo() {
  return (
    <Link to="/" className="flex-center">
      <img className="da-logo" src={DA_Logo} alt="DA-IICT" />
      <span>Student Community</span>
    </Link>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <Logo />
      <div className="empty"></div>
      <SearchBar />
      <ProfileDropDown />
      <CreatePost />
    </header>
  );
}

export default Navbar;
