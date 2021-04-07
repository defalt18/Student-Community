/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button } from '@material-ui/core';
import './CarouselMain.css';
// import '../../dark-background.png';

export default function CarouselMain() {
    var items = [
        {
            name: 'DA-IICT',
            description: 'Welcome to Student Community @ DAIICT',
            src:
                'https://www.e4k.co/wp-content/uploads/2019/07/Software-Development-Resized.jpeg',
        },
        {
            name: 'DA-IICT',
            description: 'Hello World!',
            src:
                'https://static-cse.canva.com/blob/137764/White-Simple-Bordered-Photo-Quotes-Book-Literature-Facebook-Cover.jpg',
        },
        {
            name: 'DA-IICT',
            description: 'Hello World!',
            src:
                'https://miro.medium.com/max/3000/1*m2gDBT_nc-iE7R4AM3sHBQ.jpeg',
        },
    ];

    return (
        <Carousel interval="7000">
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

function Item(props) {
    return (
        <div className="caroMain" id="caro">
            <img className="caroimg" src={props.item.src} alt="" />
            <h1 className="caroheading">{props.item.name}</h1>
            <p className="carodiscription">{props.item.description}</p>
        </div>
    );
}
