import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../utils/Firebase";
import styles from "./EditDoctorModal.module.css";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Loader from "../../Loader";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUplaodPopUp from "../imageUpload/ImageUploadPopUp";

const EditDoctorModal = ({ setOpenModal, userDetails, setUserDetails }) => {
  // States
  const initialState = {
    doctorName: userDetails.doctorName,
    username: userDetails.username,
    phoneNumber: userDetails.phoneNumber,
    npiNumber: userDetails.npiNumber,
    speciality: userDetails.speciality,
    email: userDetails.email,
    address: userDetails.address,
    prefix: "Dr",
    role: "DOCTOR",
    profilePicture: userDetails.profilePicture,
  };

  const [userdata, setUserdata] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(userDetails.profilePicture);
  const [popUp, setPopUp] = useState(false);

  //Configs
  const navigate = useNavigate();

  const {
    doctorName,
    username,
    phoneNumber,
    email,
    address,
    npiNumber,
    speciality,
    profilePicture,
  } = userdata;

  //Actions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API}/setting-service/doctors/doctor/${userDetails.doctorId}/update`,
          userdata
        )
        .then((data) => {
          setUserDetails(data.data);
          toast.success("Successfully updated profile");
          setOpenModal(false);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
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

  //Loader
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="global_modal_container"></div>
      <div className={`${styles.modal_container}`}>
        <div>
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
                height={50}
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
              value={"Update"}
            />
          </form>
        </div>
        <span
          onClick={() => setOpenModal(false)}
          className={`${styles.cancel_button}`}
        >
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </span>
      </div>
      {/* Image upload pop up */}
      {popUp && (
        <ImageUplaodPopUp uploadImage={uploadImage} setPopUp={setPopUp} />
      )}
    </>
  );
};

export default EditDoctorModal;
