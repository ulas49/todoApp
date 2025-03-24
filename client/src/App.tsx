import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { AuthenticationForm } from './pages/Authentication';
import Todos from './pages/Todos'
import './App.css'


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        {/* <PublicRoute
          restricted={true}
          isAuthenticated={isAuthenticated}
          element={<AuthenticationForm/>}
          path="/login"
        /> */}
        
        {/* <PrivateRoute
          isAuthenticated={isAuthenticated}
          element={<TodoPage />}
          path="/todos"
        /> */}
        
        <Route path="/" element={<Todos/>} />
        <Route path="/login" element={<AuthenticationForm/>} />

      </Routes>
    </Router>
  );
};

export default App;
