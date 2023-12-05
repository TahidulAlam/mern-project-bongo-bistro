/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../../hooks/useAxios";

const SocialAuth = () => {
  const { signInWithGoogle } = useAuth();
  const axiosUser = useAxios();
  const navigate = useNavigate();
  const handleGoogleSignIn = (media) => {
    media()
      .then((result) => {
        console.log(result);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        console.log(userInfo);
        axiosUser.post("/api/bb/users", userInfo);
        Swal.fire("Sign In seccessfully");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("error");
      });
  };
  return (
    <div>
      <div
        className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        onClick={() => handleGoogleSignIn(signInWithGoogle)}
      >
        <FcGoogle size={32} />

        <p>Continue with Google</p>
      </div>
    </div>
  );
};

export default SocialAuth;
