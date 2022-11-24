import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../shared/Loader";
import styles from "./css/AddPrescription.module.css";
import axios from "axios";

const AddPrescription = ({
  setPrescriptionModal,
  id,
  setPrescription,
  setShowMedicine,
}) => {
  // States
  const [prescriptionDate, setPrescriptionDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Actions
  const addPrescription = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/prescriptions/create/prescription/appointment/${id}/new`,
          { prescriptionDate }
        )
        .then((data) => {
          toast.success("Successfully added prescription");
          setLoading(false);
          setPrescriptionModal(false);
          setPrescription(data.data);
          setShowMedicine(true);
        })
        .catch((err) => {
          setLoading(false);
          setPrescriptionModal(false);
          toast.error(err.response.data.message);
          setShowMedicine(true);
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
      <div className="global_modal_container"></div>
      <div className={`${styles.modal_container}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form className="register-form">
            <input
              value={prescriptionDate}
              onChange={(e) => setPrescriptionDate(e.target.value)}
              style={{ width: "8rem" }}
              className="register-input"
              type="date"
            />
          </form>
          <button
            onClick={addPrescription}
            style={{
              border: "none",
              borderRadius: "0.3rem",
              fontSize: "0.7rem",
              fontWeight: "550",
              backgroundColor: "#fd3f00",
              color: "white",
              padding: "0.3rem",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            Add prescription
          </button>
        </div>

        <span className={`${styles.cancel_button}`}>
          <i
            onClick={() => setPrescriptionModal(false)}
            className="fa-sharp fa-solid fa-xmark"
          ></i>
        </span>
      </div>
    </>
  );
};

export default AddPrescription;
