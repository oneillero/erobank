import { useState, useEffect } from "react";
import useUserContext from "../hooks/useUserContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";

import createTransaction from "../helpers/createTransaction";

const Deposit = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, setUser, loggedInUser, setLoggedInUser } = useUserContext();
  const [balance, setBalance] = useState();

  const validationSchema = yup.object({
    depositAmount: yup
      .number()
      .min(1, "Must be greater or equal than $1")
      .required("Deposit Amount is required")
      .typeError("The deposit amount must be a number"),
  });

  const formik = useFormik({
    initialValues: {
      depositAmount: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      if (!loggedInUser) {
        toast.error("Please login to make a successful transaction");
        return;
      }

      const depAmount = parseFloat(formik.values.depositAmount);
      let newBalance = 0;
      const newData = user.map((u) => {
        if (u.email === loggedInUser.email) {
          u.balance += depAmount;
          newBalance = u.balance;
          const newTransaction = createTransaction("Deposit", depAmount);
          u.transactionHistory.push(newTransaction);
          setBalance(u.balance);
        }
        return u;
      });

      setUser(newData);
      setLoggedInUser((prev) => ({ ...prev, balance: newBalance }));
      formik.resetForm();
      toast.success("Deposit successful");
      return;
    },
  });

  useEffect(() => {
    if (loggedInUser) {
      setBalance(loggedInUser.balance);
    }
  }, [loggedInUser]);

  useEffect(() => {
    const { depositAmount } = formik.values;

    if (depositAmount.trim().length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values]);

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#879e7a",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#879e7a",
            },
          },
          input: {
            "&::placeholder": {
              color: "#879e7a",
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: "#879e7a",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <div
          style={{
            width: "500px",
            padding: "24px",
            borderRadius: "5px",
            boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.1)",
            background: loggedInUser ? "white" : "rgba(255, 255, 255, 0.01)",
            border: "1px solid #333c2e",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {!loggedInUser ? (
            <>
              <Typography variant="h5" style={{ marginBottom: "24px" }}>
                Deposit
              </Typography>
              <Typography>Please login to your account</Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" style={{ marginBottom: "24px" }}>
                Deposit
              </Typography>
              <Typography variant="subtitle1" style={{ fontWeight: "bold", fontSize: "24px" }}>
                Balance: ${balance}
              </Typography>
              <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <TextField
                  fullWidth
                  id="depositAmount"
                  name="depositAmount"
                  label="Deposit Amount"
                  placeholder="Enter deposit amount"
                  value={formik.values.depositAmount}
                  onChange={formik.handleChange}
                  error={formik.touched.depositAmount && Boolean(formik.errors.depositAmount)}
                  helperText={formik.touched.depositAmount && formik.errors.depositAmount}
                  variant="outlined"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={isDisabled}
                  style={{ background: "#333c2e", color: "#FFFFFF", "&:hover": { background: "#22291f" } }}
                >
                  Deposit
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Deposit;
