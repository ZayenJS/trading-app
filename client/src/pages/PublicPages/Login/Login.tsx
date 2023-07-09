import { FC, FormEvent, useState } from 'react';

import classes from './Login.module.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../../store/actions/auth';
import { useAsyncDispatch } from '../../../store';
import { useAuthUser } from '../../../hooks/useAuthUser';

export interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { login, user } = useAuthUser();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: 'test@test.com',
    authToken: 'ea9e83d436874ff09f7ab1b51e0139ff812d2142775c895b2bbc5783eb0e5d55',
    tokenSent: true,
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await login({
      email: state.email,
      token: state.authToken,
    });

    console.log(response);

    navigate('/');
  };

  const onInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSendAuthToken = () => {
    console.log('Send auth token');

    // TODO send auth token to email
    setState((prevState) => ({
      ...prevState,
      tokenSent: true,
    }));
  };

  return (
    <main className={classes.container}>
      <form onSubmit={onFormSubmit} method="POST">
        <div className={classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            value={state.email}
            onChange={onInputChange}
            type="email"
            id="email"
          />
          <button
            className={classes.sendTokenButton}
            disabled={!state.email}
            type="button"
            onClick={onSendAuthToken}>
            Send token
          </button>
        </div>

        {state.tokenSent ? (
          <>
            <div className={`${classes.formGroup} ${classes.formGroupToken}`}>
              <label htmlFor="authToken">Token</label>
              <input
                name="authToken"
                value={state.authToken}
                onChange={onInputChange}
                type="text"
                id="authToken"
              />
            </div>
            <button className={classes.loginButton} type="submit">
              Login
            </button>
          </>
        ) : null}
        <hr />
        <div className={classes.registerContainer}>
          <p>Don't have an account yet?</p>
          <Link className={classes.toRegisterButton} to="/register">
            Register
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
