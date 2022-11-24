import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../modules/authentication/login/Login";
import DoctorRegister from "../modules/authentication/register/DoctorRegister";
import PatientRegister from "../modules/authentication/register/PatientRegister";
import ReceptionistRegister from "../modules/authentication/register/ReceptionistRegister";
import PatientDashboard from "../modules/patient/pages/dashboard/PatientDashboard";
import { useSelector } from "react-redux";
import PatientProfile from "../modules/patient/pages/profile/PatientProfile";
import AllDoctorProfiles from "../modules/patient/pages/doctors/AllDoctorProfiles";
import SingleDoctorDetails from "../modules/patient/pages/doctorProfile/SingleDoctorDetails";
import AddAppointment from "../modules/appointments/pages/patient/AddAppointment";
import DoctorProfile from "../modules/doctor/pages/profile/DoctorProfile";
import DoctorDashboard from "../modules/doctor/pages/dashboard/DoctorDashboard";
import DoctorAppointmentDetailsPage from "../modules/appointments/pages/DoctorAppointmentDetailsPage";
import AllPets from "../modules/doctor/pages/pets/AllPets";
import ReceptionistProfile from "../modules/receptionist/pages/profile/ReceptionistProfile";
import AllDoctors from "../modules/receptionist/pages/doctors/AllDoctors";
import SingleDoctorProfile from "../modules/receptionist/pages/doctorProfile/SingleDoctorProfile";
import DoctorPetProfile from "../modules/doctor/pages/pets/DoctorPetProfile";
import ReceptionistAllPets from "../modules/receptionist/pages/pets/ReceptionistAllPets";
import ReceptionistPetProfile from "../modules/receptionist/pages/pets/ReceptionistPetProfile";
import ReceptionistDashboard from "../modules/receptionist/pages/dashbord/ReceptionistDashboard";
import PatientPetProfile from "../modules/patient/pages/pets/PatientPetProfile";
import DoctorNewAppointment from "../modules/doctor/pages/appointments/DoctorNewAppointment";
import ReceptionistNewAppointment from "../modules/receptionist/pages/appointments/ReceptionistNewAppointment";
import ReceptionistAppointmentDetails from "../modules/appointments/pages/ReceptionistAppointmentDetails";
import PatientAppointmentDetails from "../modules/appointments/pages/PatientAppointmentDetails";

const MyRouter = () => {
  const {
    user: { user },
  } = useSelector((state) => state);

  return (
    <>
      <Router>
        {/* Authentication Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route
            path="/receptionist/register"
            element={<ReceptionistRegister />}
          />
        </Routes>

        {/* Patient Routes */}
        <Routes>
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route
            path="/patient/doctors/profiles"
            element={<AllDoctorProfiles />}
          />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route
            path="/patient/pages/pet/profile/:id"
            element={<PatientPetProfile />}
          />
          <Route
            path="/patient/doctor/profile/:id"
            element={<SingleDoctorDetails />}
          />
          <Route
            path="/patient/pages/appointment/details/:id"
            element={<PatientAppointmentDetails />}
          />
          <Route path="/new/appointment" element={<AddAppointment />} />
        </Routes>

        {/* Doctor Routes */}
        <Routes>
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route
            path="/doctor/new/appointment"
            element={<DoctorNewAppointment />}
          />
          <Route path="/doctor/pages/all-pets" element={<AllPets />} />
          <Route
            path="/doctor/pages/pet/profile/:id"
            element={<DoctorPetProfile />}
          />
          <Route
            path="/doctor/pages/appointment/details/:id"
            element={<DoctorAppointmentDetailsPage />}
          />
        </Routes>

        {/* Receptionist routes */}
        <Routes>
          <Route
            path="/receptionist/pages/doctors/profiles"
            element={<AllDoctors />}
          />
          <Route
            path="/receptionist/dashboard"
            element={<ReceptionistDashboard />}
          />
          <Route
            path="/receptionist/new/appointment"
            element={<ReceptionistNewAppointment />}
          />
          <Route
            path="/receptionist/pages/appointment/details/:id"
            element={<ReceptionistAppointmentDetails />}
          />
          <Route
            path="/receptionist/pages/doctor/profile/:id"
            element={<SingleDoctorProfile />}
          />
          <Route
            path="/receptionist/pages/all-pets"
            element={<ReceptionistAllPets />}
          />
          <Route
            path="/receptionist/pages/pet/profile/:id"
            element={<ReceptionistPetProfile />}
          />
          <Route
            path="/receptionist/profile"
            element={<ReceptionistProfile />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default MyRouter;
