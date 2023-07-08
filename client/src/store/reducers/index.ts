import { combineReducers } from '@reduxjs/toolkit';
import { globalReducer } from './global';
import { calendarReducer } from './calendar';
import { tradesReducer } from './trades';

const rootReducer = combineReducers({
  global: globalReducer,
  calendar: calendarReducer,
  trades: tradesReducer,
});

export default rootReducer;
