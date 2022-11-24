import axios from "axios";

export const getTotalAppointments = async () => {
  const data = await axios.get(
    `${process.env.REACT_APP_API}/appointment-service/appointments/total/appointments`
  );

  return data.data;
};

export const getConfirmedAppointments = async () => {
  const data = await axios.get(
    `${process.env.REACT_APP_API}/appointment-service/appointments/status/confirmed`
  );

  return data.data;
};

export const getClosedAppointments = async () => {
  const data = await axios.get(
    `${process.env.REACT_APP_API}/appointment-service/appointments/status/closed`
  );

  return data.data;
};

export const getCancelledAppointments = async () => {
  const data = await axios.get(
    `${process.env.REACT_APP_API}/appointment-service/appointments/status/cancelled`
  );

  return data.data;
};
