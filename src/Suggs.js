import React from 'react'
import { db } from './lib/firebase.prod'
import { useAuthListener } from './hooks';
import Usersuggest from './Pages/Usersuggest';
import peep from './Pages/People.png'

function Suggs() {

    const { user } = useAuthListener();
    const [skllset, setskllset] = React.useState([]);
    const [suggests, setsuggests] = React.useState([]);

    const getusers = async () => {
        let users_col = await db.collection('users').get();
        return users_col;
    }

    const getSkls = async () => {
        await getusers().then(res => {
            res.docs.map(doc => {
                db.collection('users').doc(doc.id).collection('About')
                    .onSnapshot(
                        snap => {
                            if (skllset.length < res.size)
                                snap.docs.map(d => {
                                    setskllset(it => [...it, { id: doc.id, skls: d.data().skills }])
                                })
                            else
                                console.log(skllset.length);

                        }
                    )
            })
        })
    }

    const getuserdata = async () => {

        let userdata = [];
        await db.collection('users').doc(user.uid).collection('About').get().then(snap =>
            snap.docs.map(doc => {
                userdata = doc.data().skills;
            })
        )
        return userdata;
    }

    const getSug = async () => {
        await getuserdata().then(res => {
            let tempSug = [];
            skllset.map(({ id, skls }) => {
                let tp = 0;
                skls.map(sk => {
                    if (res.includes(sk))
                        tp += 5
                    else
                        tp -= 1
                })
                tempSug.push({ score: tp, id: id });
            })
            setsuggests(tempSug);

        })
    }

    React.useEffect(() => {
        skllset.length === 0 && getSkls();
        (skllset.length > 0) && getSug();
    }, [skllset?.length])

    return (
        <div
            className="appitem suggest_tabs"
            style={{
                padding: '0',
                overflow: 'auto',
                height: '40vh',
                borderRadius:'10px'
            }}
        >
            <h3
                style={{
                    margin: '0',
                    background: 'black',
                    padding: '1rem 1rem',
                    color: 'white',
                    position: 'sticky',
                    top: '0',
                    zIndex: '100',
                    display:'flex',
                    gap:'10px',
                    alignItems:'center'
                }}
            >
                <img src={peep} alt="" height="30px"/>
                Suggestions
                <u style={{marginLeft:'auto', cursor:'pointer'}}>See all</u>
            </h3>
            {
                console.log(suggests?.length),
                suggests?.sort(function (a, b) { return b.score - a.score }).map(({ id, score }) => (
                    id !== user.uid && <Usersuggest
                        keys={id}
                        uid={id}
                    />
                ))
            }
        </div>
    )
}

export default Suggs
