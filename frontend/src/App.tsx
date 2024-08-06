import React, { useState } from 'react';
import Login from './pages/Login';
import Movies from './pages/Movies';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <div className="App">
      {!token ? <Login setToken={setToken} setIsAdmin={setIsAdmin} /> : <Movies token={token} isAdmin={isAdmin} />}
    </div>
  );
}

export default App;
