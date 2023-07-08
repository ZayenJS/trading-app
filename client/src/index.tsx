import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StringEnhancer } from './utils/StringEnhancer';
import reportWebVitals from './reportWebVitals';

import App from './App/App';

import store from './store';

import './assets/scss/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

StringEnhancer.enhance(String);

root.render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
