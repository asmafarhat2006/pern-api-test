import React, { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import RegisterUser from "./components/User/RegisterUser";
import UserLogin from "./components/User/LoginUser";
import Home from "./components/Home/Home";
import ProductDetails from './components/ProductDetails/ProductDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import OrderDetails from './components/OrderDetails/OrderDetails';

import { useDispatch,useSelector } from 'react-redux';
import { checkLoginStatus } from './store/auth/Auth.actions';

function App() {

  const dispatch = useDispatch();
  //const userid = useSelector(selectuserid);
  const userid = useSelector(state => state.auth.userid);
  const { items } = useSelector(state => state.cart);
  console.log(items);
  console.log('after loggedin'+ userid);
  // Load user cart on entry to app
  useEffect(() => {
    async function isLoggedIn() {
      if(userid == null){
            const response =  await dispatch(checkLoginStatus());
            console.log(userid);
        }
    }

    isLoggedIn();
   
  }, [dispatch]);
  function renderElement(){
    if(userid )
       return (
       <form className="d-flex">
         
           <Link className="btn btn-outline-dark" to={"/cart"} >
               <i className="bi-cart-fill me-1"></i>
               Cart
               <span className="badge bg-dark text-white ms-1 rounded-pill">{items.length}</span>
           </Link>
       </form>);
    return null;
 }
  return (<Router>
    
    <div className="App">
      
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">Ecommerce Website</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">{userid ? <Link className="nav-link" to={"/"}>Products</Link> : <Link className="nav-link" to={"/register-user"}>Register User</Link> } </li>
                        <li className="nav-item">{userid ?  <a className="nav-link" href="/api/auth/logout">Logout</a> : <Link  className="nav-link" to={"/userlogin"}>Login</Link> }</li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                             <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/">Popular Items</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>{userid ? <a className="dropdown-item" href="/orders">Orders</a> : null}</li>
                                <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li>
                    </ul>
                    
                    
                      {renderElement()}
                    
                    
                </div>
            </div>
        </nav>
         <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Shop in style</h1>
                    <p className="lead fw-normal text-white-50 mb-0">With this shop hompage template</p>
                </div>
            </div>
        </header>
      
      
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path="/register-user" component={RegisterUser} />
                <Route path="/userlogin" component={UserLogin} />
                <Route path="/products/:productId" component={ProductDetails}/>
                <Route path="/orders" component={Orders}/>

                  {/* Private Routes */}
                  <PrivateRoute exact path='/cart' Component={Cart} />
                  <PrivateRoute exact path='/checkout' Component={Checkout} />
                  <PrivateRoute exact path='/orders' Component={Orders} />
                  <PrivateRoute exact path='/orderdetail/:orderId' Component={OrderDetails} />
              </Switch>
            </div>
          </div>
        </div>
    </div>
  </Router>
  );
}

export default App;