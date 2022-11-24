import React from "react";
import styles from "./css/PetCard.module.css";

const PetCard = ({ name, gender, age, species, image }) => {
  return (
    <>
      <div className={`${styles.container}`}>
        <img
          style={{ borderRadius: "50%" }}
          src={image}
          alt=""
          width={50}
          height={50}
        />
        <div>
          <p style={{ fontSize: "0.8rem", fontWeight: "550" }}>{name}</p>
          <p style={{ fontSize: "0.7em" }}>{species}</p>
          <p style={{ fontSize: "0.7rem", marginTop: "0.3rem" }}>
            {gender}, {age} Years
          </p>
        </div>
      </div>
    </>
  );
};

export default PetCard;
