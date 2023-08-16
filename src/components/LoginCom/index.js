import React, { useState } from 'react'
import InputCom from '../Input';
import Button from '../Button';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../slices/userSlice";
import { toast } from 'react-toastify';

function LoginCom() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleLogin = async () => {
       setLoading(true);
      console.log("Login");
      try {
        
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          Password
        );
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData);

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
       
      
        navigate("/profile");
        // Navigate to the profile page
      
        
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    };
  return (
    <div>
      <InputCom
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="email"
        required={true}
      />
      <InputCom
        state={Password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />

      <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
    </div>
  );
}

export default LoginCom