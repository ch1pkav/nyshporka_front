import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import { SearchResults } from './components/SearchResults';
import { HistoryPage } from './components/HistoryPage';
import store from './store';
import { Provider } from 'react-redux';

import { Typography, AppBar, CssBaseline, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';


const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <div>
            <nav>
              <CssBaseline />
              <AppBar position="relative" sx={{ height: '6.5vh'}}>
                <Toolbar>
                  <SearchIcon />
                  <Typography variant="h6" color="inherit" noWrap>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                      Nyshporka Search
                    </Link>
                  </Typography>
                  <div style={{ flexGrow: 1 }} />
                  <Link to="/history" style={{ textDecoration: 'none', color: 'white' }}>
                      <HistoryIcon />
                  </Link>
                </Toolbar>
              </AppBar>
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/search-results/:query" element={<SearchResults />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
