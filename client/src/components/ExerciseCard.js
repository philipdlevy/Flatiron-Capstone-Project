import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { exerciseRemoved } from '../features/exercisesSlice';
import { Link } from 'react-router-dom';

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
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';


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

function ExerciseCard({ exerciseObj }) {
  const currentUser = useSelector((state) => state.users.user)
  const {id, name, info, image_url} = exerciseObj
  const [expanded, setExpanded] = React.useState(false);

  const dispatch = useDispatch()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleDelete(id) {
    fetch(`/exercises/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      dispatch(exerciseRemoved(exerciseObj.id))
    })
    .catch((error) => alert(error))
  }

  return (
    <Grid item xs={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} >
              ❚█══█❚
            </Avatar>
          }
          title={name}
        />
        <CardMedia
          component="img"
          height="194"
          image={image_url}
        />
        <CardContent>
        </CardContent>
        <CardActions disableSpacing>
        <Typography>
            How to perform:
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
            <Typography 
              paragraph color="text.secondary" className='wordWrap'>
              {info}
            </Typography>
          </CardContent>
        </Collapse>

        {currentUser.role && currentUser.role.name === "Admin" ?
          <Button 
            variant='contained' 
            size='small'
            onClick={() => handleDelete(exerciseObj.id)}
          > 
            Delete Exercise
          </Button>
        : null}

        {currentUser.role && currentUser.role.name === "Admin" ?
          <Link to={`/exercises/${id}`} style={{ textDecoration: 'none'}}>
            <Button variant='contained' size='small'> Edit Exercise</Button>
          </Link>
        : null}
      </Card>
    </Grid>
  );
}

export default ExerciseCard