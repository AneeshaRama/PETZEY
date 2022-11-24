import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../../shared/Loader";
import Tag from "../../../../shared/tag/Tag";
import AddSymptoms from "../../components/AddSymptoms";
import MedicineDetails from "../../components/MedicineDetails";
import styles from "./AppointmentDetails.module.css";
import AddTests from "../../components/AddTests";
import AddVitals from "../../components/AddVitals";
import AddPrescription from "../../components/AddPrescription";
import AddMedicine from "../../components/AddMedicine";
import AddComment from "../../components/AddComment";
import toast from "react-hot-toast";

const AppointmentDetails = ({ route }) => {
  //states
  const [appointment, setAppointment] = useState({});
  const [pet, setPet] = useState({});
  const [petOwner, setPetOwner] = useState({});
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const [appointmentReport, setAppointmentReport] = useState(false);
  const [openSymptomModal, setSymptomModal] = useState(false);
  const [openPrescriptionModal, setPrescriptionModal] = useState(false);
  const [openVitalModal, setVitalModal] = useState(false);
  const [openTestModal, setTestModal] = useState(false);
  const [openMedicineModal, setMedicineModal] = useState(false);
  const [prescription, setPrescription] = useState({});
  const [showMedicine, setShowMedicine] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [report, setReport] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [doctorRecommendation, setDoctorRecommendation] = useState([]);
  const [showTests, setShowTests] = useState(false);
  const [showVital, setShowVital] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  //configs
  const { id } = useParams();

  //useEffect
  useEffect(() => {
    getAppointmentDetails();
    getPrescription();
  }, []);

  useEffect(() => {}, [showMedicine]);

  //Actions
  const getAppointmentDetails = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/appointments/appointment/${id}/details`
        )
        .then((data) => {
          setAppointment(data.data);
          if (data.data.tests.length === 0) {
            setShowTests(false);
          } else {
            setShowTests(true);
          }
          if (data.data.vital === null) {
            setShowVital(false);
          } else {
            setShowVital(true);
          }
          if (data.data.prescription === null) {
            setShowPrescription(false);
          } else {
            setShowPrescription(true);
          }
          if (
            data.data.prescription === null ||
            data.data.prescription.medicines === null
          ) {
            setShowMedicine(false);
          } else {
            setShowMedicine(true);
          }
          if (data.data.comment === null) {
            setShowComment(false);
          } else {
            setShowComment(true);
          }
          if (
            data.data.tests.length === 0 &&
            data.data.vital === null &&
            data.data.prescription === null &&
            (data.data.prescription === null ||
              data.data.prescription.medicines === null) &&
            data.data.comment === null
          ) {
            setShowGenerateButton(false);
          } else {
            setShowGenerateButton(true);
          }
          window.localStorage.setItem("petId", data.data.petId);
          window.localStorage.setItem("docId", data.data.doctorId);
        });
      await axios
        .get(
          `${
            process.env.REACT_APP_API
          }/setting-service/pets/pet/${window.localStorage.getItem(
            "petId"
          )}/profile`
        )
        .then((data) => {
          setPet(data.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
      await axios
        .get(
          `${
            process.env.REACT_APP_API
          }/setting-service/owners/owner/pet/${window.localStorage.getItem(
            "petId"
          )}`
        )
        .then((data) => {
          setPetOwner(data.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
      await axios
        .get(
          `${
            process.env.REACT_APP_API
          }/setting-service/doctors/doctor/${window.localStorage.getItem(
            "docId"
          )}/profile`
        )
        .then((data) => {
          setDoctor(data.data);
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

  const getAppointmentReport = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/appointments/appointment/${id}/report`
        )
        .then((data) => {
          setReport(data.data);
          setAppointmentReport(true);
          getSymptoms();
          getDoctorRecommendation();
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

  const getDoctorRecommendation = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/pet-service/doctors/doctor/recommendation/${id}`
        )
        .then((data) => {
          setDoctorRecommendation(data.data);
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

  const getSymptoms = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/symptoms/pet/${pet.petId}/all-symptoms`
        )
        .then((data) => {
          setSymptoms(data.data);
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

  const getPrescription = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/appointment-service/prescriptions/appointment/${id}/prescription`
        )
        .then((data) => {
          console.log(data);
          setPrescription(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setPrescription(null);

          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const cancelAppointment = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API}/appointment-service/appointments/appointment/${id}/status/cancel`,
          {}
        )
        .then((data) => {
          toast.success("Successfully cancelled the Appointment");
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

  const closeAppointment = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API}/appointment-service/appointments/appointment/${id}/status/close`,
          {}
        )
        .then((data) => {
          createAppointmentHistory();
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

  const createAppointmentHistory = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/appointment-histories/create/appointment/${id}/new`,
          {}
        )
        .then((data) => {
          toast.success("Successfully closed the Appointment");
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

  //Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ paddingBottom: "2rem" }}>
        <div className={`${styles.container}`}>
          <Link style={{ textDecoration: "none" }} to={route}>
            <div>
              <i
                style={{ fontSize: "0.7rem", marginRight: "0.4rem" }}
                className="fa-solid fa-arrow-left-long"
              ></i>
              <span style={{ fontSize: "0.7rem", fontWeight: "550" }}>
                Back to appointments
              </span>
            </div>
          </Link>
          <div className={`${styles.header_container}`}>
            <div className={`${styles.header_left}`}>
              <p style={{ fontWeight: "550" }}>
                #ID - {appointment.appointmentId}
              </p>
              <div
                style={{
                  display: "flex",
                  fontSize: "0.7rem",
                  marginTop: "0.5rem",
                }}
              >
                <div>
                  <i className="fa-solid fa-calendar"></i>
                  <span style={{ marginLeft: "0.3rem" }}>
                    {appointment.appointmentDate}
                  </span>
                </div>
                <div style={{ marginLeft: "1rem" }}>
                  <i className="fa-regular fa-clock"></i>
                  <span style={{ marginLeft: "0.2rem" }}>
                    {appointment.appointmentTime}
                  </span>
                </div>
              </div>
              <div
                style={{
                  marginTop: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "0.7rem",
                    marginRight: "0.3rem",
                    fontWeight: "550",
                  }}
                >
                  Pet issues :{" "}
                </p>
                <Tag title={appointment.petIssue} />
              </div>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "550",
                  marginTop: "0.6rem",
                }}
              >
                Reason for visit :{" "}
                <span style={{ fontWeight: "500" }}>
                  {appointment.reasonToVisit}
                </span>
              </p>
            </div>
            <div className={`${styles.header_right}`}>
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
                  marginRight: "1rem",
                }}
                className="fa-solid fa-video"
              ></i>
              {user.role !== "PATIENT" && (
                <>
                  <button
                    onClick={cancelAppointment}
                    className={`${styles.button}`}
                  >
                    cancel
                  </button>
                  <button
                    onClick={closeAppointment}
                    style={{ backgroundColor: "#fd3f00", color: "white" }}
                    className={`${styles.button}`}
                  >
                    Close Appointment
                  </button>
                </>
              )}
              {user.role === "PATIENT" && (
                <button
                  onClick={cancelAppointment}
                  style={{ backgroundColor: "#fd3f00", color: "white" }}
                  className={`${styles.button}`}
                >
                  Cancel Appointment
                </button>
              )}
              {showGenerateButton && (
                <button
                  onClick={getAppointmentReport}
                  style={{ backgroundColor: "#fd3f00", color: "white" }}
                  className={`${styles.button}`}
                >
                  {user.role === "DOCTOR" ? "Generate Report" : "View Report"}
                </button>
              )}
            </div>
          </div>
          <div className={`${styles.profile_container}`}>
            <div className={`${styles.left_profile_container}`}>
              <div className={`${styles.dog_profile}`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={
                      pet.profilePic
                        ? pet.profilePic
                        : "https://img.freepik.com/premium-photo/french-bulldog-astronaut-dog-with-with-pilot-glasses-portrait_691560-1543.jpg?size=338&ext=jpg"
                    }
                    alt=""
                    width={50}
                    height={50}
                  />
                  <div style={{ marginLeft: "1.5rem" }}>
                    <p style={{ fontSize: "0.55rem" }}>Patient</p>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: "550",
                        marginTop: "0.3rem",
                      }}
                    >
                      {pet.petName}
                    </p>
                    <p style={{ fontSize: "0.55rem" }}>{pet.species}</p>
                  </div>
                </div>
                <div style={{ marginTop: "0.8rem" }}>
                  <p style={{ fontSize: "0.6rem" }}>
                    Gender :{" "}
                    <span style={{ fontWeight: "550" }}>{pet.gender}</span>
                  </p>
                  <p style={{ fontSize: "0.6rem", marginTop: "0.4rem" }}>
                    Age :{" "}
                    <span style={{ fontWeight: "550" }}>{pet.age} Years</span>
                  </p>
                </div>
              </div>
              <div className={`${styles.owner_profile}`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={petOwner.profilePicture}
                    alt=""
                    width={50}
                    height={50}
                  />
                  <div style={{ marginLeft: "1.5rem" }}>
                    <p style={{ fontSize: "0.55rem" }}>Pet owner</p>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: "550",
                        marginTop: "0.3rem",
                      }}
                    >
                      {petOwner.ownerName}
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <p style={{ fontSize: "0.6rem" }}>
                    <i className="fa-solid fa-envelope"></i>{" "}
                    <span style={{ fontWeight: "550", marginLeft: "0.4rem" }}>
                      {petOwner.email}
                    </span>
                  </p>
                  <p style={{ fontSize: "0.6rem", marginTop: "0.5rem" }}>
                    <i className="fa-solid fa-phone"></i>{" "}
                    <span
                      style={{
                        fontWeight: "550",
                        marginLeft: "0.4rem",
                      }}
                    >
                      {petOwner.phone}
                    </span>
                  </p>
                  <p style={{ fontSize: "0.6rem", marginTop: "0.3rem" }}>
                    <i className="fa-solid fa-house"></i>{" "}
                    <span
                      style={{
                        fontWeight: "550",
                        marginLeft: "0.4rem",
                      }}
                    >
                      {petOwner.address}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles.right_profile_container}`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{ borderRadius: "50%" }}
                  src={doctor.profilePicture}
                  alt=""
                  width={50}
                  height={50}
                />
                <div style={{ marginLeft: "1.5rem" }}>
                  <p style={{ fontSize: "0.55rem" }}>Doctor</p>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "550",
                      marginTop: "0.3rem",
                    }}
                  >
                    {doctor.doctorName}
                  </p>
                  <p style={{ fontSize: "0.55rem" }}>{doctor.speciality}</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ marginTop: "1rem" }}>
                  <p style={{ fontSize: "0.6rem" }}>
                    NPI :
                    <span style={{ fontWeight: "550", marginLeft: "0.4rem" }}>
                      {doctor.npiNumber}
                    </span>
                  </p>
                  <p style={{ fontSize: "0.6rem", marginTop: "0.5rem" }}>
                    Clinic :
                    <span
                      style={{
                        fontWeight: "550",
                        marginLeft: "0.4rem",
                      }}
                    >
                      {doctor.address}
                    </span>
                  </p>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <p style={{ fontSize: "0.6rem" }}>
                    <i className="fa-solid fa-envelope"></i>{" "}
                    <span style={{ fontWeight: "550", marginLeft: "0.4rem" }}>
                      {doctor.email}
                    </span>
                  </p>
                  <p style={{ fontSize: "0.6rem", marginTop: "0.5rem" }}>
                    <i className="fa-solid fa-phone"></i>{" "}
                    <span
                      style={{
                        fontWeight: "550",
                        marginLeft: "0.4rem",
                      }}
                    >
                      {doctor.phoneNumber}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {user.role === "DOCTOR" && (
          <>
            <div
              style={{
                padding: "0 1rem",
              }}
            >
              <div>
                <button
                  onClick={() => setSymptomModal(true)}
                  style={{
                    backgroundColor: "#fd3f00",
                    color: "white",
                    marginRight: "0.6rem",
                  }}
                  className={`${styles.button}`}
                >
                  Add Symptoms
                </button>
                {showTests && (
                  <button
                    onClick={() => setTestModal(true)}
                    style={{
                      backgroundColor: "#fd3f00",
                      color: "white",
                      marginRight: "0.6rem",
                    }}
                    className={`${styles.button}`}
                  >
                    Add Tests
                  </button>
                )}
                {showVital && (
                  <button
                    onClick={() => setVitalModal(true)}
                    style={{
                      backgroundColor: "#fd3f00",
                      color: "white",
                      marginRight: "0.6rem",
                    }}
                    className={`${styles.button}`}
                  >
                    Add Vital
                  </button>
                )}
                {showPrescription && (
                  <button
                    onClick={() => setPrescriptionModal(true)}
                    style={{
                      backgroundColor: "#fd3f00",
                      color: "white",
                      marginRight: "0.6rem",
                    }}
                    className={`${styles.button}`}
                  >
                    Add Prescription Date
                  </button>
                )}

                {showMedicine && (
                  <button
                    onClick={() => setMedicineModal(true)}
                    style={{
                      backgroundColor: "#fd3f00",
                      color: "white",
                      marginRight: "0.6rem",
                    }}
                    className={`${styles.button}`}
                  >
                    Add Medicines
                  </button>
                )}
                {showComment && (
                  <button
                    onClick={() => setOpenCommentModal(true)}
                    style={{
                      backgroundColor: "#fd3f00",
                      color: "white",
                      marginRight: "0.6rem",
                    }}
                    className={`${styles.button}`}
                  >
                    Add Comment
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        {appointmentReport && (
          <>
            <div style={{ padding: "1rem", paddingRight: "2rem" }}>
              <div className={`${styles.appointment_report_header}`}>
                <span style={{ fontSize: "1.2rem", fontWeight: "550" }}>
                  Appointment report
                </span>
                {/* {user.role === "DOCTOR" && (
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
                )} */}
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
      {openSymptomModal && (
        <AddSymptoms
          id={pet.petId}
          setShowTests={setShowTests}
          setSymptomModal={setSymptomModal}
        />
      )}
      {openTestModal && (
        <AddTests
          setShowVital={setShowVital}
          id={id}
          setTestModal={setTestModal}
        />
      )}
      {openVitalModal && (
        <AddVitals
          setShowPrescription={setShowPrescription}
          id={id}
          setVitalModal={setVitalModal}
        />
      )}
      {openPrescriptionModal && (
        <AddPrescription
          id={id}
          setShowMedicine={setShowMedicine}
          setPrescription={setPrescription}
          setPrescriptionModal={setPrescriptionModal}
        />
      )}
      {openMedicineModal && (
        <AddMedicine
          id={prescription.prescriptionId}
          setMedicineModal={setMedicineModal}
          setShowComment={setShowComment}
        />
      )}
      {openCommentModal && (
        <AddComment
          id={id}
          setShowGenerateButton={setShowGenerateButton}
          setOpenCommentModal={setOpenCommentModal}
        />
      )}
    </>
  );
};

export default AppointmentDetails;
