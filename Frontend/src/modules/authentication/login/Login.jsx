import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../shared/Loader";
import { toast } from "react-hot-toast";
import { userLogin } from "../../../redux/slices/userSlice";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginFormValidation } from "../../../utils/FormValidation";

const Login = () => {
  //states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  //config
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: { user },
  } = useSelector((state) => state);

  //UseEffects
  useEffect(() => {
    if (user === null) {
      setLoading(false);
    }
    if (user?.role === "PATIENT") {
      navigate("/patient/dashboard");
    }
    if (user?.role === "DOCTOR") {
      navigate("/doctor/dashboard");
    }
    if (user?.role === "RECEPTIONIST") {
      navigate("/receptionist/dashboard");
    }
  }, [user]);

  //actions
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginFormValidation(username, password) !== true) {
      return;
    }
    setLoading(true);
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/auth-service/authenticate`, {
          username,
          password,
        })
        .then(async (data) => {
          toast.success("Successfully logged in");
          Cookies.set("token", data.data.jwtToken);
          if (data.data.user.role === "PATIENT") {
            await axios
              .get(
                `${process.env.REACT_APP_API}/setting-service/owners/owner/username/${data.data.user.username}/profile`
              )
              .then((res) => {
                setLoading(false);
                window.localStorage.setItem("user", JSON.stringify(res.data));
                dispatch(
                  userLogin({
                    user: res.data,
                  })
                );

                navigate("/patient/dashboard");
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          }
          if (data.data.user.role === "DOCTOR") {
            await axios
              .get(
                `${process.env.REACT_APP_API}/setting-service/doctors/doctor/username/${data.data.user.username}/profile`
              )
              .then((res) => {
                setLoading(false);
                window.localStorage.setItem("user", JSON.stringify(res.data));
                dispatch(
                  userLogin({
                    user: res.data,
                  })
                );

                navigate("/doctor/dashboard");
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          }
          if (data.data.user.role === "RECEPTIONIST") {
            await axios
              .get(
                `${process.env.REACT_APP_API}/setting-service/receptionists/receptionist/username/${data.data.user.username}/profile`
              )
              .then((res) => {
                setLoading(false);
                window.localStorage.setItem("user", JSON.stringify(res.data));
                dispatch(
                  userLogin({
                    user: res.data,
                  })
                );
                navigate("/receptionist/profile");
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  //Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.left_container}`}>
          <img src="images/Loginpage.PNG" alt="" width={575} />
        </div>
        <div className={`${styles.right_container}`}>
          <img src="Images/smallLogo.PNG" alt="" width={40} />
          <span className={`${styles.heading}`}>Log in to your account</span>
          <span className={`${styles.welcome}`}>
            Welcome back! Please enter your details.
          </span>
          <form className={`${styles.form}`} onSubmit={handleSubmit}>
            <div className={`${styles.input_container}`}>
              <span className={`${styles.label}`}>Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`${styles.input}`}
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div className={`${styles.input_container}`}>
              <span className={`${styles.label}`}>Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input}`}
                type="password"
                placeholder="Your password"
              />
            </div>
            <input
              type="submit"
              className={`${styles.button}`}
              value="Sign in"
            />
          </form>
          <p className={`${styles.footer_text}`}>
            Don't have an account?{" "}
            <span
              onClick={handleOpenModal}
              style={{ color: "#fd3f00", cursor: "pointer", fontWeight: "550" }}
            >
              Sign up
            </span>
          </p>
        </div>
        {openModal && (
          <>
            <div className={`${styles.main_modal_container}`}></div>
            <div className={`${styles.modal_container}`}>
              <div>
                <Link to={"/patient/register"}>
                  <button className={`${styles.redirecting_button}`}>
                    Patient
                  </button>
                </Link>
                <Link to={"/doctor/register"}>
                  <button className={`${styles.redirecting_button}`}>
                    Doctor
                  </button>
                </Link>
                <Link to={"/receptionist/register"}>
                  <button className={`${styles.redirecting_button}`}>
                    Receptionist
                  </button>
                </Link>
              </div>
              <span
                onClick={() => setOpenModal(false)}
                className={`${styles.cancel_button}`}
              >
                <i className="fa-sharp fa-solid fa-xmark"></i>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
