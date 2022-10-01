import React, { useEffect } from 'react'
import { useSelector, useDispatch  } from "react-redux";
import { trainersAppointmentDeleted, fetchTrainers } from '../features/trainersSlice';
import { userDeleteTrainingAppointments, fetchUser } from '../features/usersSlice';


import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 17
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
"&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
},
// hide last border
"&:last-child td, &:last-child th": {
    border: 0
}
}));


function MyTrainingAppointments() {
    const currentUser = useSelector((state) => state.users.user)
    // const trainersArray = useSelector((state) => state.trainers.entities)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTrainers())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    function handleDelete(appointment) {
        fetch(`/training_appointments/${appointment.id}`, {
            method: "DELETE"
            })
            .then(() => {
                console.log(appointment)
                dispatch(trainersAppointmentDeleted(appointment))
                dispatch(userDeleteTrainingAppointments(appointment))
        })
        .catch((error) => alert(error))
    }
    
    const trainingAppointmentArray = currentUser.training_appointments.map((appointment) => {
        const rows = [
            { rowName: "Date:", rowValue: appointment.date },
            { rowName: "Time:", rowValue: appointment.time },
            { rowName: "Trainer:", rowValue: appointment.trainer.name }
        ];

        return <TableBody key={appointment.date} component={Paper}>
        <Typography paddingX={2}>
            Completed? 
            <Checkbox {...label}
            onClick={() => handleDelete(appointment)}
            />
        </Typography>
        {rows.map((row) => (
            <StyledTableRow key={row.rowName}>
            <StyledTableCell >
                {row.rowName} {row.rowValue} 
            </StyledTableCell>
            </StyledTableRow>
        ))}
        </TableBody>
    })  

    
    
  return (
    <Box>
        <Typography 
            sx={{fontSize: "2rem", backgroundColor: "white", paddingX: 1}}
        >
            My Training Appontments
        </Typography>
        
        {currentUser.training_appointments.length === 0 ?
        <Alert severity="info">You do not have any training sessions. Visit the trainers tab to purchase a training session.</Alert>
        :
        <TableContainer>
            <Table aria-label="customized table">
                {/* <TableHead>
                </TableHead> */}
                {trainingAppointmentArray} 
            </Table>
        </TableContainer>}
    </Box>
  )
}

export default MyTrainingAppointments