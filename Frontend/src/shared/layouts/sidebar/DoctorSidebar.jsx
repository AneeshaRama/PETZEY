import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { useSelector } from "react-redux";

const DoctorSidebar = ({ children }) => {
  // states
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  // configs
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (user?.role === "DOCTOR") {
      setLoading(false);
    }
    if (user?.role === "RECEPTIONIST") {
      navigate("/receptionist/profile");
    }
    if (user?.role === "PATIENT") {
      navigate("/patient/profile");
    }
  }, [user]);

  // Loader
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.sidebar_container}`}>
          <img src="/images/MainLogo.PNG" alt="" width={50} />

          <Link style={{ textDecoration: "none" }} to={"/doctor/dashboard"}>
            <div className={`${styles.navlinks_container}`}>
              <i className="fa-sharp fa-solid fa-chart-simple"></i>
              <span className={`${styles.navlinks}`}>Dashboard</span>
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={"/doctor/pages/all-pets"}
          >
            <div className={`${styles.navlinks_container}`}>
              <i className="fa-solid fa-paw"></i>
              <span className={`${styles.navlinks}`}>Pets</span>
            </div>
          </Link>

          <Link style={{ textDecoration: "none" }} to={"/doctor/profile"}>
            <div className={`${styles.navlinks_container}`}>
              <i className="fa-solid fa-user"></i>
              <span className={`${styles.navlinks}`}>Profile</span>
            </div>
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default DoctorSidebar;
