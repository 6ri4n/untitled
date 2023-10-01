import { useEffect, useState } from "react";
import APIClient from "../../utils/api-client";
import FormInput from "../FormInput/FormInput";
import "./signup.css";

const Signup = () => {
  const [signup, setSignup] = useState({
    username: "",
    password: "",
    cpassword: "",
  });

  const [validate, setValidate] = useState({
    username: true,
    password: true,
    cpassword: true,
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
      onChange: (e) =>
        setSignup((prev) => ({
          ...prev,
          username: e.target.value,
        })),
      errorMessage: "Username not available.",
      validate: validate.username,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      onChange: (e) =>
        setSignup((prev) => ({
          ...prev,
          password: e.target.value,
        })),
      errorMessage: "Missing password.",
      validate: validate.password,
    },
    {
      id: 3,
      name: "confirm password",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
      onChange: (e) =>
        setSignup((prev) => ({
          ...prev,
          cpassword: e.target.value,
        })),
      errorMessage: "Passwords don't match.",
      validate: validate.cpassword,
    },
  ];

  const [signupStatus, setSignupStatus] = useState(undefined);

  const api = new APIClient();

  useEffect(() => {
    const validUsername = async (username) => {
      try {
        await api.post("/signup/username", { username });

        setValidate((prev) => ({
          ...prev,
          username: true,
        }));
      } catch (error) {
        setValidate((prev) => ({
          ...prev,
          username: false,
        }));
      }
    };

    signup.username && validUsername(signup.username);
  }, [signup.username]);

  useEffect(() => {
    const validPassword = (password) => {
      if (password) {
        setValidate((prev) => ({
          ...prev,
          password: true,
        }));
      } else {
        setValidate((prev) => ({
          ...prev,
          password: false,
        }));
      }
    };

    const validCPassword = (password, cpassword) => {
      if (password === cpassword) {
        setValidate((prev) => ({
          ...prev,
          cpassword: true,
        }));
      } else {
        setValidate((prev) => ({
          ...prev,
          cpassword: false,
        }));
      }
    };

    signup.password && validPassword(signup.password);
    signup.cpassword && validCPassword(signup.password, signup.cpassword);
  }, [signup.password, signup.cpassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(validate.username && validate.password && validate.cpassword)) return;

    try {
      api.cancel();

      const signupData = {
        username: signup.username,
        password: signup.password,
      };

      const response = await api.post("/signup", signupData);

      if (response.ok) setSignupStatus(true);
    } catch (error) {
      setSignupStatus(false);
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        {signupStatus && <div className="signupStatus">Account Created</div>}
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

          {inputs.map((input) => (
            <FormInput key={input.id} {...input} />
          ))}

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
