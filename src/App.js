import { useState, useEffect } from 'react';
import './App.css';

import Auth from './components/Auth'


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App-header">
      {
        loggedIn ?
          <button style={{ padding: '1em' }} onClick={() => setLoggedIn(false)}>Logout</button>
          :
          <Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          
      }

    </div>
  );
}


export default App;
