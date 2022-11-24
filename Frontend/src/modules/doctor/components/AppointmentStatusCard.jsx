import React from "react";
import styles from "./css/AppointmentStatusCard.module.css";

const AppointmentStatusCard = ({ number, title, icon }) => {
  return (
    <>
      <div className={`${styles.appointment_status_card_container}`}>
        <div className={`${styles.top_container}`}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: "#ffebe6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "50%",
                backgroundColor: "#ffc2b3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                style={{ fontSize: "0.8rem", color: "#fd3f00" }}
                className={`fa-solid ${icon}`}
              ></i>
            </div>
          </div>
          <span
            style={{
              marginLeft: "1.2rem",
              fontSize: "1rem",
            }}
          >
            {title}
          </span>
        </div>
        <div
          style={{
            height: "3.25rem",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <span style={{ fontSize: "1.4rem", fontWeight: "550" }}>
            {number}
          </span>
        </div>
      </div>
    </>
  );
};

export default AppointmentStatusCard;
