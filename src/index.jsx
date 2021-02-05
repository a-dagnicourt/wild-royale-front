import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { ThemeProvider } from '@material-ui/core';
import App from './App';
import store from './store';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading ~~~~~</div>}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
