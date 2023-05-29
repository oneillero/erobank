import { useState } from "react";
import useUserContext from "../hooks/useUserContext";
import { Button } from "@mui/material";
import Transactions from "./Transactions";

import getTotal from "../helpers/getTotal";

import UpdateProfilePopUp from "./popups/UpdateProfilePopUp";
import Chart from "./Chart";

const UserAccount = () => {
  const { loggedInUser } = useUserContext();
  const [isUpdatePopUpOpen, setIsUpdatePopUpOpen] = useState(false);

  const totalDeposits = getTotal("Deposit", loggedInUser.transactionHistory);
  const totalWithdraws = getTotal("Withdraw", loggedInUser.transactionHistory);

  const [transactionData, setTransactionData] = useState({
    labels: ["Total Amount Deposits", "Total Amount Withdraws"],
    datasets: [
      {
        label: "Total",
        data: [totalDeposits, totalWithdraws],
        backgroundColor: ["rgba(135, 158, 122, 0.5)", "rgba(135, 158, 122, 0.5)"],
        borderColor: ["rgb(41, 43, 39)", "rgb(41, 43, 39)"],
        borderWidth: 2,
      },
    ],
  });

  const toggleUpdate = () => {
    setIsUpdatePopUpOpen((prev) => !prev);
  };

  return (
    <>
      <div className="userInfo-container" style={{ boxShadow: "none", textAlign: "center", paddingTop: "15px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ marginRight: "0px" }}>
          <h5>{`${loggedInUser.name} \u00A0`}</h5>
          </div>
          <div style={{ marginLeft: "0px" }}>
            <h6>Current Balance: ${loggedInUser.balance}</h6>
          </div>
        </div>
        <Button style={{ position: "static", boxShadow: "none", color: "#292b27" }} onClick={toggleUpdate}>
          Edit Profile Info
        </Button>
      </div>
      <div className="report-container" style={{ boxShadow: "none", marginBottom: "60px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ boxShadow: "none", marginBottom: "10px", textAlign: "center", maxHeight: "350px", overflow: "auto" }}>
          <h5>Transactions: Scroll to View</h5>
          <Transactions />
        </div>
        <div className="chart-container" style={{ boxShadow: "none", outline: "1px solid #292b27", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Chart chartData={transactionData} />
        </div>
      </div>
      {isUpdatePopUpOpen && <UpdateProfilePopUp handleClose={toggleUpdate} />}
    </>
  );
};

export default UserAccount;
