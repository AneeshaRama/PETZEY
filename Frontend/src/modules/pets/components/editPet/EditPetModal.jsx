import React, { useState, useEffect } from "react";
import styles from "./EditPetModal.module.css";
import axios from "axios";
import Loader from "../../../../shared/Loader";
import toast from "react-hot-toast";
import ImageUplaodPopUp from "../../../../shared/modals/imageUpload/ImageUploadPopUp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../utils/Firebase";
import { v4 } from "uuid";

const EditPetModal = ({ setOpenModal, setPets, id }) => {
  // States
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
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [petData, setPetData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");

  //configs
  const {
    petName,
    age,
    dateOfBirth,
    bloodGroup,
    gender,
    species,
    allergy,
    profilePic,
  } = petData;

  //useEffects
  useEffect(() => {
    getPetById();
  }, []);

  //Actions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API}/setting-service/pets/owner/${user.ownerId}/pet/${id}/update`,
          petData
        )
        .then((data) => {
          setOpenModal(false);
          toast.success("Successfully updated pet details");
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

  const getPetById = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/pets/pet/${id}/profile`
        )
        .then((data) => {
          setPetData({
            ...petData,
            petName: data.data.petName,
            age: data.data.age,
            dateOfBirth: data.data.dateOfBirth,
            bloodGroup: data.data.bloodGroup,
            profilePic: data.data.profilePic,
            species: data.data.species,
            allergy: data.data.allergy,
          });
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
          setPetData({ ...setPetData, profilePic: res });
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
        <div className={`${styles.add_pet_form_container}`}>
          <form className={`${styles.form_container}`} onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label htmlFor="image">
                <img
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                  src={
                    profilePic
                      ? profilePic
                      : "https://img.freepik.com/premium-photo/french-bulldog-astronaut-dog-with-with-pilot-glasses-portrait_691560-1543.jpg?size=338&ext=jpg"
                  }
                  alt=""
                  width={80}
                />
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                name=""
                id="image"
                hidden
              />{" "}
            </div>
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
              value={"Edit"}
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

export default EditPetModal;
