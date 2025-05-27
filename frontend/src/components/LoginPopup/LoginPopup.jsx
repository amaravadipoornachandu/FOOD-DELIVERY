import React from "react";
import "./LoginPopup.css";
import { useState,useContext } from "react";
import {StoreContext} from '../../context/StoreContext';
import { assets } from "../../assets/assets.js";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const {url,setToken}=useContext(StoreContext);
  const [currentState, setCurrentState] = React.useState("Login");
  const [data,setData]=useState({
    name:'',
    email:'',
    password:''
  });

  

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData((data)=>({...data,[name]:value}));
  }

const onLogin=async(e)=>{
e.preventDefault();
let newUrl=url;
if(currentState==='Login'){
  newUrl+=`/api/user/login`;
}
else{
  newUrl+=`/api/user/register`;
}
const response=await axios.post(newUrl,data);
if(response.data.success){
  setToken(response.data.token);
  localStorage.setItem('token',response.data.token);
  setShowLogin(false);

}
else{
  alert(response.data.message);
}
}


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Name" required />
          )}

          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "create account" : "login"}
        </button>
        <div className="logi-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the terms and conditions</p>
        </div>
        {currentState === "Login" ? (
          <p>
            create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
