/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState , useEffect} from 'react';
import './Eventmake.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';



function EventMake({ handleClose , imgus}) {

    return (
        <div style={{padding:'10px',background:'rgba(0,0,0,1)',borderRadius:'20px'}}>
        <div style={{padding:'20px',fontFamily:'Poppins, sans-serif',width:'42vw',color:'white',border:'2px solid white',borderRadius:'20px',background:'rgba(0,0,0,1)'}}>
            <CssBaseline />
            <h1 style={{textAlign:'center',background:'transparent',color:'white',margin:0}}>
                Event Registration</h1>
            <div style={{width:'100%',display:'flex',flex:1,gap:'10px',alignItems:'center'}}>
                <h2>Name of the Event : </h2>
                <input type='text' style={{width:'60%',border:'none', color:'white',background: 'rgba(255,255,255,0.1)',padding:'10px'}}/>
            </div>
            <div>
                <h2>Short Description :</h2>
                <textarea style={{height:'100px',fontFamily:'inherit',width:'100%',resize:'none',border:'none', color:'white',background: 'rgba(255,255,255,0.1)',padding:'10px'}}/>
            </div>
            <div style={{width:'100%',display:'flex',flex:1,alignItems:'center',justifyContent:'space-between'}}>
                <h2>Poster : </h2>
                <input id='posup' onChange={(e)=>{
                    document.getElementById('imgname').style.display='';
                    document.getElementById('imgname').innerText= e.target.files[0].name;
                }}type='file' accept='image/*' style={{display:'none'}}/>
                <label htmlFor='posup'>
                    <p style={{fontWeight:'600',background:'rgba(0,150,255)',padding:'5px',borderRadius:'5px',color:'white'}}>UPLOAD POSTER</p>
                </label>
                <p id='imgname' style={{display:'none'}}></p>
            </div>
            <div style={{width:'100%',display:'flex',flex:1,gap:'10px',alignItems:'center'}}>
                <h2>Venue :</h2>
                <input type='text' style={{width:'84%',border:'none', color:'white',background: 'rgba(255,255,255,0.1)',padding:'10px'}}/>
            </div>
            <div style={{width:'100%',display:'flex',flex:1,display:'flex',gap:'10px',alignItems:'center'}}>
                <h2>Time :</h2>
                <input type='text' style={{width:'86%',border:'none', color:'white',background: 'rgba(255,255,255,0.1)',padding:'10px'}}/>
            </div>
            <div style={{width:'100%',display:'flex',flex:1,display:'flex',gap:'10px',alignItems:'center'}}>
                <h2>Duration : </h2>
                <input type='text' style={{width:'79%',border:'none', color:'white',background: 'rgba(255,255,255,0.1)',padding:'10px'}}/>
            </div>
            <div style={{width:'100%',display:'flex',flex:1,gap:'10px',alignItems:'center'}}>
                <h2>Date : </h2>
                <input type='text' style={{width:'87%',border:'none', color:'white',background: 'rgba(255,255,255,0.1)',padding:'10px'}}/>
            </div>
            <div style={{width:'100%',display:'flex',flex:1,gap:'10px',alignItems:'center'}}>
                <h2>Deadline : </h2>
                <input type='text' style={{width:'79%',border:'none', color:'white',background: 'rgba(255,255,255,0.1)',padding:'10px'}}/>
            </div>
            <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <Button onClick={handleClose} style={{background:'white',color:'black'}}>
                Back
            </Button>
            <Button onClick={handleClose} style={{background:'white',color:'black'}}>
                Submit
            </Button>
            </div>
        </div>
    </div>);
}

export default EventMake;
