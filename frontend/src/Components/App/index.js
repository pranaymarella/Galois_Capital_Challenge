import React from 'react';
// import { Route, Link } from 'react-router-dom'
import Home from '../Home';
import './styles.css';

const App = () => (
  <div className="App">
    <div className="header">
      <h2>Galois Capital</h2>
    </div>

    <main>
      <Home />
    </main>
  </div>
);

export default App;
