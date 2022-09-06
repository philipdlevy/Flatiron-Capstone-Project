import React from 'react'
import {Link} from 'react-router-dom'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';


function MembershipPage() {
  return (
    <Container>
      <Grid container spacing={5} paddingY={5}>

        <Grid item xs={6}>
          <Paper elevation={3}>
            <Box padding={1}>
              <Typography variant='h5' component="h2">
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
                  (Quit anytime!)
                </Typography>
              </Box>

              <Link to="/signup">
                <Button variant="contained" paddingY={5}>Purchase Membership</Button>
              </Link>

            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={6}>
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

              <Link to="/signup">
                <Button variant="contained" paddingY={5}>Purchase Membership</Button>
              </Link>

            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

export default MembershipPage;