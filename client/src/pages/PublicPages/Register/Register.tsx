import { FC, FormEvent, useState } from 'react';

import classes from './Register.module.scss';
import { Link } from 'react-router-dom';

export interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
  });
  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Login');
  };

  const onInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <main className={classes.container}>
      <form onSubmit={onFormSubmit} method="POST">
        <div className={classes.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            value={state.firstName}
            onChange={onInputChange}
            type="text"
            id="firstName"
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            value={state.lastName}
            onChange={onInputChange}
            type="text"
            id="lastName"
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={state.username}
            onChange={onInputChange}
            type="text"
            id="username"
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            value={state.email}
            onChange={onInputChange}
            type="text"
            id="email"
          />
        </div>

        <button className={classes.registerButton} type="submit">
          Register
        </button>

        <hr />
        <div className={classes.loginContainer}>
          <p>Already have an account?</p>
          <Link className={classes.toLoginButton} to="/login">
            Login
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Register;
