import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import PatientSidebar from "../../../../shared/layouts/sidebar/PatientSidebar";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import Loader from "../../../../shared/Loader";
import styles from "./AddAppointment.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { isuueMasterData } from "../../../../utils/MasterData";

const AddAppointment = () => {
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
    doctorId: "",
    petId: "",
    appointmentDate: "",
    appointmentTime: "",
    reasonToVisit: "",
    petIssue: "",
    patientName: userDetails.ownerName,
  };

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorsByName, setDoctorsByName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(initialState);
  const [showTime, setShowTime] = useState(false);
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState("");

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
  const searchDoctorByName = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/doctors/doctor/${doctorName}/profiles`
        )
        .then((data) => {
          setDoctorsByName(data.data);
          setLoading(false);
          setVisible(true);
          setSearch(true);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getPets = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/pets/owner/${userDetails.ownerId}/pets/all-profiles`
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/appointments/create/doctor/${appointment.doctorId}/owner/${userDetails.ownerId}/pet/${appointment.petId}/new`,
          appointment
        )
        .then((data) => {
          setLoading(false);
          toast.success("Successfully booked an appointment");
          navigate("/patient/dashboard");
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
      <PatientSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div className={`${styles.header}`}>
            <div>
              <Link
                style={{ textDecoration: "none" }}
                to={"/patient/dashboard"}
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
                <span style={{ fontWeight: "550", fontSize: "0.9rem" }}>
                  Veterinarian Details
                </span>
                <div className={`${styles.input_field_container}`}>
                  <input
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    type="text"
                    className={`${styles.input_field}`}
                  />
                  <i
                    onClick={searchDoctorByName}
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
                    Veterinarian
                  </span>
                </div>

                {search && (
                  <>
                    {doctorsByName.map((d) => {
                      return (
                        <div
                          onClick={() => {
                            setAppointment({
                              ...appointment,
                              doctorId: d.doctorId,
                            });
                            setSearch(false);
                          }}
                          style={{
                            backgroundColor: "white",
                            width: "10rem",
                            minHeight: "1.5rem",
                            borderRadius: "0.2rem",
                            cursor: "pointer",
                          }}
                          key={d.doctorId}
                        >
                          <span
                            style={{
                              fontWeight: "550",
                              fontSize: "0.6rem",
                              padding: "0.2rem",
                            }}
                          >
                            {d.doctorName}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}
                {visible && (
                  <>
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
                  </>
                )}
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
      </PatientSidebar>
    </>
  );
};

export default AddAppointment;
