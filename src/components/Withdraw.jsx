import { useState, useEffect } from "react";
import useUserContext from "../hooks/useUserContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Button, TextField, Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import createTransaction from "../helpers/createTransaction";

const Withdraw = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, setUser, loggedInUser, setLoggedInUser } = useUserContext();
  const [balance, setBalance] = useState();

  const validationSchema = yup.object({
    withdrawAmount: yup
      .number()
      .min(1, "Must be greater or equal than $1")
      .max(loggedInUser.balance, "Insufficient Funds")
      .required("Withdraw Amount is required")
      .typeError("The withdraw amount must be a number"),
  });

  const formik = useFormik({
    initialValues: {
      withdrawAmount: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      // Verify if there's a logged-in user
      if (!loggedInUser) {
        toast.error("Please login to make a successful transaction");
        return;
      }

      const witAmount = parseFloat(formik.values.withdrawAmount);

      if (witAmount > loggedInUser.balance) {
        toast.warn("Insufficient Funds");
        return;
      }

      let newBalance = 0;

      const newData = user.map((u) => {
        if (u.email === loggedInUser.email) {
          u.balance -= witAmount;
          newBalance = u.balance;
          const newTransaction = createTransaction("Withdraw", witAmount);
          u.transactionHistory.push(newTransaction);
          setBalance(u.balance);
        }
        return u;
      });

      setUser(newData);
      setLoggedInUser((prev) => ({ ...prev, balance: newBalance }));
      formik.resetForm();
      toast.success("Withdraw successful");
      return;
    },
  });

  // Get initial balance
  useEffect(() => {
    if (loggedInUser) {
      setBalance(loggedInUser.balance);
    }
  }, [loggedInUser]);

  // Listen for formik values changes
  useEffect(() => {
    const { withdrawAmount } = formik.values;

    if (withdrawAmount.trim().length > 0) {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div
          style={{
            width: "500px",
            padding: "24px",
            borderRadius: "5px",
            boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.1)",
            background: loggedInUser ? "white" : "rgba(255, 255, 255, 0.1)",
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
                Withdraw
              </Typography>
              <Typography>Please login to your account</Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" style={{ marginBottom: "24px" }}>
                Withdraw
              </Typography>
              <Typography variant="subtitle1" style={{ fontWeight: "bold", fontSize: "24px" }}>
                Balance: ${balance}
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <TextField
                  fullWidth
                  id="withdrawAmount"
                  name="withdrawAmount"
                  label="Withdraw Amount"
                  placeholder="Enter withdraw amount"
                  value={formik.values.withdrawAmount}
                  onChange={formik.handleChange}
                  error={formik.touched.withdrawAmount && Boolean(formik.errors.withdrawAmount)}
                  helperText={formik.touched.withdrawAmount && formik.errors.withdrawAmount}
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
                  Withdraw
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Withdraw;
