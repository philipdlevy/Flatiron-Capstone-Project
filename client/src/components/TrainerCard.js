import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { trainerRemoved } from '../features/trainersSlice';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button'; 
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  displays: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function TrainerCard({ trainerObj }) {
  const currentUser = useSelector((state) => state.users.user) 
  const {id, name, bio, email} = trainerObj
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch()

  function handleDelete(id) {
    fetch(`/trainers/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      dispatch(trainerRemoved(trainerObj.id))
    })
    .catch((error) => alert(error))
  }

  return (
    <Grid item xs={4}>

      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              ❚█══█❚
            </Avatar>
          }
          title={name}
        />
        <CardMedia
          component="img"
          height="194"
          image={trainerObj.image_url}
        />
        <CardContent>
          Bio:
          <Typography variant="body2" color="text.secondary">
            {bio}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography>
            Contact info:
            
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph color="text.secondary">Email: {trainerObj.email}</Typography>

            <Box
              className={classes.displays}
            >
              {!currentUser.gym_membership.gym.id ? <Alert severity="info">Must Purchase a Membership to Add Training Appointments.</Alert> : 
              <Link to="/trainingAppointment/new" style={{ textDecoration: 'none'}}>
                <Button variant="contained">Book an appointment</Button>
              </Link>
              }
            </Box>
            
            <Box
              className={classes.displays}
            >
            {currentUser.role && currentUser.role.name === "admin" ?
              <Button 
                variant="contained"
                size='small'
                onClick={() => handleDelete(trainerObj.id)}
              >
                Delete trainer
              </Button>
            : null}
            </Box>

            <Box
              className={classes.displays}
            >
            {currentUser.role && currentUser.role.name === "admin" ?
              <Link to={`/trainers/${id}`} style={{ textDecoration: 'none'}}>
                <Button variant='contained' size='small'>Edit Trainer</Button>
              </Link>
            : null}
            </Box>
            
          </CardContent>
        </Collapse>
      </Card>

    </Grid>
  );
}

export default TrainerCard