import React from 'react'
import { Link } from 'react-router-dom'

import './User.css'

function User({ img, name }) {
    return (
        <Link to="/utsav" className="user-link flex-center" >
            <img className="img-user" src={img} alt="User" />
            <span>{name}</span>
        </Link>
    )
}

export default User
