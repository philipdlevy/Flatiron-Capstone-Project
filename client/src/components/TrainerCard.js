import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button'; 


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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            ❚█══█❚
          </Avatar>
        }
        title={trainerObj.name}
      />
      <CardMedia
        component="img"
        height="194"
        image={trainerObj.image_url}
      />
      <CardContent>
        Bio:
        <Typography variant="body2" color="text.secondary">
          {trainerObj.bio}
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
          <Link to="/trainingAppointment/new">
            <Button variant="contained">Book an appointment</Button>
          </Link>
            <Button 
              variant="contained"
              size='small'
              onClick={() => handleDelete(trainerObj.id)}
            >
              Delete trainer
            </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default TrainerCard