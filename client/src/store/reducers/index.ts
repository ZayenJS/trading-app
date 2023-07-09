import { combineReducers } from '@reduxjs/toolkit';
import { globalReducer } from './global';
import { calendarReducer } from './calendar';
import { tradesReducer } from './trades';
import { authReducer } from './auth.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  calendar: calendarReducer,
  trades: tradesReducer,
});

export default rootReducer;
