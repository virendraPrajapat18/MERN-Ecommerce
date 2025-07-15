
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated,children}) {

// console.log("checkAuth",isAuthenticated);
// console.log("checkAuth-user",user);

// console.log("checkAuth",children);
const user = JSON.parse(localStorage.getItem("user"));


  const location = useLocation();

  // if (isAuthenticated && !user) {
  //   return <Navigate to="/auth/register" />;
  // }

  if(location.pathname === '/'){
    if(!isAuthenticated){
       return <Navigate to="/auth/login" />;
    }
    else{
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    !isAuthenticated && !(location.pathname.includes("/login") ||
    location.pathname.includes("/register")
  )
  ){
    return <Navigate to='/auth/login' />
  }

  if (
    isAuthenticated && (location.pathname.includes("/login") ||
    location.pathname.includes("/register")
  )
){
  if(user?.role === 'admin' ){
    return <Navigate to='/admin/dashboard' />
  }else{
    return <Navigate to="/shop/home" />; 
  }
}

if(isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')){
  
  return <Navigate to='/unauth-page' />
}

if(isAuthenticated && user?.role === 'admin' && location.pathname.includes('/shop')){
  
   return <Navigate to="/admin/dashboard" />;
}

return <>{children}</>

}

export default CheckAuth;
