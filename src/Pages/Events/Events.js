/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { CssBaseline } from '@material-ui/core';
import { React, useState, useEffect } from 'react';
import { useAuthListener } from '../../hooks';
import { db } from '../../lib/firebase.prod';
import CreateEvent from '../../Components/Modal/CreateEvent';
import './Events.css';

function Events() {
    const { user } = useAuthListener();
    const [events, seteven] = useState([]);

    useEffect(() => {
        db.collection('events').onSnapshot((snapshot) => {
            seteven(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    evt: doc.data(),
                }))
            );
        });

    }, [events.length]);

    return (
        <div className="Evnthd" >
            <CssBaseline />
            <div
                className="appitem"
                style={{
                    width: '60%',
                    flex: 1,
                    margin: 'auto',
                    borderRadius: '5px',
                    background: 'linear-gradient(45deg,rgba(255,50,0),purple)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily:'Poppins, sans-serif'
                }}
            >
                <div className="eveleft">
                    <h1 style={{ margin: 0, fontSize: '40px' }}>
                        Upcoming Event
                    </h1>
                    <p style={{ fontSize: '25px', fontWeight: 'bold' }}>
                        Step up by DADC!
                    </p>
                    <p style={{ fontSize: '25px', fontWeight: 'bold' }}>
                        Date : 23-02-2021
                    </p>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '25px',
                            fontWeight: 'bold',
                        }}
                    >
                        Time : 15:00 onwards
                    </p>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '25px',
                            fontWeight: 'bold',
                        }}
                    >
                        Venue : OAT
                    </p>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    style={{
                        maxHeight: '40vh',
                        maxWidth: '50%',
                        borderRadius: '5px',
                    }}
                />
            </div>
            {
                user.email.includes("club")===true? (
                <div className="appitem eventitem" style={{ margin: '20px auto' }}>
                    <h1 style={{ margin: 0 }}>
                        Want to create an event of your own !?
                        <p style={{ fontSize: 'medium', fontWeight: 'normal' }}>
                            Only clubs and committees shall have this unique
                            priviledge of creating an event
                        </p>
                        <p
                            style={{
                                margin: '5px 0',
                                borderRadius: '25px',
                                width: '20%',
                                fontWeight: 'normal',
                                background: 'rgba(255,255,255)',
                                display: 'flex',
                                color: 'black',
                                justifyContent: 'center',
                            }}
                            >
                            <CreateEvent />
                        </p>
                    </h1>
                </div>
                ):(<></>)
            }
            <div className="eventitem">
                <h1 style={{ textAlign: 'center',fontFamily:'Poppins, sans-serif'}}>
                    Scheduled events this season
                </h1>
            </div>
            {events.map(({ id, evt }) => (
                <div
                    key={id}
                    className="eventitem"
                    style={{
                        background: `url("${evt.poster}")`,
                        borderRadius: '25px',
                        backgroundPosition: 'center top',
                    }}
                >
                    <div
                        className="appitem"
                        style={{
                            padding: 0,
                            display: 'flex',
                            backdropFilter: 'saturate(180%) blur(10px)',
                            margin: 0,
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(0,0,0,0.7)',
                                padding: '15px',
                                borderTopLeftRadius: 'inherit',
                                borderBottomLeftRadius: 'inherit',
                            }}
                        >
                            <h1>{evt.name}</h1>
                            <p>{evt.desc}</p>
                            <p>
                                <b>Date : </b>
                                {evt.date}
                            </p>
                            <p>
                                <b>Deadline : </b>
                                {evt.deadline}
                            </p>
                            <p>
                                <b>Duration : </b>
                                {evt.duration}
                            </p>
                            <p>
                                <b>Venue : </b>
                                {evt.venue}
                            </p>
                            <p>
                                <b>Time : </b>
                                {evt.time}
                            </p>
                            <p>
                                <b>Interested participants : </b>
                                {evt.parts}
                            </p>
                            <p
                                style={{
                                    background: 'white',
                                    color: 'black',
                                    width: '30%',
                                    padding: '0 5px',
                                    borderRadius: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                Click to register
                            </p>
                            <p>
                                Regards
                                <br />
                                {evt.org}
                            </p>
                        </div>
                        <div
                            style={{
                                padding: '20px',
                                maxWidth: '50%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={evt.poster}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '10px',
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Events;
