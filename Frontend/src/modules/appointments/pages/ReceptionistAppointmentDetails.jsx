import React, { useState } from "react";
import GlobalLayout from "../../../shared/layouts/globalLayout/GlobalLayout";
import ReceptionistSidebar from "../../../shared/layouts/sidebar/ReceptionistSidebar";
import Topbar from "../../../shared/layouts/topbar/Topbar";
import AppointmentDetails from "./doctor/AppointmentDetails";

const ReceptionistAppointmentDetails = () => {
  // states
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  return (
    <>
      <ReceptionistSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <AppointmentDetails route={"/receptionist/dashboard"} />
        </GlobalLayout>
      </ReceptionistSidebar>
    </>
  );
};

export default ReceptionistAppointmentDetails;
