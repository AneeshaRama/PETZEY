import React, { useState, useEffect } from "react";
import Loader from "../../../shared/Loader";
import styles from "./PetProfile.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MedicineDetails from "../../appointments/components/MedicineDetails";
import AppointmentHistoryCard from "../../appointments/components/AppointmentHistoryCard";

const PetProfile = ({ id, route, role }) => {
  // States
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState({});
  const [owner, setOwner] = useState({});
  const [appointmentReport, setAppointmentReport] = useState(false);
  const [showAppointmentHistory, setShowAppointmentHistory] = useState(false);
  const [appointmentHistories, setAppointmentHistories] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  // useEffect
  useEffect(() => {
    getPetById();
  }, []);

  //Actions
  const getPetById = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/pets/pet/${id}/details`
        )
        .then((data) => {
          setPet(data.data);
          checkForAppointmentHistory(data.data.petId);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/owners/owner/pet/${id}`
        )
        .then((data) => {
          setOwner(data.data);
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

  const checkForAppointmentHistory = async (id) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/appointment-histories/exist/pet/${id}`
        )
        .then((data) => {
          if (data.data === true) {
            setShowAppointmentHistory(true);
            getAppointmentHistories(id);
          }
          if (data.data === false) {
            setShowAppointmentHistory(false);
            setLoading(false);
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
          `${process.env.REACT_APP_API}/appointment-service/appointment-histories/pet/${id}/appointment-history`
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

  // Loder
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className={`${styles.container}`}>
        <Link to={route}>
          <button
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              border: "none",
              outline: "none",
              fontSize: "0.6rem",
              padding: "0.3rem",
              borderRadius: "0.3rem",
              color: "white",
              fontWeight: "550",
              backgroundColor: "#fd3f00",
              cursor: "pointer",
            }}
          >
            Book Appointment
          </button>
        </Link>
        <div className={`${styles.left_container}`}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "18.5rem",
            }}
          >
            <img
              style={{ borderRadius: "50%" }}
              src={pet.profilePic}
              alt=""
              width={50}
              height={50}
            />
            <div style={{ marginLeft: "0.4rem" }}>
              <p style={{ fontSize: "0.6rem" }}>Patient</p>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "550",
                  marginTop: "0.2rem",
                }}
              >
                {pet.petName}
              </p>
              <p style={{ fontSize: "0.6rem" }}>{pet.species}</p>
            </div>
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "0.6rem" }}>
                Gender{" "}
                <span style={{ marginLeft: "2.1rem", marginRight: "0.5rem" }}>
                  :
                </span>{" "}
                <span style={{ fontWeight: "550" }}>{pet.gender}</span>
              </p>
              <p style={{ fontSize: "0.6rem", marginTop: "0.3rem" }}>
                Age{" "}
                <span
                  style={{
                    marginLeft: "3rem",
                    marginRight: "0.5rem",
                  }}
                >
                  :
                </span>{" "}
                <span style={{ fontWeight: "550" }}>{pet.age} Years</span>
              </p>
              <p style={{ fontSize: "0.6rem", marginTop: "0.3rem" }}>
                Blood Group{" "}
                <span style={{ marginLeft: "0.7rem", marginRight: "0.5rem" }}>
                  :
                </span>{" "}
                <span style={{ fontWeight: "550" }}>{pet.bloodGroup}</span>
              </p>
              <p style={{ fontSize: "0.6rem", marginTop: "0.3rem" }}>
                Date of Birth{" "}
                <span style={{ marginLeft: "0.7rem", marginRight: "0.5rem" }}>
                  :
                </span>{" "}
                <span style={{ fontWeight: "550" }}>{pet.dateOfBirth}</span>
              </p>
            </div>
            <div style={{ height: "4.5rem", paddingRight: "8rem" }}>
              <p style={{ fontSize: "0.6rem", marginTop: "0.3rem" }}>
                Allergy{" "}
                <span style={{ marginLeft: "0.7rem", marginRight: "0.5rem" }}>
                  :
                </span>{" "}
                <span style={{ fontWeight: "550" }}>{pet.allergy}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={`${styles.right_container}`}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "18.5rem",
            }}
          >
            <img
              style={{ borderRadius: "50%" }}
              src={owner.profilePicture}
              alt=""
              width={50}
              height={50}
            />
            <div style={{ marginLeft: "0.6rem", display: "flex" }}>
              <div>
                {" "}
                <p style={{ fontSize: "0.6rem", width: "15rem" }}>Pet owner</p>
                <p style={{ fontSize: "0.7rem", fontWeight: "550" }}>
                  {owner.ownerName}
                </p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "1.7rem" }}>
            <p style={{ fontSize: "0.6rem" }}>
              <i className="fa-solid fa-envelope"></i>
              <span style={{ fontWeight: "550", marginLeft: "0.8rem" }}>
                {owner.email}
              </span>
            </p>
            <p style={{ fontSize: "0.6rem", marginTop: "0.4rem" }}>
              <i className="fa-solid fa-phone"></i>
              <span style={{ fontWeight: "550", marginLeft: "0.8rem" }}>
                {owner.phone}
              </span>
            </p>
            <p style={{ fontSize: "0.6rem", marginTop: "0.4rem" }}>
              <i className="fa-solid fa-home"></i>
              <span style={{ fontWeight: "550", marginLeft: "0.8rem" }}>
                {owner.address}
              </span>
            </p>
          </div>
        </div>
        {appointmentReport && (
          <>
            <div style={{ padding: "1rem", paddingRight: "2rem" }}>
              <div className={`${styles.appointment_report_header}`}>
                <span style={{ fontSize: "1.2rem", fontWeight: "550" }}>
                  Appointment report
                </span>
                {user.role === "DOCTOR" && (
                  <div>
                    <button
                      style={{
                        fontSize: "0.6rem",
                        marginRight: "0.4rem",
                        padding: "0.3rem 0.4rem",
                        borderRadius: "0.3rem",
                        outline: "none",
                        border: "none",
                        backgroundColor: "white",
                        fontWeight: "550",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        style={{ marginRight: "0.3rem" }}
                        className="fa-solid fa-circle-down"
                      ></i>
                      Report
                    </button>
                    <button
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: "550",
                        marginLeft: "0.4rem",
                        padding: "0.3rem 0.4rem",
                        borderRadius: "0.3rem",
                        outline: "none",
                        border: "none",
                        backgroundColor: "#fd3f00",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Edit Report
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={`${styles.appointment_report_container}`}>
              <div className={`${styles.right_appointment_report_container}`}>
                <div className={`${styles.prescription_container}`}>
                  <p style={{ fontSize: "1rem", fontWeight: "550" }}>
                    Prescription
                  </p>

                  {report.prescription.medicines.map((m) => {
                    return (
                      <MedicineDetails
                        key={m.medicineId}
                        name={m.medicineName}
                        days={m.days}
                        description={m.description}
                        duration={m.duration}
                      />
                    );
                  })}
                </div>
                <div className={`${styles.clinic_container}`}>
                  <p style={{ fontSize: "1rem", fontWeight: "550" }}>
                    Recommended Clinic
                  </p>
                  <p style={{ marginTop: "1.5rem", fontSize: "0.7rem" }}>
                    <i className="fa-solid fa-location-dot"></i>
                    <span style={{ marginLeft: "0.4rem", color: "gray" }}>
                      London
                    </span>
                  </p>
                </div>
              </div>
              <div className={`${styles.left_appointment_report_container}`}>
                <div className={`${styles.vital_container}`}>
                  <p style={{ fontSize: "1rem", fontWeight: "550" }}>Vital</p>
                  <div className={`${styles.bottom_vital_container}`}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <i
                          style={{ color: "red" }}
                          className="fa-solid fa-heart"
                        ></i>
                      </div>
                      <div style={{ marginTop: "0.5rem" }}>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            marginRight: "0.2rem",
                            fontWeight: "550",
                          }}
                        >
                          {report.vital.heartBpm}
                        </span>
                        <span
                          style={{ fontSize: "0.8rem", marginLeft: "0.2rem" }}
                        >
                          BPM
                        </span>
                      </div>
                    </div>
                    <div style={{ marginLeft: "2.5rem" }}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <i className="fa-solid fa-thermometer"></i>
                      </div>
                      <div style={{ marginTop: "0.5rem" }}>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            marginRight: "0.2rem",
                            fontWeight: "550",
                          }}
                        >
                          {report.vital.temperature}
                        </span>
                        <span
                          style={{
                            fontSize: "0.9rem",
                            marginLeft: "0.2rem",
                            fontWeight: "550",
                          }}
                        >
                          &#8451;
                        </span>
                      </div>
                    </div>
                    <div style={{ marginLeft: "2.5rem" }}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <i className="fa-solid fa-lungs"></i>
                      </div>
                      <div style={{ marginTop: "0.5rem" }}>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            marginRight: "0.2rem",
                            fontWeight: "550",
                          }}
                        >
                          {report.vital.lungsBpm}
                        </span>
                        <span
                          style={{ fontSize: "0.8rem", marginLeft: "0.2rem" }}
                        >
                          BPM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.symptoms_container}`}>
                  <p style={{ fontSize: "1rem", fontWeight: "550" }}>
                    Symptoms
                  </p>
                  <div style={{ display: "flex", marginTop: "0.9rem" }}>
                    {symptoms.map((s) => {
                      return <Tag key={s.symptomId} title={s.description} />;
                    })}
                  </div>
                </div>
                <div className={`${styles.test_container}`}>
                  <p style={{ fontSize: "1rem", fontWeight: "550" }}>Tests</p>
                  <div style={{ display: "flex", marginTop: "0.9rem" }}>
                    {report.tests.map((t) => {
                      return <Tag key={t.testId} title={t.testName} />;
                    })}
                  </div>
                </div>
                <div className={`${styles.doctor_recommend_container}`}>
                  <p style={{ fontSize: "1rem", fontWeight: "550" }}>
                    Recommended Doctors
                  </p>
                  <div style={{ display: "flex", marginTop: "0.9rem" }}>
                    {doctorRecommendation.map((d) => {
                      return <Tag key={d.doctorId} title={d.doctorName} />;
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.comment_container}`}>
              <p style={{ fontSize: "1rem", fontWeight: "550" }}>Comments</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "2rem",
                }}
              >
                <img
                  style={{ borderRadius: "50%" }}
                  src={doctor.profilePicture}
                  alt=""
                  width={50}
                  height={50}
                />
                <div style={{ marginLeft: "1.5rem" }}>
                  <p style={{ fontSize: "0.6rem", fontWeight: "550" }}>
                    Dr. {doctor.doctorName}
                  </p>

                  <p style={{ fontSize: "0.55rem", marginTop: "0.4rem" }}>
                    {report.comment.description}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
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
                <AppointmentHistoryCard
                  key={h.appointmentHistoryId}
                  appointmentId={h.appointmentId}
                  petName={h.petName}
                  doctorId={h.doctorId}
                  appointmentDate={h.appointmentDate}
                  appointmentTime={h.appointmentTime}
                  ownerName={h.ownerName}
                  route={`/${role}/pages/appointment/details/${h.appointmentId}`}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default PetProfile;
