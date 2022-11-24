import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import ImageUplaodPopUp from "../../../../shared/modals/imageUpload/ImageUploadPopUp";
import { storage } from "../../../../utils/Firebase";
import styles from "./AddNewPetModal.module.css";
import axios from "axios";
import Loader from "../../../../shared/Loader";
import toast from "react-hot-toast";

const AddNewPetModal = ({ setOpenModal, setPets }) => {
  //states
  const initialState = {
    petName: "",
    age: 0,
    dateOfBirth: "",
    bloodGroup: "",
    gender: "",
    species: "",
    allergy: "",
    profilePic: "",
  };

  const [petData, setPetData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [owner, setOwner] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  //configs
  const { petName, age, dateOfBirth, bloodGroup, gender, species, allergy } =
    petData;

  const {
    user: { user },
  } = useSelector((state) => state);

  // Actions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/setting-service/pets/owner/${owner.ownerId}/pet/new/profile`,
          petData
        )
        .then((data) => {
          setOpenModal(false);
          toast.success("Successfully added pet profile");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
      await axios
        .get(`${process.env.REACT_APP_API}/setting-service/pets/all-profiles`)
        .then((data) => {
          setPets(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //upload Image
  const uploadImage = async () => {
    setLoading(true);

    const imageRef = ref(storage, `images/pets/${image.name + v4()}`);
    await uploadBytes(imageRef, image)
      .then(async (data) => {
        await getDownloadURL(data.ref).then((res) => {
          setPopUp(false);
          setLoading(false);
          setImageUrl(res);
          setPetData({ ...petData, profilePic: res });
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

  // loader
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="global_modal_container"></div>

      <div className={`${styles.modal_container}`}>
        <div className={`${styles.add_pet_form_container}`}>
          <label htmlFor="image">
            <img
              style={{ borderRadius: "50%", cursor: "pointer" }}
              src={
                imageUrl
                  ? imageUrl
                  : "https://img.freepik.com/premium-photo/french-bulldog-astronaut-dog-with-with-pilot-glasses-portrait_691560-1543.jpg?size=338&ext=jpg"
              }
              alt=""
              width={70}
            />
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            name=""
            id="image"
            hidden
          />{" "}
          <form className={`${styles.form_container}`} onSubmit={handleSubmit}>
            <input
              name="petName"
              value={petName}
              onChange={handleInputChange}
              className={`${styles.add_pet_input}`}
              type="text"
              placeholder="Pet name"
              autoComplete="off"
            />
            <input
              name="age"
              value={age}
              onChange={handleInputChange}
              className={`${styles.add_pet_input}`}
              type="number"
              placeholder="Age"
              autoComplete="off"
            />
            <input
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={handleInputChange}
              className={`${styles.add_pet_input}`}
              type="text"
              placeholder="Date of birth"
              autoComplete="off"
            />
            <input
              name="species"
              value={species}
              onChange={handleInputChange}
              className={`${styles.add_pet_input}`}
              type="text"
              placeholder="Species"
              autoComplete="off"
            />
            <div className="register_radio_container">
              <div className="register_radio_button_container">
                <label
                  style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                  htmlFor="gender1"
                >
                  Male
                </label>
                <input
                  name="gender"
                  onChange={handleInputChange}
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="gender1"
                  value="Male"
                />
              </div>

              <div className="register_radio_button_container">
                <label
                  style={{ marginRight: "0.2rem", fontSize: "0.8rem" }}
                  htmlFor="gender2"
                >
                  Female
                </label>
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="gender2"
                  name="gender"
                  onChange={handleInputChange}
                  value="Female"
                />
              </div>
            </div>
            <input
              name="bloodGroup"
              value={bloodGroup}
              onChange={handleInputChange}
              className={`${styles.add_pet_input}`}
              type="text"
              placeholder="Blood group"
              autoComplete="off"
            />
            <input
              name="allergy"
              value={allergy}
              onChange={handleInputChange}
              className={`${styles.add_pet_input}`}
              type="text"
              placeholder="Allergy"
              autoComplete="off"
            />
            <input
              style={{ cursor: "pointer" }}
              type="submit"
              className={`${styles.add_pet_button}`}
              value={"Add pet"}
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

export default AddNewPetModal;
