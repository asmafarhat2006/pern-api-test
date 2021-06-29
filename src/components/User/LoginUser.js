import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { registerUser } from '../../store/auth/Auth.reducers';
import { loginUser } from '../../store/auth/Auth.actions';
import {
  selectuserid,selectisAuthenticated
 } from '../../store/auth/Auth.reducers';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const LoginUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userid = useSelector(selectuserid);
  const isAuthenticated = useSelector(selectisAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm();
  const onSubmit = async (data) => {

    try {
     
      setIsLoading(true);
      console.log(data);
      const response = await dispatch(loginUser(data));
      console.log(response);
      setIsLoading(false);
      history.push('/');
    } catch(err) {
      setIsLoading(false);
    }


  }
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
       <label htmlFor="email">Email</label><input className="form-control" {...register("email", { required: true })} placeholder="Email" />
       </div>
       <div className="form-group">
        <label htmlFor="password">Password</label><input className="form-control" {...register("password", { required: true })} type="password" placeholder="Password" />
      </div>
    { formState.isSubmitted && (
    <div className="success">{isAuthenticated == true ? `Login Successfully for ${userid}` : 'Error during login,check your password'} </div>
  ) }
    <input type="submit" className="btn btn-primary" />
  </form>
  );
}

export default LoginUser;