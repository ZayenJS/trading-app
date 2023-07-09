import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginPayload } from './auth.payload';
import { appAxios } from '../../../utils/axios';

export enum AuthActionType {
  LOGIN = 'auth/LOGIN',
  CHECK_USER = 'auth/CHECK_USER',
}

export const login = createAsyncThunk(
  AuthActionType.LOGIN,
  async (payload: LoginPayload) => {
    const { email, token } = payload;

    const { data } = await appAxios.post<{ message: string; user: any }>('/auth/login', {
      email,
      authToken: token,
    });

    return data;
  },
);

export const checkUser = createAsyncThunk(AuthActionType.CHECK_USER, async () => {
  const { data } = await appAxios.get<{ message: string; user: any }>('/auth/check-user');

  return data;
});
