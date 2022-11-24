import React, { useState, useEffect } from "react";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import DoctorSidebar from "../../../../shared/layouts/sidebar/DoctorSidebar";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import styles from "./DoctorDashboard.module.css";
import { Link } from "react-router-dom";
import AppointmentStatusCard from "../../components/AppointmentStatusCard";
import axios from "axios";
import Loader from "../../../../shared/Loader";
import AppointmentCard from "../../../appointments/components/AppointmentCard";
import {
  getCancelledAppointments,
  getClosedAppointments,
  getConfirmedAppointments,
} from "../../../../utils/FetchDetails";

const DoctorDashboard = () => {
  //states
  const [total, setTotal] = useState("");
  const [closed, setClosed] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [cancelled, setCancelled] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  //configs
  // const { total, confirmed, closed, cancelled } = appointmentNumber;

  useEffect(() => {
    getAllAppointments();
  }, []);

  useEffect(() => {}, [appointments]);

  //Actions
  const getAllAppointments = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/appointments/doctor/${userDetails.doctorId}`
        )
        .then((data) => {
          setLoading(false);
          setAppointments(data.data);
          setTotal(data.data.length);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
      let closedApp = await getClosedAppointments();
      setClosed(closedApp);
      let confiremdApp = await getConfirmedAppointments();
      setConfirmed(confiremdApp);
      let cancelledApp = await getCancelledAppointments();
      setCancelled(cancelledApp);
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
      <DoctorSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div className={`${styles.appointment_status_header}`}>
            <AppointmentStatusCard
              title={"Total"}
              number={total}
              icon={"fa-bolt-lightning"}
            />
            <AppointmentStatusCard
              title={"Confirmed"}
              number={confirmed}
              icon={"fa-check"}
            />
            <AppointmentStatusCard
              title={"Closed"}
              number={closed}
              icon={"fa-square-check"}
            />
            <AppointmentStatusCard
              title={"Cancelled"}
              number={cancelled}
              icon={"fa-xmark"}
            />
          </div>
          <div className={`${styles.header}`}>
            <span style={{ fontSize: "1.3rem", fontWeight: 550 }}>
              All Appointments
            </span>
            <div className={`${styles.right_header}`}>
              <Link to={"/doctor/new/appointment"}>
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
                  route={`/doctor/pages/appointment/details/${a.appointmentId}`}
                />
              );
            })}
          </div>
        </GlobalLayout>
      </DoctorSidebar>
    </>
  );
};

export default DoctorDashboard;
