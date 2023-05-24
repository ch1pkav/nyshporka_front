import { createStore } from 'redux';
import { historyReducer } from '../reducers/historyReducer';

const store = createStore(historyReducer);

export default store;
