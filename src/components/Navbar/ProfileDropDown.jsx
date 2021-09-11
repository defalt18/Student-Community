import React from 'react'
import { Link } from 'react-router-dom'

import "./ProfileDropDown.css"
import avatar_icon from "../Profile/Images/avatar.png"

function ProfileDropDown({ userDetails }) {
    const { image } = userDetails;

    return (
        <div>
            <button className="menu-btn-1121 grid-center">
                <img className="img-user" src={image} alt="Avatar" />
            </button>
            <div className="user-menu-1121">
                <Link to="/profile" >Profile</Link>
                <Link to="/setting" >Setting</Link>
                <Link to="/logout" >Logout</Link>
            </div>
        </div>
    )
}

export default ProfileDropDown
