import React, { useState, useEffect } from "react";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import ReceptionistSidebar from "../../../../shared/layouts/sidebar/ReceptionistSidebar";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import axios from "axios";
import styles from "./AllDoctors.module.css";
import DoctorCard from "../../../patient/components/DoctorCard";
import Loader from "../../../../shared/Loader";
import { Link } from "react-router-dom";

const AllDoctors = () => {
  //States
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [doctorsByName, setDoctorsByName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  //useEffect
  useEffect(() => {
    getAllDoctors();
  }, []);

  useEffect(() => {}, []);

  //Actions
  const getAllDoctors = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/doctors/all-profiles`
        )
        .then((data) => {
          setLoading(false);
          setDoctors(data.data);
          console.log(data);
        });
    } catch (error) {
      console.log("Failed to fectch doctors");
    }
  };

  const getDoctorsByName = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/doctors/doctor/${doctorName}/profiles`
        )
        .then((data) => {
          setDoctorsByName(data.data);
          setLoading(false);
          setDoctors(data.data);
          setSearch(true);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  //Loader
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
              All Vets
            </span>
            <div className={`${styles.right_header}`}>
              {/* <button
                style={{
                  border: "none",
                  padding: "0.46rem",
                  backgroundColor: "white",
                  borderRadius: "0.3rem",
                  cursor: "pointer",
                  marginRight: "0.5rem",
                  fontSize: "0.7rem",
                }}
              >
                <i
                  style={{ marginRight: "0.3rem" }}
                  className="fa-solid fa-filter"
                ></i>{" "}
                Filters
              </button> */}
              <div className={`${styles.searchbox}`}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    marginLeft: "0.5rem",
                    fontSize: "0.7rem",
                    width: "12rem",
                  }}
                  type="text"
                  placeholder="Search vets"
                  autoComplete="off"
                />
                <button
                  onClick={getDoctorsByName}
                  style={{
                    outline: "none",
                    border: "none",
                    color: "white",
                    backgroundColor: "#fd3f00",
                    borderRadius: "0.3rem",
                    padding: "0.3rem",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                  }}
                >
                  search
                </button>
                {/* {search &&
                  doctorsByName.map((d) => {
                    return (
                      <div className={`${styles.search_doctor_by_name}`}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "start",
                            fontSize: "0.7rem",
                            padding: "0.4rem 0.7rem",
                            borderBottom: "0.1px solid gray",
                            height: "2rem",
                          }}
                        >
                          <Link
                            to={`/patient/doctor/profile/${d.doctorId}`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span style={{ cursor: "pointer" }}>
                              {d.doctorName}
                            </span>
                          </Link>
                        </div>
                      </div>
                    );
                  })} */}
              </div>
            </div>
          </div>
          <div className={`${styles.doctor_component_container}`}>
            {doctors.length === 0 && (
              <span style={{ fontSize: "0.7rem", marginTop: "2rem" }}>
                No doctors found
              </span>
            )}
            {doctors.map((d) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  key={d.doctorId}
                  to={`/receptionist/pages/doctor/profile/${d.doctorId}`}
                >
                  <DoctorCard
                    name={d.doctorName}
                    speciality={d.speciality}
                    phone={d.phoneNumber}
                    profilePicture={d.profilePicture}
                  />
                </Link>
              );
            })}
          </div>
        </GlobalLayout>
      </ReceptionistSidebar>
    </>
  );
};

export default AllDoctors;
