import React, { useEffect, useState } from "react";
import styles from "./PatientProfile.module.css";
import AccountDetails from "../../components/AccountDetails";
import PetAccountDetails from "../../components/PetAccountDetails";
import PetProfileCard from "../../../pets/components/petCards/PetProfileCard";
import PatientSidebar from "../../../../shared/layouts/sidebar/PatientSidebar";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import axios from "axios";
import Loader from "../../../../shared/Loader";
import { Link } from "react-router-dom";

const PatientProfile = () => {
  //states
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);

  //useEffect
  useEffect(() => {
    getPets();
  }, [userDetails, pets]);

  //Actions
  const getPets = async () => {
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

  // Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PatientSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <AccountDetails
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
                    <span>Mr</span> {userDetails.ownerName}
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
          </AccountDetails>
          <PetAccountDetails setPets={setPets}>
            <div className={`${styles.pet_account_details_lower}`}>
              {pets.length === 0 && (
                <span style={{ fontSize: "0.7rem" }}>No pets found...</span>
              )}
              {pets.map((p) => {
                return (
                  <PetProfileCard
                    key={p.petId}
                    petName={p.petName}
                    age={p.age}
                    gender={p.gender}
                    image={p.profilePic}
                    setPets={setPets}
                    id={p.petId}
                  />
                );
              })}
            </div>
          </PetAccountDetails>
        </GlobalLayout>
      </PatientSidebar>
    </>
  );
};

export default PatientProfile;
