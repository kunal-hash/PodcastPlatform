import React from 'react'
import { useSelector } from "react-redux";
import Header from '../components/Header';
import Button from '../components/Button';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from '../components/Loader';
function Profile() {
  const user = useSelector((state) => state.user.user);
  if (!user) {
    return <Loader />;
  }
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div>
        <Header />
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text={"Logout"} onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Profile