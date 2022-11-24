import React, { useState } from "react";
import styles from "./css/PetProfileCard.module.css";
import EditPetModal from "../editPet/EditPetModal";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../../../shared/Loader";
import { Link } from "react-router-dom";

const PetProfileCard = ({ petName, age, gender, image, setPets, id }) => {
  //states
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [settings, setSettings] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Actions
  const handlePetDelete = async () => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_API}/setting-service/pets/owner/${user.ownerId}/pet/${id}/remove`
        )
        .then((data) => {
          toast.success(`Successfully deleted ${petName}'s profile`);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    await axios
      .get(`${process.env.REACT_APP_API}/setting-service/pets/all-profiles`)
      .then((data) => {
        setPets(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // loader
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className={`${styles.container}`}>
        <img
          style={{ borderRadius: "50%", marginLeft: "1rem" }}
          src={image}
          alt=""
          width={50}
          height={50}
        />
        <Link
          style={{ textDecoration: "none" }}
          to={`/patient/pages/pet/profile/${id}`}
        >
          <div className={`${styles.text_container}`}>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "550",
                marginLeft: "0.3rem",
              }}
            >
              {petName}
            </p>
            <p
              style={{
                marginTop: "0.2rem",
                fontSize: "0.6rem",
                fontWeight: "550",
                marginLeft: "0.3rem",
                marginRight: "0.5rem",
                color: "gray",
              }}
            >
              <span style={{ color: "gray" }}>{gender}</span>,{" "}
              <span style={{ color: "gray" }}>{`${age} `}</span>Years
            </p>
          </div>
        </Link>
        {settings ? (
          <i
            onClick={() => setSettings(false)}
            className={`fa-sharp fa-solid fa-xmark ${styles.setting_close}`}
          ></i>
        ) : (
          <i
            onClick={() => setSettings(true)}
            className={`fa-solid fa-ellipsis-vertical`}
          ></i>
        )}

        {settings && (
          <div className={`${styles.settings}`}>
            <span
              onClick={() => {
                setSettings(false);
                setOpenModal(true);
              }}
              className={`${styles.setting_option}`}
            >
              Edit pet profile
            </span>
            <span
              onClick={handlePetDelete}
              className={`${styles.setting_option}`}
            >
              Remove pet
            </span>
          </div>
        )}
      </div>
      {openModal && (
        <EditPetModal setPets={setPets} id={id} setOpenModal={setOpenModal} />
      )}
    </>
  );
};

export default PetProfileCard;
