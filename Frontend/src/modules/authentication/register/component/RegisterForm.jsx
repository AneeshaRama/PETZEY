import React from "react";
import styles from "./RegisterForm.module.css";
import { Link } from "react-router-dom";

const RegisterForm = ({ children }) => {
  return (
    <>
      <div className={`${styles.container}`}>
        <img src="/Images/SmallLogo.PNG" alt="" width={40} />
        <span className={`${styles.heading}`}>Register now</span>

        {children}

        <p style={{ fontSize: "0.7rem", color: "gray", marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <span style={{ color: "#fd3f00", fontWeight: "550" }}>Log in</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
