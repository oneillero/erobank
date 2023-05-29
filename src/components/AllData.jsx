import { useState } from "react";
import useUserContext from "../hooks/useUserContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const AllData = () => {
  const { user, setUser } = useUserContext();

  const usersList = user.map((user, i) => {
    return (
      <TableRow
        key={i}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          "&:hover": { bgcolor: "action.hover" },
          "&:nth-of-type(odd)": { bgcolor: "action.selected" },
        }}
      >
        <TableCell component="th" scope="row" sx={{ fontWeight: "bold", padding: "16px" }}>
          {user.name}
        </TableCell>
        <TableCell align="right" sx={{ padding: "16px" }}>
          {user.email}
        </TableCell>
        <TableCell align="right" sx={{ padding: "16px" }}>
          {user.password}
        </TableCell>
        <TableCell align="right" sx={{ padding: "16px" }}>
          ${user.balance}
        </TableCell>
      </TableRow>
    );
  });

  const handleClearData = () => {
    setUser([]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: "16px" }}>Data</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "16px" }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "16px" }}>Password</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "16px" }}>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{usersList}</TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button
        variant="contained"
        onClick={handleClearData}
        style={{ backgroundColor: "#292b27", color: "white" }}
      >
        Clear
      </Button>
    </div>
  );
};

export default AllData;
