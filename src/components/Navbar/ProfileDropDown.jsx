import React from 'react'
import { Link } from 'react-router-dom'

import DA_logo from "./DA-logo.png"
import "./ProfileDropDown.css"

function ProfileDropDown() {
    return (
        <div>
            <button className="menu-btn-1121">
                <img className="img-user" src={DA_logo} alt="Avatar" />
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
