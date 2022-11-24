import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./EditPatientModal.module.css";
import Loader from "../../../shared/Loader";
import styles from "./EditPatientModal.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUplaodPopUp from "../imageUpload/ImageUploadPopUp";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../utils/Firebase";
const EditPatientModal = ({ setOpenModal, setUserDetails, userDetails }) => {
  //states
  const initialState = {
    ownerName: userDetails.ownerName,
    username: userDetails.username,
    phone: userDetails.phone,
    email: userDetails.email,
    address: userDetails.address,
    prefix: "",
    role: "PATIENT",
    profilePicture: userDetails.profilePicture,
  };

  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState(initialState);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(userDetails.profilePicture);
  const [popUp, setPopUp] = useState(false);

  //configs
  const {
    user: { user },
  } = useSelector((state) => state);
  const { ownerName, username, phone, email, address, prefix } = userdata;

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
          `${process.env.REACT_APP_API}/setting-service/owners/owner/${userDetails.ownerId}/update`,
          userdata
        )
        .then((data) => {
          console.log(data);
          window.localStorage.setItem("user", JSON.stringify(data.data));
          setLoading(false);
          setUserDetails(JSON.parse(window.localStorage.getItem("user")));
          setOpenModal(false);
          toast.success("Successfully updated profile");
        })
        .catch((err) => {
          console.log(err);
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
      <>
        <div className="global_modal_container"></div>
        <div className={`${styles.modal_container}`}>
          <div>
            <form className="register_form" onSubmit={handleSubmit}>
              <label htmlFor="image">
                <img
                  style={{
                    borderRadius: "50%",
                    marginTop: "1rem",
                    cursor: "pointer",
                    marginBottom: "0.5rem",
                  }}
                  src={
                    imageUrl
                      ? imageUrl
                      : "https://cdn-icons-png.flaticon.com/512/0/93.png"
                  }
                  alt=""
                  width={60}
                  height={60}
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
                value={ownerName}
                name="ownerName"
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
    </>
  );
};

export default EditPatientModal;
