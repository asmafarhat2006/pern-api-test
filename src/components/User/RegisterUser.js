import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { registerUser } from '../../store/auth/Auth.reducers';
import { registerUser } from '../../store/user/User.actions';
import {
 selectCurrentUser
} from '../../store/user/User.reducers';
const RegisterUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  //const [createdUser, setCreatedUser] = useState({});
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = async (data) => {

    try {
     
      setIsLoading(true);
      console.log(data);
      const response = await dispatch(registerUser(data));
      console.log(response);
    //  setCreatedUser(response.payload);
      setIsLoading(false);
      history.push('/');
    } catch(err) {
      setIsLoading(false);
    }


  }
   
  /* Registration handler
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      console.log(e)
      await dispatch(registerUser(e));
      setIsLoading(false);
      history.push('/');
    } catch(err) {
      setIsLoading(false);
    }
  }
*/

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="form-group">
        <label for="firstname">First Name</label> <input class="form-control" {...register("firstname", { required: true })} placeholder="FirstName" />
      </div>    
      <div class="form-group">
        <label for="lastname">Last Name</label> <input class="form-control" {...register("lastname", { required: true })} placeholder="LastName"/>
      </div>
      <div class="form-group">
       <label for="email">Email</label><input class="form-control" {...register("email", { required: true })} placeholder="Email" />
       </div>
       <div class="form-group">
        <label for="password">Password1</label><input class="form-control" {...register("password", { required: true })} type="password" placeholder="Password" />
      </div>
    { formState.isSubmitted && (
    <div className="success">Form submitted successfully for {currentUser.email} {currentUser.lastname} </div>
  ) }
    <input type="submit" class="btn btn-primary" />
  </form>
  );
}

export default RegisterUser;