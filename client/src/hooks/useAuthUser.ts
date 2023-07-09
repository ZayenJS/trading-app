import { useSelector } from 'react-redux';
import { State, useAsyncDispatch } from '../store';
import { LoginPayload, checkUser, login } from '../store/actions/auth';

export const useAuthUser = () => {
  const { user, checkingUser } = useSelector((state: State) => state.auth);
  const asyncDispatch = useAsyncDispatch();

  return {
    user,
    checkingUser,
    login: (data: LoginPayload) => {
      asyncDispatch(login(data));
    },
    checkUser: () => {
      return asyncDispatch(checkUser());
    },
  };
};
