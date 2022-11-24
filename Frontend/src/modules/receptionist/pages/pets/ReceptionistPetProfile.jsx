import React, { useState } from "react";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import ReceptionistSidebar from "../../../../shared/layouts/sidebar/ReceptionistSidebar";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import PetProfile from "../../../pets/pages/PetProfile";
import { Link, useParams } from "react-router-dom";

const ReceptionistPetProfile = () => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  //configs
  const { id } = useParams();
  return (
    <>
      <ReceptionistSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div style={{ padding: "1rem" }}>
            <Link
              style={{ textDecoration: "none" }}
              to={"/receptionist/pages/all-pets"}
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
              role={"receptionist"}
              id={id}
              route={"/receptionist/new/appointment"}
            />
          </div>
        </GlobalLayout>
      </ReceptionistSidebar>
    </>
  );
};

export default ReceptionistPetProfile;
