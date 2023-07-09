import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import AuthProtected from '../../components/AuthProtected/AuthProtected';
import { useAuthUser } from '../../hooks/useAuthUser';

export interface PublicPagesProps {}

const PublicPages: FC<PublicPagesProps> = () => {
  const { user } = useAuthUser();

  return (
    <AuthProtected isLoggedIn={user}>
      <Layout>
        <Outlet />
      </Layout>
    </AuthProtected>
  );
};

export default PublicPages;
