import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import RegisterUser from "./components/user/registeruser";
import UserLogin from "./components/user/loginuser";

function App() {
  return (<Router>
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">Ecommerce Website </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/register-user"}>Register User</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/userlogin"}>Login</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route exact path='/' component={RegisterUser} />
              <Route path="/register-user" component={RegisterUser} />
              <Route path="/userlogin" component={UserLogin} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;