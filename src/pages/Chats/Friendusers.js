import React from 'react';
import './Friendusers.css';
import { Avatar } from '@material-ui/core';

function Friendusers({ name, msg, pic }) {
    return (
        <div className="nuser" style={{padding:'10px 5px' , margin:'0.25em 0.25em', borderRadius:'7px'}}>
            <Avatar classname="profile" src={pic} />
            <div className="spell">
                <p style={{margin:0}}>
                    <b>{name}</b>
                </p>
                <p className="msg">{msg}</p>
            </div>
        </div>
    );
}

export default Friendusers;
