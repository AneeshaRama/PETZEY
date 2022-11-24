import React, { useState, useEffect } from "react";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import DoctorSidebar from "../../../../shared/layouts/sidebar/DoctorSidebar";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import DoctorAccountDetails from "../../components/DoctorAccountDetails";
import styles from "./DoctorProfile.module.css";

const DoctorProfile = () => {
  //states
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  //useEffect
  useEffect(() => {}, [userDetails]);

  return (
    <>
      <DoctorSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <DoctorAccountDetails userDetails={userDetails} setUserDetails={setUserDetails}>
            <div className={`${styles.bottom_header}`}>
              <img
                style={{
                  borderRadius: "50%",
                }}
                width={80}
                height={80}
                src={
                  userDetails.profilePicture
                    ? userDetails.profilePicture
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
                    >{`  Dr.${userDetails.doctorName}`}</span>
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
                    >{`${userDetails.npiNumber}`}</span>
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
                    >{`${userDetails.speciality}`}</span>
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
                    >{`${userDetails.phoneNumber}`}</span>
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
                    >{`${userDetails.email}`}</span>
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
                    >{`${userDetails.address}`}</span>
                  </p>
                </div>
              </div>
            </div>
          </DoctorAccountDetails>
        </GlobalLayout>
      </DoctorSidebar>
    </>
  );
};

export default DoctorProfile;
