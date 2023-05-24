import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteHistoryItem } from '../actions/historyActions';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, Card, CardContent, Button, Checkbox, IconButton, Tooltip } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import DeleteIcon from '@mui/icons-material/Delete';

export const HistoryPage = () => {
  const history = useSelector((state) => state.historyItems);

  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([]);
    } else {
      const allItemIds = currentItems.map((item) => item.id);
      setSelectedItems(allItemIds);
    }
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach((itemId) => {
      dispatch(deleteHistoryItem(itemId));
    });
    setSelectedItems([]);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(history.length / itemsPerPage);

  return (
    <div>
      <Box>
        <Button onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>
          Delete Selected
        </Button>
        <Button onClick={handleSelectAll}>
          {selectedItems.length === currentItems.length ? 'Deselect All' : 'Select All'}
        </Button>
      </Box>
      {currentItems.map((item) => (
        <Card key={item.id} style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
          <CardContent>
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
          </CardContent>
          <CardContent>
            <Typography variant="h6">{item.query}</Typography>
            <Typography variant="body2">{item.timestamp}</Typography>
          </CardContent>
          <CardContent>
            <Button onClick={() => navigate(`/search-results/${item.query}`, { state: { prompt: item.query } })}>
              Search
            </Button>
          </CardContent>
          <CardContent style={{ marginLeft: 'auto' }}>
            <Tooltip title="Delete">
              <IconButton onClick={() => dispatch(deleteHistoryItem(item.id))}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
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
    </div>
  );
};

