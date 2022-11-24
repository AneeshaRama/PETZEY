import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./modules/authentication/login/Login";
import { store } from "./redux/Store";
import MyRouter from "./routes/MyRouter";
import { Toaster } from "react-hot-toast";
import { Provider, useSelector } from "react-redux";
import DoctorRegister from "./modules/authentication/register/DoctorRegister";
import PatientRegister from "./modules/authentication/register/PatientRegister";
import ReceptionistRegister from "./modules/authentication/register/ReceptionistRegister";
import Topbar from "./shared/layouts/topbar/Topbar";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            success: {
              iconTheme: {
                primary: "white",
                secondary: "#00b300",
                fontSize: "0.2rem",
              },
              style: {
                background: "#00b300",
                color: "white",
                fontSize: "0.7rem",
                minHeight: "2rem",
                width: "13rem",
                fontWeight: "550",
                borderRadius: "50px",
              },
            },
            error: {
              iconTheme: {
                primary: "white",
                secondary: "red",
                fontSize: "0.2rem",
              },
              style: {
                background: "#cc0000",
                color: "white",
                fontSize: "0.7rem",
                minHeight: "2rem",
                width: "14rem",
                fontWeight: "550",
                borderRadius: "50px",
              },
            },
          }}
        />

        <MyRouter />
      </Provider>
    </>
  );
};

export default App;
