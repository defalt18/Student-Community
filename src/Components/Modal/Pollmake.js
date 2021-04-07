import {React,useEffect,useState} from 'react';
import './Pollmake.css';
import {db} from '../../lib/firebase.prod';
import { Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useAuthListener } from '../../hooks';

function Postmake({ handleClose }) {
    
    const { user } = useAuthListener();
    const [img, setimg] = useState(null)

    useEffect(() => {
        db.collection('users').doc(user.uid).onSnapshot((snapshot)=>(setimg(snapshot.data().image)))    
    }, [user.uid])

    return (
        <form action="/polling" autoComplete="off">
            <div className="pollmaker">
                <div className="pollmaker-top">
                    <Avatar src={img} />
                    <h3
                        className="model-username"
                        style={{ paddingLeft: '10px' }}
                    >
                        {user.displayName}
                    </h3>
                    <CloseIcon
                        style={{ cursor: 'pointer' }}
                        id="close"
                        fontSize="large"
                        onClick={handleClose}
                    />
                </div>
                <div className="pollmaker-mid">
                    <div className="pollmaker-mid-left">
                        <input
                            type="text"
                            placeholder="Poll Title"
                            name="poll-creator"
                            required
                        />
                        <textarea
                            name="w3review"
                            rows="5"
                            placeholder="Poll Discription"
                        />
                        <button>Request Poll</button>
                    </div>
                    <div className="pollmaker-mid-right">
                        <input
                            type="text"
                            placeholder="A  :  "
                            name="poll-creator"
                            required
                        />
                        <input
                            type="text"
                            placeholder="B  :  "
                            name="poll-creator"
                            required
                        />
                        <input
                            type="text"
                            placeholder="C  :  (optional)"
                            name="poll-creator"
                        />
                        <input
                            type="text"
                            placeholder="D  :  (optional)"
                            name="poll-creator"
                        />
                        <input
                            type="text"
                            placeholder="E  :  (optional)"
                            name="poll-creator"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Postmake;
