import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

export interface PublicPagesProps {}

const PublicPages: FC<PublicPagesProps> = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PublicPages;
