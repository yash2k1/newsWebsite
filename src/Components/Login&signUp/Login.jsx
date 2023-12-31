import React, { useEffect, useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import img from "../assets/img.jpg";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Top from "../Header/Top";
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const [response, setResponse] = useState("");
  useEffect(() => {
    const baseUrl = `${import.meta.env.VITE_ULR}/Login`;
    // const baseUrl = "https://blog-server-mm8b.onrender.com/Login";
    // const baseUrl = "http://localhost:4040/Login";
    
    axios.post(baseUrl, formData).then((res) => {
      setResponse(res.data);
      console.log(res.data);
    });
  }, [submit]);
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
// form validation
    if ( formData.email.length == 0 ){
      setResponse({ mess: "Enter your email" });
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)){
      setResponse({ mess: "Invalid email address" });
    }
    else if(formData.password.length == 0 ){
      setResponse({ mess: "Enter your password" });
    }
    else if(formData.password.length <6 || formData.password.length >16 ){
      setResponse({ mess: "password length must be of 6-15 characters" });
    }
    else {
      setSubmit(!submit);
    } 
 setTimeout(()=>{
  setResponse("");

 },2000)

  };
  const tostNotify=()=> toast("you are login in");
  
  response.token&&(function goToDashboard  (){
    tostNotify();
    setTimeout(()=>{
      setFromData({
        email: "",
        password: "",
      })
      localStorage.setItem("token", response.token);
      navigate("/");
      
    },2000) 
  }
  )();
 
  return (
    <>
       <div className="registrationHeader">
    
        <Top />
      </div>
    <div className="registration">
     
        <div className="registerContainer loginContainer">
          <img className="registerImg" src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-blogging_516790-1481.jpg?w=2000" alt="not found" />
       

          <form className="register">
            <h1 className="registerHeading">Login Page</h1>
          
        
            <fieldset>
              <legend>Email</legend>
              {/* Email and Password */}
              <EmailOutlinedIcon/>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
              />
            </fieldset>
            <fieldset>
              <legend>Password</legend>
              {/* Name, Phone, Email and Password */}
              <LockOutlinedIcon/>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
              />
            </fieldset>
            {/* <div className="mess">Your are already registered</div> */}
           { response.mess &&  <div className="message"><CloseIcon style={{color:"red"}}/>{response && response.mess}</div>}
            <button className="registerButton " onClick={handleClick}>
              Login 
            </button>
            <div className="goto">
              go to <Link className="link" to={"/Register"}>Register page</Link>
            </div>
          </form>
        </div>
     
    </div>
    <ToastContainer 
    position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark" />
    </>

  );
};

export default Login;
