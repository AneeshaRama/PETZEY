import React, { useState, useEffect } from "react";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import DoctorSidebar from "../../../../shared/layouts/sidebar/DoctorSidebar";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import PetProfile from "../../../pets/pages/PetProfile";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../../shared/Loader";
import axios from "axios";

const DoctorPetProfile = () => {
  // states
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  // configs
  const { id } = useParams();

  return (
    <>
      <DoctorSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div style={{ padding: "1rem" }}>
            <Link
              style={{ textDecoration: "none" }}
              to={"/doctor/pages/all-pets"}
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
                  Back to pet profiles
                </p>
              </div>
            </Link>
            <PetProfile
              role={"doctor"}
              id={id}
              route={"/doctor/new/appointment"}
            />
          </div>
        </GlobalLayout>
      </DoctorSidebar>
    </>
  );
};

export default DoctorPetProfile;
