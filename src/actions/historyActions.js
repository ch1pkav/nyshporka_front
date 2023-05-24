export const ADD_HISTORY_ITEM = 'ADD_HISTORY_ITEM';
export const DELETE_HISTORY_ITEM = 'DELETE_HISTORY_ITEM';

export const addHistoryItem = (item) => ({
  type: ADD_HISTORY_ITEM,
  payload: item,
});

export const deleteHistoryItem = (itemId) => ({
  type: DELETE_HISTORY_ITEM,
  payload: itemId,
});
