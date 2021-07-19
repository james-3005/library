import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from './Context/AuthProvider';
import {LoaderProvider} from './Context/LoaderProvider'
ReactDOM.render(
  <Router>
  <AuthProvider>
  <LoaderProvider>
            <App />
  </LoaderProvider>
  </AuthProvider>
  </Router>,
  document.getElementById('root')
);

