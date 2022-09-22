import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function HomePage() {
  const currentUser = useSelector((state) => state.users.user) 
  console.log(currentUser)

  return (
    <Container>
      <Grid 
        container spacing={5} 
        paddingY={15} 
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid>
          <Box padding={1}>
            <Link to="/memberships" style={{ textDecoration: 'none'}}>
              <Button  variant="contained" sx={{
                width: "300px",
                height: "100px"
                }}
              >
                Purchase a membership
              </Button>
            </Link>
          </Box>
        </Grid>

        <Grid>
          <Box padding={1}>
            <Link to="/gyms" style={{ textDecoration: 'none'}}>
              <Button  variant="contained" sx={{
                width: "300px",
                height: "100px"
              }}
              >
                See open gyms near you
              </Button>
            </Link>
          </Box>
        </Grid>

      </Grid>
    </Container>
  )
}

export default HomePage