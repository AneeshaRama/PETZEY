import React, { useState } from "react";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import PatientSidebar from "../../../../shared/layouts/sidebar/PatientSidebar";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import PetProfile from "../../../pets/pages/PetProfile";
import { Link, useParams } from "react-router-dom";

const PatientPetProfile = () => {
  // states
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  //configs
  const { id } = useParams();
  return (
    <>
      <PatientSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div style={{ padding: "1rem" }}>
            <Link style={{ textDecoration: "none" }} to={"/patient/profile"}>
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
            <PetProfile role={"patient"} id={id} route={"/patient/profile"} />
          </div>
        </GlobalLayout>
      </PatientSidebar>
    </>
  );
};

export default PatientPetProfile;
