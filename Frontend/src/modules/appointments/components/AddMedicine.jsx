import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../shared/Loader";
import {
  medicineConsumptionTime,
  medicineDuration,
  medicineNames,
} from "../../../utils/MasterData";
import styles from "./css/AddMedicine.module.css";

const AddMedicine = ({ setMedicineModal, id, setShowComment }) => {
  // States
  const [medicineName, setMedicineName] = useState("");
  const [days, setDays] = useState("");
  const [description, setDescription] = useState("");
  const [consumptionTime, setConsumptionTime] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  // Actions
  const addMedicine = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/medicines/create/medicine/prescription/${id}/new`,
          { medicineName, description, days, consumptionTime, duration }
        )
        .then((data) => {
          toast.success("Successfully added medicine");
          setLoading(false);
          setMedicineModal(false);
          setShowComment(true);
        })
        .catch((err) => {
          setLoading(false);
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
            <select
              style={{ width: "13rem" }}
              className="register-input"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            >
              <option>Medicine name</option>
              {medicineNames.map((t) => {
                return (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                );
              })}
            </select>
            <input
              value={days}
              onChange={(e) => setDays(e.target.value)}
              style={{ width: "13rem" }}
              className="register-input"
              type="text"
              placeholder="Days"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "13rem" }}
              className="register-input"
              type="text"
              placeholder="Description"
              rows={5}
            ></textarea>
            <select
              style={{ width: "13rem" }}
              className="register-input"
              value={consumptionTime}
              onChange={(e) => setConsumptionTime(e.target.value)}
            >
              <option>Intake</option>
              {medicineConsumptionTime.map((t) => {
                return (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                );
              })}
            </select>
            <select
              style={{ width: "13rem" }}
              className="register-input"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option>Duration</option>
              {medicineDuration.map((t) => {
                return (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                );
              })}
            </select>
          </form>
          <button
            onClick={addMedicine}
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
            Add Medicine
          </button>
        </div>

        <span className={`${styles.cancel_button}`}>
          <i
            onClick={() => setMedicineModal(false)}
            className="fa-sharp fa-solid fa-xmark"
          ></i>
        </span>
      </div>
    </>
  );
};

export default AddMedicine;
