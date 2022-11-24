import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../shared/Loader";
import styles from "./css/Feedback.module.css";

const Feedback = ({ setOpenFeedbackModal, appointmentId }) => {
  // states
  const initialState = {
    ratings: "",
    additionalComment: "",
  };
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(initialState);

  // configs
  const { ratings, additionalComment } = feedback;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  // Actions
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/feedbacks/create/feedback/appointment/${appointmentId}/new`,
          feedback
        )
        .then((data) => {
          toast.success("Successfully added feedback");
          setLoading(false);
          setOpenFeedbackModal(false);
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
        <div className={`${styles.feedback_container}`}>
          <p style={{ fontSize: "0.7rem", fontWeight: "550" }}>
            How satisfied are you with process of booking appointment
          </p>
          <div className="register_radio_container">
            <div className="register_radio_button_container">
              <label
                style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                htmlFor="rating1"
              >
                1
              </label>
              <input
                name="ratings"
                onChange={handleInputChange}
                style={{ cursor: "pointer" }}
                type="radio"
                id="rating1"
                value="ONE"
              />
            </div>

            <div className="register_radio_button_container">
              <label
                style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                htmlFor="rating2"
              >
                2
              </label>
              <input
                style={{ cursor: "pointer" }}
                type="radio"
                id="rating2"
                name="ratings"
                onChange={handleInputChange}
                value="TWO"
              />
            </div>

            <div className="register_radio_button_container">
              <label
                style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                htmlFor="rating3"
              >
                3
              </label>
              <input
                style={{ cursor: "pointer" }}
                type="radio"
                id="rating3"
                name="ratings"
                onChange={handleInputChange}
                value="THREE"
              />
            </div>
            <div className="register_radio_button_container">
              <label
                style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                htmlFor="rating4"
              >
                4
              </label>
              <input
                style={{ cursor: "pointer" }}
                type="radio"
                id="rating4"
                name="ratings"
                onChange={handleInputChange}
                value="FOUR"
              />
            </div>
            <div className="register_radio_button_container">
              <label
                style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                htmlFor="rating5"
              >
                5
              </label>
              <input
                style={{ cursor: "pointer" }}
                type="radio"
                id="rating5"
                name="ratings"
                onChange={handleInputChange}
                value="FIVE"
              />
            </div>
          </div>
          <textarea
            style={{
              fontSize: "0.7rem",
              padding: "1rem",
              border: "none",
              outline: "none",
              borderRadius: "0.3rem",
              backgroundColor: "gainsboro",
            }}
            placeholder="Additional comment"
            name="additionalComment"
            value={additionalComment}
            onChange={handleInputChange}
            cols="40"
            rows="5"
          ></textarea>
          <div
            style={{
              width: "17rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setOpenFeedbackModal(false)}
              style={{ color: "#334155", backgroundColor: "gainsboro" }}
              className={`${styles.button}`}
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className={`${styles.button}`}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
