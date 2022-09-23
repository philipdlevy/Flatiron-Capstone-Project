import React from 'react'
import {Link} from 'react-router-dom'

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
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
});


function MembershipPage() {
  const classes = useStyles();

  return (
    <Container>
      <Grid 
        container spacing={5} 
        padding={0}
        alignItems="center"
        justifyContent="center"
        marginTop={10}
      >

        <Grid>
          <Paper elevation={3}
            sx={{
              width: "300px",
              height: "500px",
              bgcolor: grey[300]
            }}
          >
            <Box padding={1}>
              <Typography variant='h5' component="h2" >
                Monthly Gym Membership
              </Typography>
              <Typography variant='body2' component="p">
                (Monthly charge until stopped)
              </Typography>

              <Box paddingY={7}>
                <Typography variant='h5' component="h2">
                  $39.99 USD
                </Typography>
                <Typography variant='body1' component="p">
                  (No Contract)
                </Typography>
              </Box>

              <Link to="/signup" style={{ textDecoration: 'none'}}>
                <Button className={classes.root}>Purchase Membership</Button>
              </Link>

            </Box>
          </Paper>
        </Grid>

        <Grid>
          <Paper elevation={3}
            sx={{
              width: "300px",
              height: "500px",
              bgcolor: grey[300]
            }}
          >
            <Box padding={1}>
              <Typography variant='h5' component="h2">
                1 Year Gym Membership
              </Typography>
              <Typography variant='body2' component="p">
                (Paid in full)
              </Typography>

              <Box paddingY={7}>
                <Typography variant='h5' component="h2">
                  $400.00 USD
                </Typography>
                <Typography variant='body1' component="p">
                  (Save over 10%!)
                </Typography>
              </Box>

              <Link to="/signup" style={{ textDecoration: 'none'}}>
                  <Button className={classes.root}>Purchase Membership</Button>
              </Link>

            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

export default MembershipPage;