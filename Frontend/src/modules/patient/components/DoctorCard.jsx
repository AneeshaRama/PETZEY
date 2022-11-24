import React from "react";

const DoctorCard = ({ name, speciality, phone, profilePicture }) => {
  return (
    <>
      <div
        style={{
          width: "13rem",
          height: "5rem",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.9rem",
          marginRight: "0.7rem",
          borderRadius: "0.3rem",
          marginTop: "1rem",
        }}
      >
        <img
          style={{
            borderRadius: "50%",
          }}
          src={
            profilePicture
              ? profilePicture
              : "https://cdn-icons-png.flaticon.com/512/0/93.png"
          }
          alt=""
          width={40}
          height={40}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "60%",
          }}
        >
          <span
            style={{ fontSize: "0.8rem", fontWeight: "550" }}
          >{`Dr. ${name}`}</span>
          <span style={{ fontSize: "0.7rem", color: "gray" }}>
            {speciality}
          </span>
          <span
            style={{ marginTop: "0.4rem", color: "gray", fontSize: "0.7rem" }}
          >{`Mobile : ${phone}`}</span>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
