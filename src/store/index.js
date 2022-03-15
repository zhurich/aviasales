import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import tabReducer from './tabSlice';
import ticketsReducer from './ticketsSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    tab: tabReducer,
    tickets: ticketsReducer,
  },
});
