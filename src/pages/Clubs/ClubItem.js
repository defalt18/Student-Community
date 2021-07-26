import React from 'react';
import './ClubItem.css';
import { Link } from 'react-router-dom';

function ClubItem({ title, img, descp }) {
    let path = '/clubs/';
    for (let i = 0; i < title.length; i++) {
        path += title[i] !== ' ' ? title[i] : '';
    }

    return (
        <div className="clubitem">
            <img src={img} alt="" />
            <Link to={path} style={{ 'text-decoration': 'none' }}>
                <div className="textonit">
                    <h2>{title}</h2>
                    <p>{descp}</p>
                </div>
            </Link>
        </div>
    );
}

export default ClubItem;
