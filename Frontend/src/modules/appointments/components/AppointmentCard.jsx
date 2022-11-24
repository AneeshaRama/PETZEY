import React, { useState, useEffect } from "react";
import styles from "./css/AppointmentCard.module.css";
import axios from "axios";
import Loader from "../../../shared/Loader";
import { Link } from "react-router-dom";
import Feedback from "./Feedback";

const AppointmentCard = ({
  petId,
  appointmentDate,
  appointmentTime,
  route,
  appointmentId,
}) => {
  //States
  const [pet, setPet] = useState({});
  const [petOwner, setPetOwner] = useState({});
  const [loading, setLoading] = useState(true);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  //useEffect
  useEffect(() => {
    getPetById();
  }, []);
  //Actions
  const getPetById = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/pets/pet/${petId}/profile`
        )
        .then((data) => {
          setPet(data.data);
          getPetOwner();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getPetOwner = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/owners/owner/pet/${petId}`
        )
        .then((data) => {
          setLoading(false);
          setPetOwner(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
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
            src={pet.profilePic}
            alt=""
            width={60}
            height={60}
          />
          <div className={`${styles.text_container}`}>
            <span style={{ fontSize: "0.8rem", fontWeight: "550" }}>
              {pet.petName}
            </span>
            <span style={{ fontSize: "0.7rem", margin: "0.2rem 0" }}>
              {`${pet.gender}, 2.2 years`}
            </span>
            <span style={{ fontSize: "0.7rem" }}>
              Owner : {petOwner.ownerName}
            </span>
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
      {openFeedbackModal && (
        <Feedback
          appointmentId={appointmentId}
          setOpenFeedbackModal={setOpenFeedbackModal}
        />
      )}
    </>
  );
};

export default AppointmentCard;
