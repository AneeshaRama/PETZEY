import React, { useState, useEffect } from "react";
import ReceptionistSidebar from "../../../../shared/layouts/sidebar/ReceptionistSidebar";
import GlobalLayout from "../../../../shared/layouts/globalLayout/GlobalLayout";
import Topbar from "../../../../shared/layouts/topbar/Topbar";
import PetCard from "../../../pets/components/petCards/PetCard";
import { Link } from "react-router-dom";
import Loader from "../../../../shared/Loader";
import styles from "./css/ReceptionistAllPets.module.css";
import axios from "axios";

const ReceptionistAllPets = () => {
  // states
  const [loading, setLoading] = useState(true);
  const [allPets, setAllPets] = useState([]);
  const [search, setSearch] = useState(false);
  const [petsByName, setPetsByName] = useState([]);
  const [petName, setPetName] = useState("");
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  //useEffects
  useEffect(() => {
    getAllPets();
  }, []);

  useEffect(() => {}, [allPets]);

  //Actions
  const getAllPets = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/setting-service/pets/all-profiles`)
        .then((data) => {
          setAllPets(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getPetsByName = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API}/setting-service/pets/pet/${petName}/profiles`
        )
        .then((data) => {
          setPetsByName(data.data);
          setSearch(true);
          setAllPets(data.data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Loader
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <ReceptionistSidebar>
        <GlobalLayout>
          <Topbar userDetails={userDetails} />
          <div className={`${styles.header}`}>
            <span style={{ fontSize: "1.3rem", fontWeight: 550 }}>
              All Pets
            </span>
            <div className={`${styles.right_header}`}>
              <button
                style={{
                  border: "none",
                  padding: "0.46rem",
                  backgroundColor: "white",
                  borderRadius: "0.3rem",
                  cursor: "pointer",
                  marginRight: "0.5rem",
                  fontSize: "0.7rem",
                }}
              >
                <i
                  style={{ marginRight: "0.3rem" }}
                  className="fa-solid fa-filter"
                ></i>{" "}
                Filters
              </button>
              <div className={`${styles.searchbox}`}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    marginLeft: "0.5rem",
                    fontSize: "0.7rem",
                    width: "12rem",
                  }}
                  type="text"
                  placeholder="Search pets"
                  autoComplete="off"
                />
                <button
                  onClick={getPetsByName}
                  style={{
                    outline: "none",
                    border: "none",
                    color: "white",
                    backgroundColor: "#fd3f00",
                    borderRadius: "0.3rem",
                    padding: "0.3rem",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                  }}
                >
                  search
                </button>
                {/* {search &&
                  petsByName.map((p) => {
                    return (
                      <div
                        key={p.petId}
                        className={`${styles.search_doctor_by_name}`}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "start",
                            fontSize: "0.7rem",
                            padding: "0.4rem 0.7rem",
                            borderBottom: "0.1px solid gainsboro",
                            height: "2rem",
                          }}
                        >
                          <Link
                            to={`/receptionist/pages/pet/profile/${p.petId}`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span style={{ cursor: "pointer" }}>
                              {p.petName}
                            </span>
                          </Link>
                        </div>
                      </div>
                    );
                  })} */}
              </div>
            </div>
          </div>
          <div style={{ padding: "1rem", marginTop: "0.4rem" }}>
            {/* <div style={{ borderBottom: "1px solid #94a3b8" }}>
              <p style={{ fontWeight: "550", marginBottom: "0.4rem" }}>
                Recently Consulted
              </p>
            </div>
            <div className={`${styles.recently_consulted_pets}`}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/receptionist/pages/pet/profile/${1}`}
              >
                <PetCard
                  name={"Tommy"}
                  id={1}
                  species={"Dog"}
                  gender={"Male"}
                  age={3}
                  image={
                    "https://img.freepik.com/free-photo/lovely-pet-portrait-isolated_23-2149192357.jpg?size=626&ext=jpg"
                  }
                />
              </Link>
            </div>
            <div
              style={{ borderBottom: "1px solid #94a3b8", marginTop: "2rem" }}
            >
              <p style={{ fontWeight: "550", marginBottom: "0.4rem" }}>
                All Pets
              </p>
            </div> */}
            <div className={`${styles.recently_consulted_pets}`}>
              {allPets.length === 0 && (
                <span style={{ fontSize: "0.7rem", marginTop: "2rem" }}>
                  No pets found
                </span>
              )}
              {allPets.map((p) => {
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    key={p.petId}
                    to={`/receptionist/pages/pet/profile/${p.petId}`}
                  >
                    <PetCard
                      name={p.petName}
                      species={p.species}
                      gender={p.gender}
                      age={p.age}
                      image={p.profilePic}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </GlobalLayout>
      </ReceptionistSidebar>
    </>
  );
};

export default ReceptionistAllPets;
