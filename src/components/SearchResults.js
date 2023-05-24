import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addHistoryItem } from '../actions/historyActions';

import { Typography, CssBaseline, Pagination, Box, Card, CardContent } from '@mui/material';

export const SearchResults = (props) => {

  const [urlList, setUrlList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const location = useLocation();
  const prompt = location.state.prompt;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.historyItems);

  let status = { done: false };

  useEffect(() => {
    const prompt = location.state.prompt;
    fetch(`http://192.168.1.131:18081/search?prompt=${prompt}`)
      .then(response => response.json())
      .then(data => setUrlList(data))
    if (!status.done) {
      const maxId = selector.reduce((max, item) => Math.max(item.id, max), 0);
      dispatch(addHistoryItem({ id: maxId + 1, query: prompt, timestamp: new Date().toLocaleString() }));
    }
    status.done = true;
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = urlList && urlList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((urlList && urlList.length) / itemsPerPage);

  return (
    <div>
      <CssBaseline />
      <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
        Search Results for "{prompt}":
      </Typography>
      <Typography variant="h6" gutterBottom>
        {urlList && urlList.length} results
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'left',
          minHeight: '100vh',
        }}
      >
        {currentItems && currentItems.map((url) => (
          <Card sx={{ width: '90%', margin: '1rem' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {url.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <a href={url.url}>{url.url}</a>
              </Typography>
              <Typography variant="body2">
                {url.headings[0]}
              </Typography>
              <Typography variant="body2">
                {url.headings[1]}
              </Typography>
              <Typography variant="body2">
                {url.headings[2]}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          style={{ marginTop: '1rem' }}
        />
      </Box>

    </div>
  );
}

