import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Pollmake from './Pollmake';
// import Avatar from '@material-ui/core/Avatar';
import './Pollmake.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: 'transparent',
            border: '0px solid',
            borderRadius: '20px',
            boxShadow: theme.shadows[5],
            // padding: theme.spacing(2, 4, 3),
            padding: '0',
            outline: 'none',
        },
        buttoncreate: {
            color: 'var(--text-primary)',
            padding: '11px 30px',
            filter: 'grayscale(100%) opacity(0.7)',
            transition: 'var(--transition-speed)',
            border: 'none',
            background: 'transparent',
            fontSize: 'large',
            outline: 'none',
            '&:hover': {
                filter: 'grayscale(0%) opacity(1)',
                background: '#23232e',
                borderRadius: '25px',
                color: '#ff7eee',
            },
            MuiBackdropRoot: {
                backgroundColor: '#111',
            },
        },
    })
);

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div
                style={{
                    padding: '30px',
                    background:
                        'url("https://ak.picdn.net/shutterstock/videos/22475401/thumb/11.jpg")',
                    backgroundPosition: '-100px -5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                {/* <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    style={{ height: 100, width: 100, fontSize: '50px' }}
                    // className="poll-creator-item poll-creator-avatar"
                /> */}
                {/* <input
                    type="text"
                    placeholder="Want Poll ?"
                    name="poll-creator"
                    className="poll-creator-item poll-creator-input"
                    onClick={handleOpen}
                /> */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        // justifyContent:'space-between',
                    }}
                >
                    <div style={{ color: 'white' }}>
                        <p
                            style={{
                                fontSize: '60px',
                                margin: '0',
                                fontWeight: '600',
                                lineHeight: '70px',
                            }}
                        >
                            Want to raise an issue!?
                        </p>
                        <p style={{ marginTop: '10px' }}>Request a poll</p>
                    </div>
                    <button
                        // className="poll-creator-item poll-creator-button"
                        onClick={handleOpen}
                        style={{
                            border: 'none',
                            borderRadius: '10px',
                            padding: '5px',
                            height: '20%',
                            width: '30%',
                            fontSize: '16px',
                        }}
                    >
                        Create poll
                    </button>
                </div>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{
                    backdropFilter: 'saturate(180%) blur(5px)',
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {/* <h1>Hey there</h1> */}
                        <Pollmake handleClose={handleClose} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
