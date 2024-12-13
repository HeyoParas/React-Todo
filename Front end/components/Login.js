import React from "react";
const Login = () =>{
    return(
        <div className="login-containe">
            <h1>Login</h1>
            <input type="text" placeholder="Enter username"/>
            <input type="password" placeholder="Enter password"/>
            <button>Login</button>
            <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
    )
}

export default Login;