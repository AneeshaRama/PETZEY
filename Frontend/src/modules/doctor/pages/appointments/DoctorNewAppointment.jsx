import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import DoctorSidebar from "../../../../shared/layouts/sidebar/DoctorSidebar";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import Loader from "../../../../shared/Loader";
import axios from "axios";
import { toast } from "react-hot-toast";
import styles from "./DoctorNewAppointment.module.css";
import { isuueMasterData } from "../../../../utils/MasterData";

const DoctorNewAppointment = () => {
  //states
  const time = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  const initialState = {
    doctorId: userDetails.doctorId,
    petId: "",
    appointmentDate: "",
    appointmentTime: "",
    reasonToVisit: "",
    petIssue: "",
    patientName: "",
  };

  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(initialState);
  const [showTime, setShowTime] = useState(false);
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [owner, setOwner] = useState({});
  const [showOwner, setShowOwner] = useState(false);

  //configs
  const {
    doctorId,
    petId,
    appointmentDate,
    appointmentTime,
    reasonToVisit,
    petIssue,
    patientName,
  } = appointment;
  const navigate = useNavigate();

  // Actions
  const getPets = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/pets/owner/${owner.ownerId}/pets/all-profiles`
        )
        .then((data) => {
          setPets(data.data);
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

  const getOwner = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/owners/owner/username/${ownerName}/profile`
        )
        .then((data) => {
          setLoading(false);
          setOwner(data.data);
          setShowOwner(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(appointment);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/appointments/create/doctor/${appointment.doctorId}/owner/${owner.ownerId}/pet/${appointment.petId}/new`,
          appointment
        )
        .then((data) => {
          setLoading(false);
          toast.success("Successfully booked an appointment");
          navigate("/doctor/dashboard");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
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
      <DoctorSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div className={`${styles.header}`}>
            <div>
              <Link style={{ textDecoration: "none" }} to={"/doctor/dashboard"}>
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
                    Back to appointments
                  </p>
                </div>
              </Link>
              <div>
                <span style={{ fontSize: "1.3rem", fontWeight: 550 }}>
                  New Appointments
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className={`${styles.container}`}>
              <form
                className={`${styles.form_container}`}
                onSubmit={handleSubmit}
              >
                <div className={`${styles.date_and_time_container}`}>
                  <input
                    value={appointmentDate}
                    onChange={(e) => {
                      setAppointment({
                        ...appointment,
                        appointmentDate: e.target.value,
                      });
                    }}
                    style={{
                      fontSize: "0.6rem",
                      width: "5rem",
                      border: "none",
                      outline: "none",
                      padding: "0.22rem",
                      borderRadius: "0.2rem",
                    }}
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder="Today"
                    id="calender"
                  />
                  {showTime && (
                    <button
                      style={{
                        border: "none",
                        outline: "none",
                        fontSize: "0.6rem",
                        padding: "0.2rem",
                        backgroundColor: "#fd3f00",
                        color: "white",
                        marginLeft: "0.4rem",
                        borderRadius: "0.3rem",
                      }}
                    >
                      {appointment.appointmentTime}
                    </button>
                  )}
                  <div className={`${styles.time_container}`}>
                    {time.map((t) => {
                      return (
                        <div
                          key={t}
                          onClick={() => {
                            setAppointment({
                              ...appointment,
                              appointmentTime: t,
                            });
                            setShowTime(true);
                          }}
                          style={{
                            backgroundColor: "white",
                            marginRight: "1rem",
                            width: "2rem",
                            padding: "0.22rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "1rem",
                            borderRadius: "0.2rem",
                            cursor: "pointer",
                          }}
                        >
                          <span style={{ fontSize: "0.65rem" }}>{t}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <span
                    style={{
                      fontWeight: "550",
                      fontSize: "0.9rem",
                    }}
                  >
                    Patient Details
                  </span>
                  <div className={`${styles.input_field_container}`}>
                    <input
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      type="text"
                      className={`${styles.input_field}`}
                    />
                    <i
                      onClick={getOwner}
                      className="fa-solid fa-magnifying-glass"
                    ></i>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: "550",
                        position: "absolute",
                        top: "-1.3rem",
                      }}
                    >
                      Pet Parent
                    </span>
                  </div>
                  {showOwner && (
                    <>
                      <div
                        onClick={() => {
                          setAppointment({
                            ...appointment,
                            patientName: owner.ownerName,
                          });
                          setOwnerName(owner.ownerName);
                          setShowOwner(false);
                        }}
                        style={{
                          backgroundColor: "#fd3f00",
                          padding: "0.3rem",
                          fontSize: "0.6rem",
                          marginTop: "1rem",
                          borderRadius: "0.3rem",
                          cursor: "pointer",
                          width: "4rem",
                        }}
                      >
                        <span style={{ color: "white" }}>
                          {owner.ownerName}
                        </span>
                      </div>
                    </>
                  )}
                  <div className={`${styles.input_field_container}`}>
                    <input
                      value={petName}
                      onChange={() => {}}
                      type="text"
                      className={`${styles.input_field}`}
                    />
                    <i
                      onClick={getPets}
                      className="fa-solid fa-magnifying-glass"
                    ></i>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: "550",
                        position: "absolute",
                        top: "-1.3rem",
                      }}
                    >
                      Pet name
                    </span>
                  </div>
                  {pets.length !== 0 && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "canter",
                          flexWrap: "wrap",
                        }}
                      >
                        {pets.map((p) => {
                          return (
                            <div
                              key={p.petId}
                              onClick={() => {
                                setAppointment({
                                  ...appointment,
                                  petId: p.petId,
                                });
                                setPetName(p.petName);
                              }}
                              style={{
                                backgroundColor: "#fd3f00",
                                padding: "0.3rem",
                                fontSize: "0.6rem",
                                marginTop: "1rem",
                                borderRadius: "0.3rem",
                                cursor: "pointer",
                                marginRight: "0.3rem",
                              }}
                            >
                              <span style={{ color: "white" }}>
                                {p.petName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <span
                    style={{
                      fontWeight: "550",
                      fontSize: "0.9rem",
                    }}
                  >
                    Other Details
                  </span>
                  <div className={`${styles.input_field_container}`}>
                    <select
                      value={petIssue}
                      onChange={(e) =>
                        setAppointment({
                          ...appointment,
                          petIssue: e.target.value,
                        })
                      }
                      className={`${styles.input_field}`}
                      name="issues"
                    >
                      <option value=""></option>
                      {isuueMasterData.map((d) => {
                        return (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        );
                      })}
                    </select>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: "550",
                        position: "absolute",
                        top: "-1.3rem",
                      }}
                    >
                      Pet issues
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "3rem", position: "relative" }}>
                  <textarea
                    value={reasonToVisit}
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        reasonToVisit: e.target.value,
                      })
                    }
                    style={{
                      border: "none",
                      outline: "none",
                      borderRadius: "0.3rem",
                      padding: "1rem",
                      fontSize: "0.7rem",
                    }}
                    cols="60"
                    rows="3"
                  ></textarea>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: "550",
                      position: "absolute",
                      top: "-1.2rem",
                      left: "0",
                    }}
                  >
                    Reason to visit
                  </span>
                </div>
                <div>
                  <button className={`${styles.button}`}>Cancel</button>
                  <button
                    onClick={handleSubmit}
                    style={{ color: "white", backgroundColor: "#fd3f00" }}
                    className={`${styles.button}`}
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </GlobalLayout>
      </DoctorSidebar>
    </>
  );
};

export default DoctorNewAppointment;
