import React from "react";
import styles from "./GlobalLayout.module.css";

const GlobalLayout = ({ children }) => {
  return <div className={`${styles.container}`}>{children}</div>;
};

export default GlobalLayout;
