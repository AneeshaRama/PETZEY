import React, { useState } from "react";
import GlobalLayout from "../../../shared/layouts/globalLayout/GlobalLayout";
import DoctorSidebar from "../../../shared/layouts/sidebar/DoctorSidebar";
import Topbar from "../../../shared/layouts/topbar/Topbar";
import AppointmentDetails from "./doctor/AppointmentDetails";

const DoctorAppointmentDetailsPage = () => {
  // states
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  return (
    <>
      <DoctorSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <AppointmentDetails route={"/doctor/dashboard"} />
        </GlobalLayout>
      </DoctorSidebar>
    </>
  );
};

export default DoctorAppointmentDetailsPage;
