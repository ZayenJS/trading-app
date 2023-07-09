import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';

import Backtester from '../pages/LoggedPages/Backtester/Backtester';
import Home from '../pages/LoggedPages/Home/Home';
import LoggedPages from '../pages/LoggedPages/LoggedPages';
import Strategies from '../pages/LoggedPages/Strategies/Strategies';
import TradingCalendar from '../pages/LoggedPages/TradingCalendar/TradingCalendar';
import Projector from '../pages/LoggedPages/Projector/Projector';
import Login from '../pages/PublicPages/Login/Login';
import Register from '../pages/PublicPages/Register/Register';
import { useAuthUser } from '../hooks/useAuthUser';

export interface AppProps {}

const App: FC<AppProps> = () => {
  const { checkUser, checkingUser } = useAuthUser();

  useEffect(() => {
    if (!checkingUser) checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/admin" />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<LoggedPages />}>
        <Route path="/" element={<Home />} />
        <Route path="/backtester" element={<Backtester />} />
        <Route path="/projector" element={<Projector />} />
        <Route path="/strategies" element={<Strategies />} />
        <Route path="/trading-calendar" element={<TradingCalendar />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
