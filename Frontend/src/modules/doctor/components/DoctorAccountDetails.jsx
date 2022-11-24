import React, { useState } from "react";
import EditDoctorModal from "../../../shared/modals/doctor/EditDoctorModal";
import styles from "./css/DoctorAccountDetails.module.css";

const DoctorAccountDetails = ({ children, userDetails, setUserDetails }) => {
  //states
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className={`${styles.account_details_container}`}>
        <div className={`${styles.account_details_upper}`}>
          <div className={`${styles.account_details_upper_right}`}>
            <p style={{ fontSize: "0.8rem", fontWeight: "550" }}>
              Account details
            </p>
            <p
              style={{
                marginTop: "0.2rem",
                marginBottom: "0.7rem",
                fontSize: "0.6rem",
                color: "gray",
              }}
            >
              Manage your account details here
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className={`${styles.edit_button}`}
          >
            Edit
          </button>
        </div>
        {children}
      </div>
      {openModal && <EditDoctorModal userDetails={userDetails} setUserDetails={setUserDetails} setOpenModal={setOpenModal} />}
    </>
  );
};

export default DoctorAccountDetails;
