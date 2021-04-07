import { Avatar } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import { Firebase,db,storage } from '../lib/firebase.prod';
import { useAuthListener } from '../hooks';

function Storycreate({img}) {

    const {user} = useAuthListener();
    let userstr = user.uid.toString();
    const handlestoryupload = (e) => {
        
        if(e.target.files[0]!==null)
        {
            let imgt = e.target.files[0];
            let nameit = (imgt.name + Date.now().toString()).toString();
            const uplTask = storage.ref(`images/${nameit}`).put(imgt);
            uplTask.on('state_changed', null, null, () => {
                storage
                    .ref('images')
                    .child(nameit)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection('stories').doc(userstr).set({
                            imgurl : url,
                            name : user.displayName,
                            avimg : img,
                            timestamp : Firebase.firestore.FieldValue.serverTimestamp(),
                        });
                    });
        });
        }
    }

    return (
        <>
        <input id='storyupload' type='file' accept='image/*' onChange={handlestoryupload} style={{display:'none'}}/>
            <div style={{borderRadius:'20px',display:'flex', background:'rgba(0,155,255,0.1)', backgroundSize:'cover',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',padding:'10px',height:'30vh',minWidth:'10vw'}}>
                <div style={{margin:'10px',textAlign:'center'}}>
                    <label for='storyupload'>
                        <AddIcon style={{fontSize:'70px'}}/>
                    </label>
                    <p style={{ fontSize:'15px', margin:0,marginTop:'8px'}}>Create your 
                        </p>
                    <p style={{fontSize:'20px',margin:0,marginBottom:'8px'}}>
                        Story
                    </p>
                </div>
                <Avatar src={img} style={{height:50,width:50,border:'3px solid rgba(0,155,255)'}}/>
            </div>
        </>
    )
}

export default Storycreate
