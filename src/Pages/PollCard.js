import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import RadioGroup from '@material-ui/core/RadioGroup';
import Card from '@material-ui/core/Card';
import { db } from '../lib/firebase.prod';
import Radio from '@material-ui/core/Radio';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    background: "rgb(41,39,39)",
    color: 'white',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PollCard({ id , uid}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [cho, setcho] = useState(-1);
  const [prev, setprev] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [data, setdata] = useState([]);
  const [options, setoptions] = useState([]);
  useEffect(() => {
    db.collection('polls').doc(id).collection('options').onSnapshot(
      snap => setoptions(
        snap.docs.map(d => ({ id: d.id, dat: d.data() }))
      )
    )
    db.collection('polls').doc(id).onSnapshot(
      snap => setdata(
        snap.data()
      )
    )
    db.collection('users').doc(uid).collection('polls').doc(id).onSnapshot(
      snap=>{
        if(snap.size>0)
        setprev(snap.data().done)
      }
    )
  }, [])

  const handleClick = () => {

    db.collection('polls').doc(id).collection('options')
    .doc(cho).update({
      people : options[cho-1].dat.people + 1
    })

    db.collection('users').doc(uid).collection('polls').doc(id).set({
      done : cho
    })
    
    setExpanded(false);
  }

  return (
    <Card className={classes.root}>
      <div style={{ padding: "0 20px" }}>
        <h2>{data?.name}</h2>
        <p style={{ fontSize: 'large' }} dangerouslySetInnerHTML={{ __html: data?.desc }}></p>
      </div>
      <CardActions disableSpacing>
        {expanded && prev===0 && <Button color="primary" onClick={handleClick} variant="contained">
          Submit your stance
        </Button>}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon style={{ color: 'white' }} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <h3>What is your stance on the matter ?</h3>
          <RadioGroup name={id} defaultValue={prev}>
            {
              options?.map(({ id, dat }) => (
                dat.text !== "" && <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Radio value={id} onClick={(e)=>{
                      setcho(e.target.value);
                    }}
                    style={{color:'white'}}/>
                    <div>
                      <h3 style={{ margin: 0 }}>{dat.text}</h3>
                      ({dat.people} people voted this!)
                    </div>
                  </div>
                  <br /></>
              ))
            }
          </RadioGroup>
        </CardContent>
      </Collapse>
    </Card>
  );
}
