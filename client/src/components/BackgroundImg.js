import React from 'react'

import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

function BackgroundImg() {
    return (
        <Box
          component="ul"
          sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
        >
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
            <CardCover>
              <img
                src="https://media.istockphoto.com/photos/empty-gym-picture-id1132006407?b=1&k=20&m=1132006407&s=612x612&w=0&h=yuM0-g7YG76wCNOKxejD2aJvdF83hVWCtUUNAKx2Q2A="
                srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
                alt=""
              />
            </CardCover>
            <CardContent sx={{ justifyContent: 'center', gap: 1 }}>
              <Typography
                level="h6"
                fontWeight="lg"
                textColor="#fff"
                mt={{ xs: 12, sm: 18 }}
              >
              </Typography>
            </CardContent>
          </Card>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
          </Card>
        </Box>
      );
}

export default BackgroundImg