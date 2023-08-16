import React, { useState } from 'react'
import Header from '../components/Header'
import SignUpForm from '../components/SignupComponent';
import LoginCom from '../components/LoginCom';
function SignInSignUp() {
  
  const [flag, setFlag] = useState(false);
 
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignUpForm /> : <LoginCom />}
        {!flag ? (
          <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Click here if you already have an account. Login.
          </p>
        ) : (
          <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            If you don't have an account ? click here to SignUp
          </p>
        )}
      </div>
    </div>
  );
}

export default SignInSignUp