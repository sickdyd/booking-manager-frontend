import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';
import 'antd/dist/antd.css';

Sentry.init({dsn: "https://9e88b37548ca41e1808ff6bedf7219f3@o381096.ingest.sentry.io/5207910"});

ReactDOM.render(
  // Strict mode is a recent feature and when used with ant design it creates the following warning:
  // Warning: findDOMNode is deprecated in StrictMode
  // More info here: https://github.com/ant-design/ant-design/issues/22493
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
