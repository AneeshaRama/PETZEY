import React, { useState, useEffect } from "react";
import ReceptionistSidebar from "../../../../shared/layouts/sidebar/ReceptionistSidebar";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import styles from "./ReceptionistDashboard.module.css";
import { Link } from "react-router-dom";
import Loader from "../../../../shared/Loader";
import axios from "axios";
import AppointmentCard from "../../../appointments/components/AppointmentCard";

const ReceptionistDashboard = () => {
  // states
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  // useEffect
  useEffect(() => {
    getAllAppointments();
  }, []);

  useEffect(() => {}, [appointments]);

  //Actions
  const getAllAppointments = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/appointments/all-appointments`
        )
        .then((data) => {
          setLoading(false);
          setAppointments(data.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointmentsByStatus = async (status) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/appointments/status/${status}`
        )
        .then((data) => {
          setAppointments(data.data);
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
      <ReceptionistSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div className={`${styles.header}`}>
            <span style={{ fontSize: "1.3rem", fontWeight: 550 }}>
              All Appointments
            </span>
            <div className={`${styles.right_header}`}>
              {/* <button
                style={{
                  border: "none",
                  padding: "0.35rem",
                  backgroundColor: "white",
                  borderRadius: "0.3rem",
                  cursor: "pointer",
                  marginRight: "0.5rem",
                  fontSize: "0.6rem",
                }}
              >
                <i
                  style={{ marginRight: "0.3rem" }}
                  className="fa-regular fa-calendar"
                ></i>
                Select dates
              </button> */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowStatus(!showStatus)}
                  style={{
                    border: "none",
                    padding: "0.35rem",
                    backgroundColor: "white",
                    borderRadius: "0.3rem",
                    cursor: "pointer",
                    marginRight: "0.5rem",
                    fontSize: "0.6rem",
                  }}
                >
                  Status
                  <i
                    style={{ marginLeft: "0.2rem" }}
                    className="fa-solid fa-angle-down"
                  ></i>
                </button>
                {showStatus && (
                  <div
                    style={{
                      position: "absolute",
                      width: "6rem",
                      height: "6.5rem",
                      backgroundColor: "white",
                      top: "2rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.3rem",
                    }}
                  >
                    <div
                      onClick={() => getAppointmentsByStatus("REQUESTED")}
                      style={{ cursor: "pointer" }}
                    >
                      <span style={{ fontSize: "0.6rem", fontWeight: "550" }}>
                        REQUESTED
                      </span>
                    </div>
                    <div
                      onClick={() => getAppointmentsByStatus("CONFIRMED")}
                      style={{ cursor: "pointer", marginTop: "0.3rem" }}
                    >
                      <span style={{ fontSize: "0.6rem", fontWeight: "550" }}>
                        CONFIRMED
                      </span>
                    </div>
                    <div
                      onClick={() => getAppointmentsByStatus("CANCELLED")}
                      style={{ cursor: "pointer", marginTop: "0.3rem" }}
                    >
                      <span style={{ fontSize: "0.6rem", fontWeight: "550" }}>
                        CANCELLED
                      </span>
                    </div>
                    <div
                      onClick={() => getAppointmentsByStatus("CLOSED")}
                      style={{ cursor: "pointer", marginTop: "0.3rem" }}
                    >
                      <span style={{ fontSize: "0.6rem", fontWeight: "550" }}>
                        CLOSED
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <Link to={"/receptionist/new/appointment"}>
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
            {appointments.length === 0 && (
              <span style={{ marginTop: "3rem", fontSize: "0.7rem" }}>
                No appointments found...
              </span>
            )}
            {appointments.map((a) => {
              return (
                <AppointmentCard
                  appointmentDate={a.appointmentDate}
                  appointmentTime={a.appointmentTime}
                  appointmentId={a.appointmentId}
                  key={a.appointmentId}
                  petId={a.petId}
                  route={`/receptionist/pages/appointment/details/${a.appointmentId}`}
                />
              );
            })}
          </div>
        </GlobalLayout>
      </ReceptionistSidebar>
    </>
  );
};

export default ReceptionistDashboard;
