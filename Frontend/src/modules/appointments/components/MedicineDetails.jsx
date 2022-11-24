import React from "react";
import Tag from "../../../shared/tag/Tag";
import styles from "./css/MedicineDetails.module.css";

const MedicineDetails = ({ name, days, description, duration }) => {
  return (
    <>
      <div className={`${styles.container}`}>
        <p style={{ fontSize: "0.8rem", fontWeight: "550" }}>{name}</p>
        <p style={{ fontSize: "0.6rem", marginTop: "0.4rem" }}>
          Days : <span style={{ fontWeight: "550" }}>{days}</span>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "0.6rem", marginTop: "0.4rem" }}>
            {description}
          </p>
          <Tag title={duration} />
        </div>
      </div>
    </>
  );
};

export default MedicineDetails;
