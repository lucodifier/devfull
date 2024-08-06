import React, { useState } from 'react';
import axios from 'axios';
import { decodeToken } from "react-jwt";

interface LoginProps {
  setToken: (token: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setToken, setIsAdmin }) => {
  const [email, setEmail] = useState<string>('locatario@dev.com');
  const [password, setPassword] = useState<string>('123456');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

debugger

      const response = await axios.post('http://localhost:3333/api/login', { email, password });

      const token = response.data.token;
      setToken(token);

      const decodedToken: any = decodeToken(token);
      const userRole = decodedToken?.role;

      if (userRole === 'admin')
        setIsAdmin(true);
      else 
        setIsAdmin(false);

      setShowAlert(false);

    } catch (error) {
      setShowAlert(true);
      console.error('Erro no login', error);

    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="col-4">
        <h2 className="text-center">Login</h2>

        {showAlert && (
        <div className="alert alert-danger" role="alert">
         Credencias inválidas
        </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <hr/>
        <h3>Usuários de teste</h3>
        <p>admin@dev.com | 123456</p>
        <p>locatario@dev.com | 123456</p>
      </div>
    </div>
  );
};

export default Login;
