import { toast } from "react-hot-toast";

export const loginFormValidation = (username, password) => {
  if (username === "") {
    return toast.error("Please enter username");
  }
  if (password === "") {
    return toast.error("Please enter password");
  }
  return true;
};

export const registerFormValidation = (userdata) => {
  if (userdata.role === "PATIENT") {
    if (userdata.ownerName === "") {
      return toast.error("Please enter your name");
    }
  }
  if (userdata.role === "RECEPTIONIST") {
    if (userdata.receptionistName === "") {
      return toast.error("Please enter your name");
    }
  }
  if (userdata.role === "DOCTOR") {
    if (userdata.doctorName === "") {
      return toast.error("Please enter your name");
    }
    if (userdata.phoneNumber === "") {
      return toast.error("Please enter your phone number");
    }
    if (userdata.speciality === "") {
      return toast.error("Please enter your speciality");
    }
    if (userdata.npiNumber === "") {
      return toast.error("Please enter your npiNumber");
    }
  }
  if (userdata.username === "") {
    return toast.error("Please enter your username");
  }
  if (userdata.email === "") {
    return toast.error("Please enter your email address");
  }
  if (userdata.userPassword === "") {
    return toast.error("Please enter your password");
  }
  if (userdata.userPassword.length < 6) {
    return toast.error("Password should contain atleast 6 characters");
  }
  if (userdata.prefix === "") {
    return toast.error("Please enter prefix for your name");
  }
  return true;
};
