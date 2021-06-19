import React, {useCallback} from 'react'
import { db } from './lib/firebase.prod'
import { useAuthListener } from './hooks';
import Usersuggest from './Pages/Usersuggest';
import peep from './Pages/People.png'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'
import _intersection from 'lodash/intersection'
import _sortBy from 'lodash/sortBy'
import _isEmpty from 'lodash/isEmpty'
import {CircularProgress} from "@material-ui/core";

function Suggs() {

    const { user } = useAuthListener();
    const [suggests, setSuggests] = React.useState([]);

    const getSkillsById = useCallback(async(id) => {
        const UserAbout = await db.collection('users').doc(id).collection('About').get();
        return _map(UserAbout.docs, userDoc => userDoc.data().skills)
    },[])

    const getAllUserIds = useCallback(async () => {
        const AllUsers = await db.collection('users').get();
        return _map(AllUsers.docs, user=>user.id)
    },[])

    const getAllUserSkills = useCallback(async() => {
        const userIds = await getAllUserIds();
        return await _reduce(userIds, async(skillSets,id)=>{
            const skills = await getSkillsById(id);
            const skillScores = await skillSets
            return [...skillScores,{id : id, skills : skills[0]}];
        },[])
    },[getAllUserIds, getSkillsById])

    const generateMatchScore = useCallback(async () => {
        const primarySkillSet = await getSkillsById(user.uid)
        const AllUserSkills = await getAllUserSkills();
        const results = _reduce(AllUserSkills,(suggestions, user)=>{
            const score = _intersection(primarySkillSet[0],user.skills).length
            return [...suggestions, {id : user.id, score : score}]
        },[])
        setSuggests(results)
    },[setSuggests, user, getAllUserSkills, getSkillsById])

    React.useEffect(() => {
        generateMatchScore().then(()=>console.log('Fetched Suggestions'))
    }, [generateMatchScore])

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
                _isEmpty(suggests) ?
                    <div style={{display:'flex', height:'50%', alignItems:'center', justifyContent:'center'}}>
                        <CircularProgress style={{color:'white'}}/>
                    </div> :
                    _map(_sortBy(suggests,['score']).reverse(),({id}) => (
                        id !== user.uid && <Usersuggest keys={id} uid={id} />
                    ))
            }
        </div>
    )
}

export default Suggs
