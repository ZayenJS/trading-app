import { combineReducers } from '@reduxjs/toolkit';
import { globalReducer } from './global';

const rootReducer = combineReducers({ global: globalReducer });

export default rootReducer;
