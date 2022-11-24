import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../shared/Loader";
import RegisterForm from "./component/RegisterForm";
import toast from "react-hot-toast";
import axios from "axios";
import { registerFormValidation } from "../../../utils/FormValidation";
import { useSelector } from "react-redux";
import { storage } from "../../../utils/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import ImageUplaodPopUp from "../../../shared/modals/imageUpload/ImageUploadPopUp";

const DoctorRegister = () => {
  // States
  const initialState = {
    doctorName: "",
    username: "",
    userPassword: "",
    phoneNumber: "",
    npiNumber: "",
    speciality: "",
    email: "",
    address: "",
    prefix: "Dr",
    role: "DOCTOR",
    profilePicture: "",
  };

  const [userdata, setUserdata] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [popUp, setPopUp] = useState(false);

  //Configs
  const navigate = useNavigate();

  const {
    doctorName,
    username,
    userPassword,
    phoneNumber,
    email,
    address,
    npiNumber,
    speciality,
    profilePicture,
  } = userdata;

  const {
    user: { user },
  } = useSelector((state) => state);

  // UseEffect
  useEffect(() => {
    if (user === null) {
      setLoading(false);
    }
    if (user?.role === "PATIENT") {
      navigate("/pet-owner/dashboard");
    }
    if (user?.role === "DOCTOR") {
      navigate("/doctor/dashboard");
    }
    if (user?.role === "RECEPTIONIST") {
      navigate("/receptionist/dashboard");
    }
  }, [user]);

  // Actions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userdata);
    if (registerFormValidation(userdata) !== true) {
      return;
    }
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/auth-service/doctor/register`,
          userdata
        )
        .then((data) => {
          setLoading(false);
          toast.success("Successfully registered.Please login to continue");
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to register.Please try again");
    }
  };

  //upload Image
  const uploadImage = async () => {
    setLoading(true);

    const imageRef = ref(storage, `images/doctors/${image.name + v4()}`);
    await uploadBytes(imageRef, image)
      .then(async (data) => {
        await getDownloadURL(data.ref).then((res) => {
          setPopUp(false);
          setLoading(false);
          setImageUrl(res);
          setUserdata({ ...userdata, profilePicture: res });
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleFileChange = async (e) => {
    setImage(e.target.files[0]);
    setPopUp(true);
  };

  // Loader
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <RegisterForm notDoctor={false}>
        <form className="register_form" onSubmit={handleSubmit}>
          <label htmlFor="image">
            <img
              style={{ borderRadius: "50%", cursor: "pointer" }}
              src={
                imageUrl
                  ? imageUrl
                  : "https://cdn-icons-png.flaticon.com/512/0/93.png"
              }
              alt=""
              width={50}
            />
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            name=""
            id="image"
            hidden
          />{" "}
          <input
            value={doctorName}
            name="doctorName"
            onChange={handleInputChange}
            className="register-input"
            type="text"
            placeholder="Full name"
            autoComplete="off"
          />
          <input
            value={username}
            name="username"
            onChange={handleInputChange}
            className="register-input"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
          <input
            value={email}
            name="email"
            onChange={handleInputChange}
            className="register-input"
            type="email"
            placeholder="Email"
            autoComplete="off"
          />
          <input
            value={phoneNumber}
            name="phoneNumber"
            onChange={handleInputChange}
            className="register-input"
            type="text"
            placeholder="Phone number"
            autoComplete="off"
          />
          <input
            value={userPassword}
            name="userPassword"
            onChange={handleInputChange}
            className="register-input"
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          <input
            value={address}
            name="address"
            onChange={handleInputChange}
            className="register-input"
            type="text"
            placeholder="Address"
            autoComplete="off"
          />
          <input
            value={speciality}
            name="speciality"
            onChange={handleInputChange}
            className="register-input"
            type="text"
            placeholder="Speciality"
            autoComplete="off"
          />
          <input
            value={npiNumber}
            name="npiNumber"
            onChange={handleInputChange}
            className="register-input"
            type="text"
            placeholder="NPI number"
            autoComplete="off"
          />
          <input
            style={{ cursor: "pointer" }}
            type="submit"
            className="register_submit_button"
            value={"Submit"}
          />
        </form>
      </RegisterForm>

      {/* Image upload pop up */}
      {popUp && (
        <ImageUplaodPopUp uploadImage={uploadImage} setPopUp={setPopUp} />
      )}
    </>
  );
};

export default DoctorRegister;
