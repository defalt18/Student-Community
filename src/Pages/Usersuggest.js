import React from 'react'
import { Avatar } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

function Usersuggest({keys, name, img, stream}) {
    function addff(){
        var t = document.getElementsByClassName(keys);
        if(t[0].style.display !== 'block')
        {
            t[0].style.display = 'block';
            t[1].style.display = 'none';
        }
        else
        {
            t[1].style.display = 'block';
            t[0].style.display = 'none';
        }
    }
    return (
        <div style={{
            display:'flex',
            gap:'1rem',
            padding:'15px 10px',
            alignItems:'center',
            borderBottom : '0.5px solid rgba(0,0,0,0.3)'
            }}>
            <Avatar src={img} style={{height : '2.5rem',width:'2.5rem'}}/>
            <div style={{
                display:'flex', 
                gap:'0.4rem',
                flexDirection:'column',
                color:'lightgray'
            }}>
                <p style={{color:'white',fontWeight:'600',margin:'0'}}>{name}</p>
                <p style={{margin:'0'}}>Stream : {stream}</p>
            </div>
            <button onClick= {addff} style={{
                borderRadius : '5px',
                border: '0px',
                background:'rgba(36, 160, 237, 0.9)',
                color:'white',
                fontSize:'medium',
                padding :'0.3rem',
                marginLeft:'auto',
                fontWeight:'500',
                cursor:'pointer',
                }}>
                <CheckIcon fontSize='small' className={keys} style={{display:'none'}}/>
                <p className={keys} style={{margin:'0'}}>Follow</p>
            </button>
        </div>
    )
}

export default Usersuggest
