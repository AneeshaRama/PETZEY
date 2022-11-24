import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../shared/Loader";
import styles from "./css/AddComment.module.css";

const AddComment = ({ setOpenCommentModal, id, setShowGenerateButton }) => {
  // States
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Actions
  const addComment = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/appointment-service/comments/create/comment/appointment/${id}/new`,
          { description }
        )
        .then((data) => {
          toast.success("Successfully added comment");
          setLoading(false);
          setOpenCommentModal(false);
          setShowGenerateButton(true);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setShowGenerateButton(true);
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
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "12rem" }}
              className="register-input"
              type="text"
              rows={4}
              placeholder="Enter comment"
            ></textarea>
          </form>
          <button
            onClick={addComment}
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
            Add comment
          </button>
        </div>

        <span className={`${styles.cancel_button}`}>
          <i
            onClick={() => setOpenCommentModal(false)}
            className="fa-sharp fa-solid fa-xmark"
          ></i>
        </span>
      </div>
    </>
  );
};

export default AddComment;
