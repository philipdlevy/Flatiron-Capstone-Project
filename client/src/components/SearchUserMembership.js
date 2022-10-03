import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userAdded } from '../features/usersSlice';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function SearchUserMembership() {
    const [searchBar, setSearchBar] = useState("")

    const dispatch = useDispatch();
    const usersArray = useSelector((state) => state.users.entities)
    console.log(usersArray)

    function handleChange(e) {
        setSearchBar(e.target.value)
    }

    // function handleDelete() {
    //     fetch(`/gym_memberships/${id}`, {
    //         method: "DELETE"
    //     })
    //     .then(() => {
    //         // dispatch
    //         // setSearchBar("")
    //         <Alert severity="success">Success! Users membership deleted.</Alert>
    //     })
    //     .catch((error) => alert(error))
    // }


  return (
    <Box>
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
            width: 2000,
            height: 780,
            },
        }}
        >
            <Paper elevation={3}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { ml: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    
                    <Typography paddingY={1}>Username:</Typography>
                    <TextField 
                        required
                        id="standard-basic"
                        variant="standard" 
                        label="Required"
                        placeholder='Username'
                        type="text"
                        name="username"
                        value={searchBar}
                        onChange={handleChange}
                    />
                </Box>

                <Box>
                    <Button 
                    sx={{
                        m: 2, 
                        width: "200px"
                    }}
                    variant="contained"
                    type="onClick"
                    // onClick={() => handleDelete()}
                    >
                    Find User
                    </Button>
                </Box>
            </Paper>
        </Box>      
    </Box>
  )
}

export default SearchUserMembership 