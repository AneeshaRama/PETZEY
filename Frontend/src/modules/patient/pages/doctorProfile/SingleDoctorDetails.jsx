import React, { useState, useEffect } from "react";
import Loader from "../../../../shared/Loader";
import styles from "./SingleDoctorDetails.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PatientSidebar from "../../../../shared/layouts/sidebar/PatientSidebar";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import AppointmentCard from "../../../appointments/components/AppointmentCard";

const SingleDoctorDetails = () => {
  //states
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAppointmentHistory, setShowAppointmentHistory] = useState(false);
  const [appointmentHistories, setAppointmentHistories] = useState([]);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  //config
  const { id } = useParams();

  //useEffect
  useEffect(() => {
    getDoctorById();
  }, []);

  //get doctor by id
  const getDoctorById = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/doctors/doctor/${id}/profile`
        )
        .then((data) => {
          setDoctor(data.data);
          checkForAppointmentHistory(id);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const checkForAppointmentHistory = async (id) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/appointment-histories/exist/doctor/${id}`
        )
        .then((data) => {
          if (data.data === true) {
            setShowAppointmentHistory(true);
            getAppointmentHistories(id);
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAppointmentHistories = async (id) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/appointment-histories/doctor/${id}/appointment-history`
        )
        .then((data) => {
          setAppointmentHistories(data.data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Loader
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <PatientSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div className={`${styles.container}`}>
            <Link
              style={{ textDecoration: "none" }}
              to={"/patient/doctors/profiles"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <i
                  style={{
                    fontSize: "0.6rem",
                    cursor: "pointer",
                  }}
                  className="fa-solid fa-arrow-left-long"
                ></i>
                <p
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: "550",
                    marginBottom: "0.8rem",
                    marginLeft: "0.4rem",
                  }}
                >
                  Back to profile
                </p>
              </div>
            </Link>
            <div className={`${styles.doctor_details_container}`}>
              <div className={`${styles.top_header}`}>
                <span style={{ fontSize: "0.8rem", fontWeight: "550" }}>
                  Vet details
                </span>
              </div>
              <div className={`${styles.bottom_header}`}>
                <img
                  style={{
                    borderRadius: "50%",
                  }}
                  width={80}
                  height={80}
                  src={
                    doctor.profilePicture
                      ? doctor.profilePicture
                      : "https://cdn-icons-png.flaticon.com/512/0/93.png"
                  }
                  alt=""
                />
                <div
                  style={{
                    display: "flex",
                    width: "80%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "45%",
                    }}
                  >
                    <p style={{ fontSize: "0.85rem", color: "gray" }}>
                      {`Name: `}
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "550",
                          marginLeft: "1.9rem",
                        }}
                      >{`  Dr.${doctor.doctorName}`}</span>
                    </p>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "gray",
                        marginTop: "0.8rem",
                      }}
                    >
                      {`NPI: `}
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "550",
                          marginLeft: "2.8rem",
                        }}
                      >{`${doctor.npiNumber}`}</span>
                    </p>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "gray",
                        marginTop: "0.8rem",
                      }}
                    >
                      {`Speciality: `}
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "550",
                          marginLeft: "0.5rem",
                        }}
                      >{`${doctor.speciality}`}</span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "40%",
                    }}
                  >
                    <p style={{ fontSize: "0.85rem", color: "gray" }}>
                      {`Mobile: `}
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "550",
                          marginLeft: "1rem",
                        }}
                      >{`${doctor.phoneNumber}`}</span>
                    </p>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "gray",
                        marginTop: "0.8rem",
                      }}
                    >
                      {`Email: `}
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "550",
                          marginLeft: "1.5rem",
                        }}
                      >{`${doctor.email}`}</span>
                    </p>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "gray",
                        marginTop: "0.8rem",
                      }}
                    >
                      {`Clinic: `}
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "550",
                          marginLeft: "1.5rem",
                        }}
                      >{`${doctor.address}`}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {showAppointmentHistory && (
              <>
                <div>
                  <div
                    style={{ marginTop: "2rem" }}
                    className={`${styles.appointment_report_header}`}
                  >
                    <span style={{ fontSize: "1.2rem", fontWeight: "550" }}>
                      Appointment History
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    flexWrap: "wrap",
                  }}
                >
                  {appointmentHistories.map((h) => {
                    return (
                      <AppointmentCard
                        key={h.appointmentHistoryId}
                        petId={h.petId}
                        appointmentDate={h.appointmentDate}
                        appointmentTime={h.appointmentTime}
                        appointmentId={h.appointmentId}
                        route={`/doctor/pages/appointment/details/${h.appointmentId}`}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </GlobalLayout>
      </PatientSidebar>
    </>
  );
};

export default SingleDoctorDetails;
