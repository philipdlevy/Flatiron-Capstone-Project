import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from "react-redux";
import { loginUser, logoutUser } from '../features/usersSlice';
import {NavLink, Link, useHistory} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { red } from '@mui/material/colors';

// const pages = ['Trainers', 'Exercise List', 'Open Gyms'];
const pagesLinks = [
  {route: "/trainers", pageName: "Trainers"},
  {route: "/exercises", pageName: "Exercise List"},
  {route: "/gyms", pageName: "Open Gyms"},
  {route: "/memberships", pageName: "Memberships"}
]

const settings = [
  {route: "/account", pageTitle: 'Account'}, 
  {route: "/", pageTitle: 'HomePage'}, 
  {route: "/account/trainingappointments", pageTitle: 'My Training Appointments'}
];

function Navbar() {
  const [firstLetterOfName, setFirstLetterOfName] = useState("")

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const currentUser = useSelector((state) => state.users.user)
  const history = useHistory()

  useEffect(() => {
    if (!currentUser.username) {
      return ""
    } else {
      const name = currentUser.username.slice(0, 1)
      setFirstLetterOfName(name)
    }
  }, [currentUser])

  const dispatch = useDispatch()

  function onLogout() {
    dispatch(logoutUser())
    history.push("/")
  }


  let loginLink;
  let welcomeMessage;
  let logoutButton;
  if (!currentUser.id) {
    loginLink = 
    <Link to="/login" style={{ textDecoration: 'none', color: "white" }}>
      <Typography style={{ fontSize: "0.875rem" }}>
        LOG IN
      </Typography>
    </Link>
  } else {
    welcomeMessage =
    <Typography 
      paddingX={1}
    >
      Welcome, {currentUser.username}!
    </Typography>
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ❚█══█❚ Levy's LiftHouse
          </Typography>          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesLinks.map((page) => (
                <MenuItem 
                  key={page.route} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.route}>
                  <Typography textAlign="center">{page.pageName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>         

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ❚█══█❚ Levy's LiftHouse
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pagesLinks.map((page) => (
              <Button
                key={page.route}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.route}
              >
                {page.pageName}
              </Button>
            ))}
          </Box>

          {currentUser.id ? 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* This shows the letter */}
                <Avatar>{firstLetterOfName}</Avatar>
                {/* This shows the letter */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                  key={setting.route} 
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to={setting.route}
                >
                  <Typography textAlign="center">{setting.pageTitle}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                onClick={onLogout}
              > 
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>

              {currentUser.role.name === "admin" ? 
              <MenuItem> 
                <Link to="/signup/admin" style={{ textDecoration: 'none', color: "black" }}>
                  <Typography textAlign="center">Create Admin Account</Typography>
                </Link>
              </MenuItem> : null }
              
            </Menu>
          </Box>
          : null }

          {loginLink}
          {logoutButton}
        </Toolbar>
      </Container>
      {welcomeMessage}
    </AppBar>
  );
}

export default Navbar;