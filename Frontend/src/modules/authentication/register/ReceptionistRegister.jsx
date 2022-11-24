import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../shared/Loader";
import ImageUplaodPopUp from "../../../shared/modals/imageUpload/ImageUploadPopUp";
import { storage } from "../../../utils/Firebase";
import { registerFormValidation } from "../../../utils/FormValidation";
import RegisterForm from "./component/RegisterForm";
import { toast } from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import axios from "axios";

const ReceptionistRegister = () => {
  //states
  const initialState = {
    receptionistName: "",
    username: "",
    userPassword: "",
    phone: "",
    email: "",
    address: "",
    prefix: "",
    role: "RECEPTIONIST",
    profilePicture: "",
  };

  const [userdata, setUserdata] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [popUp, setPopUp] = useState(false);

  // configs
  const navigate = useNavigate();

  const {
    receptionistName,
    username,
    userPassword,
    phone,
    email,
    address,
    prefix,
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
          `${process.env.REACT_APP_API}/auth-service/receptionist/register`,
          userdata
        )
        .then((data) => {
          setLoading(false);
          console.log(data);
          toast.success("Successfully registered.Please login to continue");
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to register.Please try again.");
    }
  };

  //upload Image
  const uploadImage = async () => {
    setLoading(true);
    const imageRef = ref(storage, `images/receptionists/${image.name + v4()}`);
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
      <RegisterForm>
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
            value={receptionistName}
            name="receptionistName"
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
            value={phone}
            name="phone"
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
          <div className="register_radio_container">
            <div className="register_radio_button_container">
              <label
                style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                htmlFor="prefix1"
              >
                Mr
              </label>
              <input
                name="prefix"
                onChange={handleInputChange}
                style={{ cursor: "pointer" }}
                type="radio"
                id="prefix1"
                value="Mr"
              />
            </div>

            <div className="register_radio_button_container">
              <label
                style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                htmlFor="prefix2"
              >
                Ms
              </label>
              <input
                style={{ cursor: "pointer" }}
                type="radio"
                id="prefix2"
                name="prefix"
                onChange={handleInputChange}
                value="Ms"
              />
            </div>

            <div className="register_radio_button_container">
              <label
                style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                htmlFor="prefix3"
              >
                Mrs
              </label>
              <input
                style={{ cursor: "pointer" }}
                type="radio"
                id="prefix3"
                name="prefix"
                onChange={handleInputChange}
                value="Mrs"
              />
            </div>
          </div>
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

export default ReceptionistRegister;
