import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  root: {
    background: blue[700],
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
});


function MembershipPage() {
  const currentUser = useSelector((state) => state.users.user)
  const classes = useStyles();

  return (
    <Container>
      <Grid 
        container spacing={5} 
        padding={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={10}
      >

        <Grid>
          <Paper elevation={3}
            sx={{
              width: "300px",
              height: "400px",
              bgcolor: grey[300],
              m: 2
            }}
          >
            <Box padding={1}>
              <Typography 
                variant='h5' 
                component="h2" 
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Monthly Gym Membership
              </Typography>

              <Typography 
                variant='body2' 
                component="p"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                (Monthly charge until stopped)
              </Typography>

              <Box paddingY={7}>
                <Typography 
                  variant='h5' 
                  component="h2"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  $39.99 USD
                </Typography>
                <Typography 
                  variant='body1' 
                  component="p"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  (No Contract)
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ paddingY: 13}}
              >
                {!currentUser.id ?
                  <Link to="/signup" style={{ textDecoration: 'none'}}>
                    <Button className={classes.root}>Purchase Membership</Button>
                  </Link>
                  : 
                  <Link to="/memberships/new" style={{ textDecoration: 'none'}}>
                    <Button className={classes.root}>Purchase Membership</Button>
                  </Link>
                }
              </Box>

            </Box>
          </Paper>
        </Grid>

        <Grid>
          <Paper elevation={3}
            sx={{
              width: "300px",
              height: "400px",
              bgcolor: grey[300],
            }}
          >
            <Box padding={1}>
              <Typography 
                variant='h5' 
                component="h2"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                1 Year Gym Membership
              </Typography>

              <Typography 
                variant='body2' 
                component="p"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                (Paid in full)
              </Typography>

              <Box paddingY={7}>
                <Typography 
                  variant='h5' 
                  component="h2"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  $400.00 USD
                </Typography>
                <Typography 
                  variant='body1' 
                  component="p"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  (Save over 10%!)
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ paddingY: 13}}
              >
                {!currentUser.id ?
                <Link to="/signup" style={{ textDecoration: 'none'}}>
                  <Button 
                    className={classes.root}>Purchase Membership</Button>
                </Link>
                : 
                <Link to="/memberships/new" style={{ textDecoration: 'none'}}>
                  <Button className={classes.root}>Purchase Membership</Button>
                </Link>
                }
              </Box>

            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

export default MembershipPage;