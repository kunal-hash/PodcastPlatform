import React, { useState } from 'react'
import InputCom from '../Input';
import Button from '../Button';
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function SignUpForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const handleSignup = async () => {
       
    
    setLoading(true);
    if (
      password == confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);
             await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
             })
            dispatch(
              setUser({
                name: fullName,
                email: user.email,
                uid: user.uid,
              })
        );
        toast.success("User has been created!");
         setLoading(false);
        navigate("/profile");
       

      } catch (error) {
      setLoading(false);
        console.log("error", error);
        toast.error(error.message);
      }
    }
    else {
      if (password !== confirmPassword) {
        toast.error(
          "Please make sure your password and confirm password matches"
        );
      }
      else if (password.length < 6) {
         toast.error(
           "Please make sure your password length is greater than 6 characters"
         );

      }
      setLoading(false);
    }

};
  
    return (
      <div>
        <InputCom
          state={fullName}
          setState={setFullName}
          placeholder="Full Name"
          type="text"
          required={true}
        />
        <InputCom
          state={email}
          setState={setEmail}
          placeholder="Email"
          type="email"
          required={true}
        />
        <InputCom
          state={password}
          setState={setPassword}
          placeholder="Password"
          type="password"
          required={true}
        />
        <InputCom
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder="Confirm Password"
          type="password"
          required={true}
        />
        <Button
          text={loading ? "Loading..." : "Signup"}
          disabled={loading}
          onClick={handleSignup}
        />
      </div>
    );
}

export default SignUpForm;