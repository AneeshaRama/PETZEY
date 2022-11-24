import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../shared/Loader";
import styles from "./css/AddSymptoms.module.css";

const AddSymptoms = ({ setSymptomModal, id, setShowTests }) => {
  // States
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Actions
  const addSymptom = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/symptoms/create/symptom/pet/${id}/new`,
          { description }
        )
        .then((data) => {
          toast.success("Successfully added symptom");
          setLoading(false);
          setSymptomModal(false);
          setShowTests(true);
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "8rem" }}
              className="register-input"
              type="text"
              placeholder="Enter a symptom"
            />
          </form>
          <button
            onClick={addSymptom}
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
            Add symptom
          </button>
        </div>

        <span className={`${styles.cancel_button}`}>
          <i
            onClick={() => setSymptomModal(false)}
            className="fa-sharp fa-solid fa-xmark"
          ></i>
        </span>
      </div>
    </>
  );
};

export default AddSymptoms;
