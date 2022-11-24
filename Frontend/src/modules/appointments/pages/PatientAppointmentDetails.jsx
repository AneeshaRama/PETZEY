import React, { useState } from "react";
import GlobalLayout from "../../../shared/layouts/globalLayout/GlobalLayout";
import Topbar from "../../../shared/layouts/topbar/Topbar";
import PatientSidebar from "../../../shared/layouts/sidebar/PatientSidebar";
import AppointmentDetails from "./doctor/AppointmentDetails";

const PatientAppointmentDetails = () => {
  // states
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  return (
    <>
      <PatientSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <AppointmentDetails route={"/patient/dashboard"} />
        </GlobalLayout>
      </PatientSidebar>
    </>
  );
};

export default PatientAppointmentDetails;
