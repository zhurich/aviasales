import { combineReducers } from 'redux';
import filters from './filters.js';
import searchMode from './searchMode.js';

const rootReducer = combineReducers({
  filters,
  searchMode,
});

export default rootReducer;
