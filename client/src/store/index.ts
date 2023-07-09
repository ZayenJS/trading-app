import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type State = ReturnType<typeof rootReducer>;
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, Action>;
export type AppDispatch = typeof store.dispatch;
export const useAsyncDispatch = () => useDispatch<AppDispatch>();

export default store;
