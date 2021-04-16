import { Avatar } from '@material-ui/core'
import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../lib/firebase.prod';

function Friendelement({uid}) {

    const [names, setName] = useState([]);

    let date = "2020";
    useEffect(()=>{
       
        db.collection('users').doc(uid)
        .onSnapshot((snapshot) => {
            setName(snapshot.data());
        }); 

    },[uid])


    return (
        <div style={{
            display:'flex',
            flexDirection: 'column',
            alignItems:'center',
            background: 'rgba(55,55,55,0.6)',
            borderRadius:'25px',
            color: 'lightgray',
            }}>
           <Avatar src={names.image} style={{margin:'1rem 0',height:'8rem',width:'8rem'}}/>
           <Link to={`/profile/${uid}`} style={{textDecoration:'none'}}>
                <h2 style={{color:'white'}}>{names.Name}</h2>
                </Link>
           <p style={{margin:0}}>Message</p>
           <p style={{margin:'20px 0'}}>Friends since <b>{date}</b> </p>
        </div>
    )
}

export default Friendelement
