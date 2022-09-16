import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberships } from '../features/membershipsSlice';
import {useHistory} from "react-router-dom"

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddGymMembership() {


  return (
    <Box>
      <Paper sx={{
        width: 350,
        height: 450,
        ml: 3,
      }}
      > 
        <form >
          <Box sx={{ minWidth: 120 }}>
            <Typography padding={1}>Select Membership:</Typography>
            <FormControl sx={{ m: 1, width: 230 }}>
              <InputLabel id="select-label">Membership</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                // value={trainerData}
                label="Trainer"
                // onChange={handleChange}
              >
                {/* {trainerArray} */}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <Typography padding={1}>Select Gym:</Typography>
            <FormControl sx={{ m: 1, width: 230 }}>
              <InputLabel id="select-label">Gym</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                // value={trainerData}
                label="Trainer"
                // onChange={handleChange}
              >
                {/* {trainerArray} */}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120, marginLeft: 1 }}>
            <Typography padding={1}>Start Date:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1, width: 250 }}>
              <DatePicker
                label="Date"
                // value={dateData}
                // onChange={(newDate) => {
                //   setDateData(newDate);
                // }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>

            <Box paddingY={3}>
              <Button
                variant="contained"
                type="submit"
              >
                Purchase Membership
              </Button>
            </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default AddGymMembership