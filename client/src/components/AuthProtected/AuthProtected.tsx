import { FC, ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

export interface AuthProtectedProps {
  isLoggedIn: boolean;
  children: JSX.Element | ReactNode | ReactNode[] | JSX.Element[];
}

const AuthProtected: FC<AuthProtectedProps> = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default AuthProtected;
