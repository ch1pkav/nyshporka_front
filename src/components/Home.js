import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

theme.typography.h1 = {
  fontFamily: 'Permanent Marker',
  fontWeight: 400,
  fontSize: '3rem',
  '@media (min-width:600px)': {
    fontSize: '4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '5rem',
  },
};


const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search-results/${searchQuery}`, { state: { prompt: searchQuery } });
  };

  return (
    <div>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '93.5vh',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url('../pexels-steve-johnson-1509534.jpg')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(2px)',
            opacity: 0.9,
          }}
        />
        <ThemeProvider theme={theme}>
          <Typography variant="h1" color="inherit" noWrap sx={{ zIndex: 1, color: 'white' }}>
            Nyshporka
          </Typography>
        </ThemeProvider>
        <Paper
          elevation={6}
          sx={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '1rem',
            borderRadius: '8px',
            margin: '1rem',
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <TextField
                id="outlined-basic"
                label="Prompt"
                variant="standard"
                value={searchQuery}
                onChange={handleInputChange}
                sx={{ flex: '1', height: '3rem', marginRight: '1rem' }}
              />
              <Button variant="contained" type="submit" sx={{ height: '3rem' }}>
                <SearchIcon />
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default Home;

