import React, { useState } from "react";
import AddNewPetModal from "../../pets/components/addPet/AddNewPetModal";
import styles from "./css/PetAccountDetails.module.css";

const PetAccountDetails = ({ children, setPets }) => {
  //states
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className={`${styles.pet_details_container}`}>
        <div className={`${styles.pet_details_upper}`}>
          <div className={`${styles.pet_details_upper_right}`}>
            <p style={{ fontSize: "0.8rem", fontWeight: "550" }}>Pet details</p>
            <p
              style={{
                marginTop: "0.2rem",
                marginBottom: "0.7rem",
                fontSize: "0.6rem",
                color: "gray",
              }}
            >
              Manage your pets here.
            </p>
          </div>
          <button
            onClick={(e) => setOpenModal(true)}
            className={`${styles.new_pet_button}`}
          >
            <i className="fa-solid fa-plus"></i> New pet
          </button>
        </div>
        {children}
      </div>
      {openModal && <AddNewPetModal setPets={setPets} setOpenModal={setOpenModal} />}
    </>
  );
};

export default PetAccountDetails;
