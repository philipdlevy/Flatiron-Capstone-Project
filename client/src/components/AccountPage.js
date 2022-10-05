import React from 'react'
import { useSelector } from 'react-redux'

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function AccountPage() {
  const currentUser = useSelector((state) => state.users.user)

  const rows = [
    { rowName: "Username:", rowValue: currentUser.username },
    { rowName: "Email:", rowValue: currentUser.email },
    { rowName: "Address:", rowValue: currentUser.address },
    { rowName: "Age:", rowValue: `${currentUser.age} years old`},
    { rowName: "Membership Type:", rowValue: currentUser.gym_membership.membershipType},
    { rowName: "Membership Price:", rowValue: `$${(currentUser.gym_membership.price == null) ? "0" : currentUser.gym_membership.price}`}
  ];

  return (
      <TableContainer component={Paper} sx={{ paddingY: 1}}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{fontSize: "2rem"}}>Account Info</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.rowName}>
                <StyledTableCell >
                  {row.rowName} {row.rowValue}
                </StyledTableCell>
                {/* <StyledTableCell sx={{ width: 100 }}>{row.rowValue}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default AccountPage



