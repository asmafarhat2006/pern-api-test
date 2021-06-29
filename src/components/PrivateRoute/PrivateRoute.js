import React, { useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';

import { checkLoginStatus } from '../../store/auth/Auth.actions';
import { useDispatch,useSelector } from 'react-redux';
const PrivateRoute = ({ Component, ...rest }) => {

  const [state, setState] = useState('loading');
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function() {
      try {
        /* Update effect logic to track correct state */
        const response =  await dispatch(checkLoginStatus());
      console.log(response);
        setState(response.payload.isAuthenticated ? 'loggedin' : 'redirect');
      }
      catch {
        setState('redirect');
      }
    })();
  }, []);
  
  /* If in loading state, return loading message while waiting for 
  isValidToken to complete */
  if(state === 'loading') {
    return <div>Loading..</div>
  }

 
  return (
    <Route
      {...rest}
      render={props =>
        (state === 'loggedin') ? <Component {...props} /> : <Redirect to="/userlogin" />
      }
    />
  );
}

export default PrivateRoute;