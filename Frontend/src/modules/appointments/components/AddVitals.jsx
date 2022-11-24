import React, { useState } from "react";
import toast from "react-hot-toast";
import styles from "./css/AddVitals.module.css";
import axios from "axios";
import Loader from "../../../shared/Loader";

const AddVitals = ({ setVitalModal, id, setShowPrescription }) => {
  // States
  const [heartBpm, setHeartBpm] = useState("");
  const [lungsBpm, setLungsBpm] = useState("");
  const [temperature, setTemperature] = useState("");
  const [loading, setLoading] = useState(false);

  // Actions
  const addVitals = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/vitals/create/vital/appointment/${id}/new`,
          { heartBpm, lungsBpm, temperature }
        )
        .then((data) => {
          toast.success("Successfully added vitals");
          setLoading(false);
          setVitalModal(false);
          setShowPrescription(true);
        })
        .catch((err) => {
          setLoading(false);
          setVitalModal(false);
          setShowPrescription(true);
          toast.error(err.response.data.message);
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
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="register-form"
          >
            <input
              value={heartBpm}
              onChange={(e) => setHeartBpm(e.target.value)}
              style={{ width: "8rem" }}
              className="register-input"
              type="text"
              placeholder="Heart BPM"
            />
            <input
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              style={{ width: "8rem" }}
              className="register-input"
              type="text"
              placeholder="Temperature"
            />
            <input
              value={lungsBpm}
              onChange={(e) => setLungsBpm(e.target.value)}
              style={{ width: "8rem" }}
              className="register-input"
              type="text"
              placeholder="Lungs BPM"
            />
          </form>
          <button
            onClick={addVitals}
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
            Add vitals
          </button>
        </div>

        <span
          onClick={() => setOpenModal(false)}
          className={`${styles.cancel_button}`}
        >
          <i
            onClick={() => setVitalModal(false)}
            className="fa-sharp fa-solid fa-xmark"
          ></i>
        </span>
      </div>
    </>
  );
};

export default AddVitals;
