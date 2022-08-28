import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';

import Backtester from '../pages/PublicPages/Backtester/Backtester';
import Home from '../pages/PublicPages/Home/Home';
import PublicPages from '../pages/PublicPages/PublicPages';
import Strategies from '../pages/PublicPages/Strategies/Strategies';

export interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <Routes>
      <Route path="/admin" />
      <Route path="/" element={<PublicPages />}>
        <Route path="/" element={<Home />} />
        <Route path="/backtester" element={<Backtester />} />
        <Route path="/strategies" element={<Strategies />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
