import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from "react-redux";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';


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

    
    // if (!currentUser.training_appointments) {
    //     return <p>No Training Appointments</p>
    // } 

    
    const trainingAppointmentArray = currentUser.training_appointments.map((appointment) => {
        const rows = [
            { rowName: "Date:", rowValue: appointment.date },
            { rowName: "Time:", rowValue: appointment.time },
            { rowName: "Trainer:", rowValue: appointment.trainer.name }
        ];

        return <TableBody key={appointment.date} component={Paper}>
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
        <Typography sx={{fontSize: "2rem", backgroundColor: "white"}}>My Training Appontments</Typography>
        {currentUser.training_appointments ?
        <TableContainer>
            <Table aria-label="customized table">
                {/* <TableHead>
                </TableHead> */}
                {/* <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.rowName}>
                    <StyledTableCell >
                        {row.rowName} {row.rowValue}
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody> */}
                {trainingAppointmentArray}
            </Table>
        </TableContainer>
        : <Typography>Hello</Typography>}
    </Box>
  )
}

export default MyTrainingAppointments