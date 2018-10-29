import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import './Header.css';

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton aria-label="Menu">
        </IconButton>
        <Typography variant="h6" color="inherit">
          Test
        </Typography>
        <div className="Header--menu-container">
          <Button component={Link} to="/home">
            Home
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
