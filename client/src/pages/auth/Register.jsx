import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import { registerUser } from '@/store/auth-slice';

import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";


const initialState = {
  userName: '',
  email: '',
  password: '',
}

function AuthRegister() {

 const [formData,setFormData] = useState(initialState);
 const dispatch = useDispatch();
const navigate = useNavigate();

// const {toast} = useToaster();

 const onSubmit=(event)=>{
   event.preventDefault();
    dispatch(registerUser(formData)).then((data)=> {
      if(data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      }else{
        toast.error(data?.payload?.message);
      }
      
    })
 } 

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link className="font-medium text-primary ml-2 hover:underline" to='/auth/login'>
            Login
          </Link>
        </p>
      </div>
      <CommonForm formCotrols={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister
