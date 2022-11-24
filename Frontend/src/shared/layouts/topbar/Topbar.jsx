import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../redux/slices/userSlice";
import styles from "./Topbar.module.css";
import { toast } from "react-hot-toast";

const Topbar = ({ userDetails }) => {
  // useEffect
  useEffect(() => {}, [userDetails]);

  //configs
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //actions
  const handleLogout = () => {
    dispatch(userLogout());
    window.localStorage.removeItem("user");
    Cookies.remove("token");
    toast.success("Successfully logged out.");
    navigate("/");
  };

  return (
    <>
      <div className={`${styles.navbar_container}`}>
        <div className={`${styles.text_container}`}>
          <span className={`${styles.name_text}`}>{userDetails.username}</span>
          <span onClick={handleLogout} className={`${styles.logout_button}`}>
            Logout
          </span>
        </div>
        <img
          className={`${styles.profile_picture}`}
          src={
            userDetails.profilePicture
              ? userDetails.profilePicture
              : "https://cdn-icons-png.flaticon.com/512/0/93.png"
          }
          alt=""
          width={30}
          height={30}
        />
      </div>
    </>
  );
};

export default Topbar;
