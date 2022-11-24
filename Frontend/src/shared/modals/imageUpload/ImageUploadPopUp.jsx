import React from "react";

const ImageUplaodPopUp = ({ uploadImage, setPopUp }) => {
  return (
    <>
      <div className="image_upload_global_modal_container"></div>
      <div className="image_upload_pop_up_container">
        <div>
          <p style={{ fontSize: "0.8rem", fontWeight: "550" }}>
            Do you want to upload this image?
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              onClick={() => setPopUp(false)}
              style={{
                padding: "0.2rem 0.8rem",
                border: "none",
                color: "white",
                backgroundColor: "#fd3f00",
                fontSize: "0.8rem",
                borderRadius: "0.3rem",
                marginTop: "0.9rem",
                cursor: "pointer",
              }}
            >
              cancel
            </button>
            <button
              onClick={uploadImage}
              style={{
                padding: "0.2rem 0.8rem",
                border: "none",
                color: "white",
                backgroundColor: "#fd3f00",
                fontSize: "0.8rem",
                borderRadius: "0.3rem",
                marginTop: "0.9rem",
                cursor: "pointer",
              }}
            >
              yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUplaodPopUp;
