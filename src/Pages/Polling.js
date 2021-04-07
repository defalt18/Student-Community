import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { db } from '../lib/firebase.prod';
import {
    Header,
    Sidebar,
    
    CarouselAdd,

} from '../Components';
import './Polling.css';
import CreatePoll from '../Components/Modal/CreatePoll';
import { useAuthListener } from '../hooks';

export default function Polling() {
    const GreenRadio = withStyles({
        root: {
            color: green[400],
            '&$checked': {
                color: green[600],
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    // const [showModel, setShowModel] = useState(false);
    const [polls, setpol] = useState([]);
    const {user} = useAuthListener();
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        // this.style.display='none';
        // document.getElementById('deci').style.display='flex';
    };

    const [uiimg,sety]=useState(null);
    useEffect(() => {
        db.collection('polls').onSnapshot((snapshot) => {
            setpol(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    poll: doc.data(),
                }))
            );
        });

        db.collection('users').doc(user.uid).onSnapshot((s)=>(sety(s.data().image)))
    }, [polls.length]);

    return (
        <div className="app">
            <Header uimg = {uiimg}/>
            <Sidebar />
            <div className="appmain">
                <div className="appleft">
                    {polls.map(({ id, poll }) => (
                        <div
                            className="appitem"
                            style={{ padding: 0, overflow: 'hidden' }}
                            key={id}
                        >
                            <img
                                className="pollimg"
                                src={poll.img}
                                style={{
                                    width: '100%',
                                    height: '80%',
                                    position: 'absolute',
                                    objectFit: 'cover',
                                    maskImage:
                                        'linear-gradient(to bottom, rgb(0, 0, 0, 1), rgb(0, 0, 0, 0))',
                                }}
                                alt=""
                            />
                            <div
                                style={{
                                    position: 'relative',
                                    padding: '0 10px',
                                    paddingTop: '50px',
                                }}
                            >
                                <h1>{poll.name}</h1>
                                <p style={{ width: '70%' }}>{poll.desc}</p>
                            </div>
                            <div
                                id={id}
                                style={{
                                    padding: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <h2>Your Stance : </h2>
                                <GreenRadio
                                    checked={selectedValue === 'Favour'}
                                    onChange={handleChange}
                                    value="Favour"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'Favour' }}
                                />
                                <p>Favour</p>
                                <Radio
                                    checked={selectedValue === 'Against'}
                                    onChange={handleChange}
                                    value="Against"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'Against' }}
                                />
                                <p>Against</p>
                            </div>
                            <div
                                id={id + '1'}
                                style={{
                                    padding: '10px',
                                    display: 'none',
                                    alignItems: 'center',
                                }}
                            >
                                <h2>You chose {selectedValue}</h2>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="appright">
                    <div className="wrapper-main">
                        <div
                            className="appitem"
                            style={{
                                padding: 0,
                                backgroundColor: 'transparent',
                            }}
                        >
                            <div
                                className="carouselItem"
                                style={{ borderRadius: '25px', margin: 0 }}
                            >
                                <CarouselAdd style={{ borderRadius: '25px' }} />
                            </div>
                        </div>
                        <div
                            className="appitem"
                            style={{ padding: 0, overflow: 'hidden' }}
                        >
                            <CreatePoll />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
