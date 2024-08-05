import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';

const NavBar = () => {
    return (
        <AppBar position="static" sx={{mb:10}}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="../../logoStock2.png" alt="Logo" style={{ height: '60px', marginRight: '16px' }} />
                    
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
