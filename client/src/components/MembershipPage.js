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
import Alert from '@mui/material/Alert';

// styling classes to use wherever. can add a new class when needed.
const useStyles = makeStyles({
  root: {
    background: blue[700],
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
  displays: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  colorBox: {
    width: "284px",
    height: "80px",
    background: grey[500]
  },
});


function MembershipPage() {
  const currentUser = useSelector((state) => state.users.user)
  // State for all classes. Access them by classes.whichclass
  const classes = useStyles()

  return (
    <Container>
      <Grid 
        className={classes.displays}
        container spacing={5} 
        padding={0}
        // display="flex"
        // alignItems="center"
        // justifyContent="center"
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
            <Box padding={1} className={classes.colorBox}>
              <Typography 
                className={classes.displays}
                variant='h5' 
                component="h2" 
              >
                Monthly Gym Membership
              </Typography>

              <Typography 
                className={classes.displays}
                variant='body2' 
                component="p"
              >
                (Monthly charge until stopped)
              </Typography>

              <Box paddingY={7}>
                <Typography 
                  className={classes.displays}
                  variant='h5' 
                  component="h2"
                >
                  $39.99 USD
                </Typography>
                <Typography 
                  className={classes.displays}
                  variant='body1' 
                  component="p"
                >
                  (No Contract)
                </Typography>
              </Box>

              <Box
                className={classes.displays}
                sx={{ paddingY: 9}}
              >
                {!currentUser.id ?
                  <Link to="/signup" style={{ textDecoration: 'none'}}>
                    <Button className={classes.root}>Purchase Membership</Button>
                  </Link>
                  : 
                  // <Link to="/memberships/new" style={{ textDecoration: 'none'}}>
                  //   <Button className={classes.root}>Purchase Membership</Button>
                  // </Link>
                  <Alert severity="info">You already have an active membership. Cancel your current membership to purchase another.</Alert>
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
            <Box padding={1} className={classes.colorBox}>
              <Typography 
                className={classes.displays}
                variant='h5' 
                component="h2"
              >
                1 Year Gym Membership
              </Typography>

              <Typography 
                className={classes.displays}
                variant='body2' 
                component="p"
              >
                (Paid in full)
              </Typography>

              <Box paddingY={7}>
                <Typography 
                  className={classes.displays}
                  variant='h5' 
                  component="h2"
                >
                  $400.00 USD
                </Typography>
                <Typography 
                  className={classes.displays}
                  variant='body1' 
                  component="p"
                >
                  (Save over 10%!)
                </Typography>
              </Box>

              <Box
                className={classes.displays}
                sx={{ paddingY: 9}}
              >
                {!currentUser.id ?
                <Link to="/signup" style={{ textDecoration: 'none'}}>
                  <Button 
                    className={classes.root}>Purchase Membership</Button>
                </Link>
                : 
                // <Link to="/memberships/new" style={{ textDecoration: 'none'}}>
                //   <Button className={classes.root}>Purchase Membership</Button>
                // </Link>
                <Alert severity="info">You already have an active membership. Cancel your current membership to purchase another.</Alert>
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