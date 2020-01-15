import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Dashboard from './component/pages/Dasboard';
import Login from './component/pages/Login';
import Register from './component/pages/Register';
import AuthState from "./context/auth/AuthState";
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './component/routing/PrivateRoute';
import './App.css';
if (localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {
  return (
    <AuthState>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </AuthState>
  );
}
export default App;
