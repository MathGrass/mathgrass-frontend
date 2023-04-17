import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store/config/store";
import { fetchUserDetails } from "../../../store/slices/loginAuthenticationSlice";
import HeaderComponent from "../Layout/HeaderComponent";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();
    const results = await dispatch(fetchUserDetails({email:email,password:password}));
    console.log("Results - ",results.payload);
    if (password === "") {
      setFieldErrors("Please enter your password");
    } 
    else if(email===""){
      setFieldErrors("Please enter your email");
    }
    else if(results.payload.userType==="admin"){
        localStorage.setItem("UserLogin","true");
        navigate("/user");

      }
    else if(results.payload.userType==="student"){
        navigate("/student");
      }
    
    else {
      setFieldErrors(
        "Email or Password is incorrect. Contact Supervisor for onboarding..."
      );
    }

    console.log("The Email - " + email + " and the password is -" + password);
  };
  return (
    <Fragment>
      <HeaderComponent />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "500px" }}>
          <div className="card-header bg-primary">
            <h4 className="text-center text-white">LOGIN</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailEntry"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setFieldErrors("");
                    setEmail(e.target.value);
                  }}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group mb-3">
                  <input
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    aria-describedby="passwordEntry"
                    placeholder="Password"
                    onChange={(e) => {
                      setFieldErrors("");
                      setPassword(e.target.value);
                    }}
                  />
                  <span className="btn btn-outline-secondary">
                    {showPassword ? (
                      <i
                        className="fa fa-eye"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-eye-slash"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      ></i>
                    )}
                  </span>
                </div>
                <p className="text-danger">
                  <i>{fieldErrors}</i>
                </p>
              </div>
              <button type="submit" className="btn btn-primary pull-right">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserLogin;
