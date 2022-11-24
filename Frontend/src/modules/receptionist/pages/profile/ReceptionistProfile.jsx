import React, { useState, useEffect } from "react";
import ReceptionistSidebar from "../../../../shared/layouts/sidebar/ReceptionistSidebar";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import AccountDetails from "../../../patient/components/AccountDetails";
import styles from "./ReceptionistProfile.module.css";
import ReceptionistAccountDetails from "../../components/ReceptionistAccountDetails";

const ReceptionistProfile = () => {
  //states
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  // useEffect
  useEffect(() => {}, [userDetails]);

  return (
    <>
      <ReceptionistSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <ReceptionistAccountDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          >
            <div className={`${styles.account_details_lower}`}>
              <div className={`${styles.account_details_lower_right}`}>
                <img
                  style={{ borderRadius: "50%" }}
                  src={
                    userDetails.profilePicture
                      ? userDetails.profilePicture
                      : "https://cdn-icons-png.flaticon.com/512/0/93.png"
                  }
                  alt=""
                  width={60}
                  height={60}
                />
              </div>
              <div className={`${styles.account_details_lower_left}`}>
                <p style={{ marginTop: "0.5rem" }}>
                  Name :{" "}
                  <span
                    style={{
                      fontSize: "0.8rem",
                      marginLeft: "1rem",
                      fontWeight: "550",
                    }}
                  >
                    <span>{userDetails.prefix}</span>{" "}
                    {userDetails.receptionistName}
                  </span>
                </p>
                <p style={{ marginTop: "0.5rem" }}>
                  Mobile :{" "}
                  <span
                    style={{
                      fontSize: "0.8rem",
                      marginLeft: "0.8rem",
                      fontWeight: "550",
                    }}
                  >
                    {userDetails.phone}
                  </span>
                </p>
                <p style={{ marginTop: "0.5rem" }}>
                  Location :{" "}
                  <span
                    style={{
                      fontSize: "0.8rem",
                      marginLeft: "0.3rem",
                      fontWeight: "550",
                    }}
                  >
                    {userDetails.address}
                  </span>
                </p>
              </div>
            </div>
          </ReceptionistAccountDetails>
        </GlobalLayout>
      </ReceptionistSidebar>
    </>
  );
};

export default ReceptionistProfile;
