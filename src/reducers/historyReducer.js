import { ADD_HISTORY_ITEM, DELETE_HISTORY_ITEM } from "../actions/historyActions"

const initialState = {
  historyItems: [

  ],
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HISTORY_ITEM:
      return {
        ...state,
        historyItems: [...state.historyItems, action.payload],
      };
    case DELETE_HISTORY_ITEM:
      return {
        ...state,
        historyItems: state.historyItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

