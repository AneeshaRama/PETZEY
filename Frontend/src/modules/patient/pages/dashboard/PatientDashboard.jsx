import React, { useState, useEffect } from "react";
import styles from "./PatientDashboard.module.css";
import { Link } from "react-router-dom";
import PatientSidebar from "../../../../shared/layouts/sidebar/PatientSidebar";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import Loader from "../../../../shared/Loader";
import axios from "axios";
import AppointmentCard from "../../../appointments/components/AppointmentCard";

const PatientDashboard = () => {
  // states
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect
  useEffect(() => {
    getAppointments();
  }, []);
  // Actions
  const getAppointments = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/appointments/owner/${userDetails.ownerId}/details`
        )
        .then((data) => {
          setAppointment(data.data);
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

  // Loder
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <PatientSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div className={`${styles.header}`}>
            <span style={{ fontSize: "1.3rem", fontWeight: 550 }}>
              All Appointments
            </span>
            <div className={`${styles.right_header}`}>
              <Link to={"/new/appointment"}>
                <button
                  style={{
                    border: "none",
                    padding: "0.35rem 0.4rem",
                    backgroundColor: "#fd3f00",
                    borderRadius: "0.3rem",
                    cursor: "pointer",
                    marginRight: "0.5rem",
                    fontSize: "0.6rem",
                    color: "white",
                  }}
                >
                  <i
                    style={{ marginRight: "0.3rem", fontSize: "0.5rem" }}
                    className="fa-regular fa-plus"
                  ></i>
                  New Appointment
                </button>
              </Link>
            </div>
          </div>
          <div className={`${styles.container}`}>
            {appointment.length === 0 && (
              <span style={{ marginTop: "3rem", fontSize: "0.7rem" }}>
                No appointments found...
              </span>
            )}
            {appointment.map((a) => {
              return (
                <AppointmentCard
                  appointmentDate={a.appointmentDate}
                  appointmentTime={a.appointmentTime}
                  appointmentId={a.appointmentId}
                  key={a.appointmentId}
                  petId={a.petId}
                  route={`/patient/pages/appointment/details/${a.appointmentId}`}
                />
              );
            })}
          </div>
        </GlobalLayout>
      </PatientSidebar>
    </>
  );
};

export default PatientDashboard;
