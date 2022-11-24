import React from "react";

const Loader = () => {
  return (
    <>
      <div className="global_modal_container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
