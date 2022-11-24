import React, { useState } from "react";
import Loader from "../../../shared/Loader";
import styles from "./css/AddTests.module.css";
import axios from "axios";
import toast from "react-hot-toast";

const AddTests = ({ setTestModal, id, setShowVital }) => {
  // States
  const [testName, setTestName] = useState("");
  const [loading, setLoading] = useState(false);

  // Actions
  const addTest = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/tests/create/test/appointment/${id}/new`,
          { testName }
        )
        .then((data) => {
          toast.success("Successfully added test");
          setLoading(false);
          setTestModal(false);
          setShowVital(true);
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
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              style={{ width: "8rem" }}
              className="register-input"
              type="text"
              placeholder="Enter a test name"
            />
          </form>
          <button
            onClick={addTest}
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
            Add Test
          </button>
        </div>

        <span
          onClick={() => setOpenModal(false)}
          className={`${styles.cancel_button}`}
        >
          <i
            onClick={() => setTestModal(false)}
            className="fa-sharp fa-solid fa-xmark"
          ></i>
        </span>
      </div>
    </>
  );
};

export default AddTests;
