import { useState, useEffect } from "react";
import { useFormik } from "formik";
import useUserContext from "../../hooks/useUserContext";
import { toast } from "react-toastify";
import User from "../../models/userModel";

import * as yup from "yup";
import { ref } from "yup";
import { Button, TextField, Box, createTheme, ThemeProvider } from "@mui/material";

const RegisterPopUp = ({ handleClose }) => {
  // Users context
  const { user, setUser } = useUserContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [otherAccount, setOtherAccount] = useState(false);

  // Registration validation schema using yup
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "Passwords do not match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const isDuplicate = user.find(
        (user) => user.email === formik.values.email
      );

      if (isDuplicate) {
        toast.error("Email already in use");
        return;
      }

      // Using a custom class as a model / schema
      const persona = new User();
      persona.name = formik.values.name;
      persona.email = formik.values.email;
      persona.password = formik.values.password;
      persona.balance = 0;
      persona.transactionHistory = [];

      setUser((prev) => [...prev, persona]);
      formik.resetForm();
      setOtherAccount((prev) => !prev);
      toast.success("Successful user registration");
      return;
    },
  });

  // Listen for Form inputs
  useEffect(() => {
    const { name, email, password, confirmPassword } = formik.values;

    if (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values]);

  const handleClosePopUp = () => {
    handleClose();
    setOtherAccount(false);
  };

  const handleClickYes = () => {
    setOtherAccount((prev) => !prev);
  };

  const cancelButtonStyles = {
    backgroundColor: "#495057",
  };

  const registerButtonStyles = {
    backgroundColor: "#333c2e",
    color: "white",
  };

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& $notchedOutline": {
              borderColor: "#292b27",
            },
            "&:hover $notchedOutline": {
              borderColor: "#292b27",
            },
            "&$focused $notchedOutline": {
              borderColor: "#292b27",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="popup-box" style={{ zIndex: 9999 }}>
        <div className="box">
          {otherAccount ? (
            <div className="card">
              <div className="card-body">
                <p>Add another account</p>
                <Box m={2} className="custom-btn-group">
                  <Button
                    variant="contained"
                    style={cancelButtonStyles}
                    type="submit"
                    onClick={handleClosePopUp}
                  >
                    No
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleClickYes}
                    style={registerButtonStyles}
                  >
                    Yes
                  </Button>
                </Box>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Register</h5>
                <hr />
                <div>
                  <Box m={2}>
                    <TextField
                      className="text-box custom-input-box"
                      id="name"
                      name="name"
                      label="Name"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Box>

                  <Box m={2}>
                    <TextField
                      className="text-box custom-input-box"
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Box>

                  <Box m={2}>
                    <TextField
                      className="text-box custom-input-box"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Box>

                  <Box m={2}>
                    <TextField
                      className="text-box custom-input-box"
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                  </Box>

                  <Box m={2} className="custom-btn-group">
                    <Button
                      variant="contained"
                      style={cancelButtonStyles}
                      type="submit"
                      onClick={handleClosePopUp}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      type="submit"
                      onClick={formik.handleSubmit}
                      disabled={isDisabled}
                      style={registerButtonStyles}
                    >
                      Register
                    </Button>
                  </Box>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RegisterPopUp;

