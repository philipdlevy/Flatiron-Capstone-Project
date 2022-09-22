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
    const [trainingAppointmentsList, setTrainingAppointmentsList] = useState([])

    useEffect(() => {
        if (!currentUser.training_appointments) {
            return []
        } else {
            const trainingAppointmentsArray = currentUser.training_appointments.map((appointment) => {
                // debugger
                console.log(appointment) 
            })
        }
    }, [currentUser])


    const rows = [
        { rowName: "Username:", rowValue: currentUser.username },
        { rowName: "Date:", rowValue: currentUser.email },
        { rowName: "Time:", rowValue: currentUser.address },
        { rowName: "Trainer:", rowValue: `${currentUser.age} years old`}
    ];

  return (
    <Box>
        <Typography sx={{fontSize: "2rem"}}>My Training Appontments</Typography>
        <TableContainer component={Paper} sx={{ paddingY: 2}}>
            <Table aria-label="customized table">
                <TableHead>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.rowName}>
                    <StyledTableCell >
                        {row.rowName} {row.rowValue}
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  )
}

export default MyTrainingAppointments