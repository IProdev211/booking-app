import React from 'react';
import axios from 'axios';

import Home from './pages';
import { Provider } from './provider';
import './App.css';
import { API_BASE_URL } from './constants';

axios.defaults.baseURL = API_BASE_URL;

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;
