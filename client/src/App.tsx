import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { AuthenticationForm } from './pages/Authentication';
import Todos from './pages/Todos'
import './App.css'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Giriş yapılmamışsa /login sayfasına yönlendir */}
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Todos />} />
        </Route>

        {/* Giriş ve kayıt sayfası */}
        <Route path="/login" element={<AuthenticationForm />} />
      </Routes>
    </Router>
  );
};

export default App;