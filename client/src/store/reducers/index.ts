import { combineReducers } from '@reduxjs/toolkit';
import { globalReducer } from './global';
import { calendarReducer } from './calendar';

const rootReducer = combineReducers({ global: globalReducer, calendar: calendarReducer });

export default rootReducer;
