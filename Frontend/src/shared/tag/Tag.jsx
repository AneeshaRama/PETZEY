import React from "react";
import styles from "./Tag.module.css";

const Tag = ({ title }) => {
  return (
    <>
      <div className={`${styles.container}`}>
        <span style={{ fontSize: "0.5rem", fontWeight: "550", color: "brown" }}>
          {title}
        </span>
      </div>
    </>
  );
};

export default Tag;
