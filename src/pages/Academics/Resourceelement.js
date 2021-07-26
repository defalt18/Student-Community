import React from 'react';
import './Resourceelement.css';

function Resourceelement({ title, image, desc }) {
    return (
        <div className="reselement">
            <div className="decp">
                <h2>{title}</h2>
                <p>{desc}</p>
                <p id="link">Learn More </p>
            </div>
            <img className="imagp" src={image} alt="" />
        </div>
    );
}

export default Resourceelement;
