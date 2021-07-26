import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useAuthListener } from '../../hooks';
import { db } from '../../lib/firebase.prod'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import './Parts.css'
import { CSVLink, CSVDownload } from "react-csv";

// import {
//     DataGrid,
//     GridToolbarContainer,
//     GridToolbarExport,
// } from '@material-ui/data-grid';
// import { useDemoData } from '@material-ui/x-grid-data-generator';

const useStyles = makeStyles(() =>
    createStyles({
        expbutton: {
            '&:hover': {
                background: 'rgba(255,255,255,0.1)'
            },
            background: 'transparent'
        },
        row: {
            '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
            },
            textAlign: 'center',
        }
    })
);

// function CustomToolbar() {
//     return (
//         <GridToolbarContainer>
//             <GridToolbarExport />
//         </GridToolbarContainer>
//     );
// }


function Parts() {

    const params = useParams();
    let cnt;
    const classes = useStyles();
    const { user } = useAuthListener();
    const [eventDet, seteventDet] = React.useState([]);
    const [name, setname] = React.useState("");

    const [csvData, setCsv] = React.useState([
        ["S.No", "Name", "Student ID", "Email", "Course", "Degree", "Batch"],
    ]);

    React.useEffect(() => {

        db.collection('events').doc(params.id).onSnapshot(snap=>setname(snap.data().name));
        db.collection('events').doc(params.id).collection('participants')
            .onSnapshot(
                snap => {
                    seteventDet(snap.docs.map(d => d.data()));
                    let row = [], cnt1 = 0;
                    snap.docs.map(d => {
                        cnt1++;
                        row= [];
                        row.push(cnt1);
                        row.push(d.data().name);
                        row.push(d.data().studentid);
                        row.push(d.data().email);
                        row.push(d.data().course);
                        row.push(d.data().degree);
                        row.push(d.data().batch);
                        setCsv(it => [...it, row]);
                    })
                }
            )
            console.log(csvData)
    }, [])

    return (
        <div style={{ minHeight: '100vh', width: '100%', background: 'black', paddingLeft: '80px', paddingTop: '100px', color: 'white' }}>
            <h1 style={{ paddingLeft: '10px', margin: 0 }}>List of participants for {name} ({eventDet.length})</h1>
            <span style={{ color: 'lightgray', width: '100%', display: 'flex', padding: '0 10px', marginBottom: '10px' }}>
                <p style={{ margin: 0, fontSize: '20px' }}>Event</p>
                <CSVLink data={csvData} filename={`${params.id}-participants.csv`} style={{marginLeft:'auto'}}>
                    <button class={classes.expbutton} style={{ display: 'flex', gap: '5px', alignItems: 'center', color: 'white', border: 'none', cursor: 'pointer' }}>
                        <ArrowDownwardIcon style={{ color: 'rgb(0,150,255)' }} />
                        <d>Export to CSV</d>
                    </button>
                </CSVLink>
            </span>

            <table className="part__table">
                <tr style={{ background: 'rgb(31,30,30)' }}>
                    <th>S.No'</th>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Course</th>
                    <th>Degree</th>
                    <th>Year</th>
                </tr>
                {
                    cnt = 0,
                    eventDet.map(doc => (
                        cnt++,
                        <tr class={classes.row}>
                            <td>{cnt}</td>
                            <td>{doc.name}</td>
                            <td>{doc.studentid}</td>
                            <td style={{ textTransform: 'uppercase' }}>{doc.course}</td>
                            <td style={{ textTransform: 'uppercase' }}>{doc.degree}</td>
                            <td>{doc.batch}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default Parts
