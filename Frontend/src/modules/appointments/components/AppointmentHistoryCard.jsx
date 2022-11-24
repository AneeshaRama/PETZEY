import React, { useState, useEffect } from "react";
import styles from "./css/AppointmentHistory.module.css";
import { Link } from "react-router-dom";
import Loader from "../../../shared/Loader";
import axios from "axios";

const AppointmentHistoryCard = ({
  route,
  petName,
  appointmentId,
  appointmentDate,
  appointmentTime,
  doctorId,
  ownerName,
}) => {
  // states
  const [loading, setLoading] = useState();
  const [doctor, setDoctor] = useState({});
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  // useEffects
  useEffect(() => {
    getDoctor();
  }, []);

  // Actions
  const getDoctor = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/doctors/doctor/${doctorId}/profile`
        )
        .then((data) => {
          setDoctor(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // Loader
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.middle_container}`}>
          <img
            style={{ borderRadius: "50%" }}
            src={doctor.profilePicture}
            alt=""
            width={60}
            height={60}
          />
          <div className={`${styles.text_container}`}>
            <span style={{ fontSize: "0.8rem", fontWeight: "550" }}>
              {doctor.doctorName}
            </span>
            <span style={{ fontSize: "0.7rem", margin: "0.2rem 0" }}>
              {`2, 2.2 years`}
            </span>
            <span style={{ fontSize: "0.7rem" }}> {doctor.ownerName}</span>
          </div>
        </div>
        <div className={`${styles.bottom_container}`}>
          <div className={`${styles.right_container}`}>
            <p style={{ fontSize: "1.3rem", fontWeight: "550" }}>
              {appointmentTime}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "550",
                marginTop: "0.3rem",
              }}
            >
              {appointmentDate.replace(/-/g, "/")}
            </p>
          </div>
          <div className={`${styles.icon_container}`}>
            <i
              style={{ color: "#fd3f00", cursor: "pointer" }}
              className="fa-solid fa-message"
            ></i>
            <i
              style={{
                color: "#fd3f00",
                marginLeft: "0.8rem",
                cursor: "pointer",
              }}
              className="fa-solid fa-phone"
            ></i>
            <i
              style={{
                color: "#fd3f00",
                marginLeft: "0.8rem",
                cursor: "pointer",
              }}
              className="fa-solid fa-video"
            ></i>
          </div>
        </div>

        <div className={`${styles.footer}`}>
          <Link style={{ textDecoration: "none" }} to={route}>
            <p style={{ cursor: "pointer" }}>Details</p>
          </Link>
          <p
            onClick={() => setOpenFeedbackModal(true)}
            style={{ cursor: "pointer" }}
          >
            Feedback
          </p>
        </div>
      </div>
    </>
  );
};

export default AppointmentHistoryCard;
