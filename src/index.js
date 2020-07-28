import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css';
import './index.scss';
import 'fontsource-roboto';

import App from './App/App.jsx';

const rootElement = document.getElementById('root')
ReactDOM.render(
  <App />,
  rootElement
);
