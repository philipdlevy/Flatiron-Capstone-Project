import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userAdded } from '../features/usersSlice';
import { userDeleteMembership } from '../features/usersSlice';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function SearchUserMembership() {
    const [foundUserData, setFoundUserData] = useState({})
    const [searchBar, setSearchBar] = useState("")

    const dispatch = useDispatch();
    const usersArray = useSelector((state) => state.users.entities)
    console.log(usersArray)

    function handleChange(e) {
        setSearchBar(e.target.value)
    }

    function findUser(e) {
        e.preventDefault()

        const foundUser = usersArray.find((user) => {
            if (user.username === searchBar) {
                return user
            }
        })
        setFoundUserData(foundUser)
        setSearchBar("")
    }

    function handleDeleteMembership(foundUserData) {
        fetch(`/gym_memberships/${foundUserData.gym_membership.id}`, {
            method: "DELETE"
        })
        .then(() => {
            dispatch(userDeleteMembership(foundUserData))
            setSearchBar("")
            setFoundUserData({})
        })
        .catch((error) => alert(error))
    }


  return (
    <Box>
        {!foundUserData ? <Alert severity="error">Cannot find matching Username, please try again.</Alert> : null }

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
            <Typography sx={{fontSize: "2rem", m: 1}}>Search User:</Typography>
            <form onSubmit={findUser}>
                <Box
                    sx={{
                        '& > :not(style)': { ml: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    
                    <Typography paddingY={1}>Username:</Typography>
                    <TextField 
                        autoComplete="off"
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
                        type="submit"
                    >
                        Find User
                    </Button>
                </Box>

                {foundUserData ?
                <Box sx={{m: 1, width: "400px", border: 1}}>
                    <ul>
                        <li>Username: {foundUserData.username}</li>
                        <li>Age: {foundUserData.age}</li>
                        <li>Email: {foundUserData.email}</li>
                        <li>Address: {foundUserData.address}</li>

                        <li>MembershipType: {(foundUserData.gym_membership?.membershipType == null) ?
                        "None" : foundUserData.gym_membership.membershipType}</li>

                        <li>Membership Price: {(foundUserData.gym_membership?.price == null) ?
                        "None" : foundUserData.gym_membership.price}</li>

                        <li>Gym Address: {(foundUserData && foundUserData.gym_membership?.gym == null || !foundUserData.gym_membership?.gym.id) ?
                        "None" : foundUserData.gym_membership?.gym.address}</li>
                    </ul>

                    <Box>
                        {!foundUserData.id || foundUserData.gym_membership === null || !foundUserData.gym_membership.id ? null :
                        <Button 
                            sx={{ 
                                width: "200px"
                            }}
                            variant="contained"
                            onClick={() => handleDeleteMembership(foundUserData)}
                        >
                            Delete Membership
                        </Button>
                        }
                    </Box>
                </Box>
                : null }
            </form>

            </Paper>
        </Box>      
    </Box>
  )
}

export default SearchUserMembership 