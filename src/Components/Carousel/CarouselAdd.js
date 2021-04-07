/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button } from '@material-ui/core';
import './CarouselAdd.css';
// import '../../dark-background.png';

export default function CarouselAdd() {
    var items = [
        {
            name: 'Synapse 2020',
            description: 'Join in on the endless saga',
            src:
                'https://yt3.ggpht.com/ytc/AAUvwng71nnss9wW79kbO35zj3YRbAlT-evasGXSHVrn7w=s900-c-k-c0x00ffffff-no-rj',
        },
        {
            name: 'Quantum Computing',
            description: 'Register here!',
            src:
                'https://firebasestorage.googleapis.com/v0/b/da-student-connect.appspot.com/o/images%2Feventa.jpeg?alt=media&token=43a7028f-7a07-4271-a235-e51f56ea427b',
        },
        // {
        //     src:
        //         'https://miro.medium.com/max/3000/1*m2gDBT_nc-iE7R4AM3sHBQ.jpeg',
        // },
    ];

    return (
        <Carousel
            interval="10000"
            navButtonsAlwaysInvisible="true"
            timeout="0"
            indicators=""
        >
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

function Item(props) {
    return (
        <div className="caroAdd" id="caro">
            <img
                className="caroimg"
                src={props.item.src}
                alt=""
                style={{ objectFit: 'contain' }}
            />

            <h1 className="caroheading">{props.item.name}</h1>
            <p className="carodiscription">{props.item.description}</p>
        </div>
    );
}
