import React from 'react';
import { Button, Box, createTheme, ThemeProvider } from "@mui/material";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTooltip } from 'victory';

// Define a custom theme with button styles
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#333c2e',
          '&:hover': {
            backgroundColor: '#879e7a',
          },
        },
      },
    },
  },
});

const RatesPopUp = ({ handleClose }) => {
  const handlePopupClose = () => {
    handleClose();
  };

  const data = [
    { month: 'Jan', rate: 2.4 },
    { month: 'Feb', rate: 2.7 },
    { month: 'Mar', rate: 2.6 },
    { month: 'Apr', rate: 2.5 },
    { month: 'May', rate: 2.9 },
    { month: 'Jun', rate: 2.6 },
    { month: 'Jul', rate: 2.8 },
    { month: 'Aug', rate: 2.6 },
    { month: 'Sep', rate: 2.7 },
    { month: 'Oct', rate: 2.5 },
    { month: 'Nov', rate: 2.8 },
    { month: 'Dec', rate: 2.7 },
  ];

  return (
    <div className="popup-box" style={{ zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div className="box">
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <span className="" style={{ display: 'block', textAlign: 'center' }}>ERO | Global Banking</span>
            <hr />
            <div>
              <Box m={2} className="custom-btn-group" style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                  <h2 style={{ textAlign: 'center' }}>Rates</h2>
                  <p style={{ textAlign: 'center' }}>
                    At ERO Global Bank, we offer competitive interest rates for various financial products. Our rates are designed to provide attractive returns while maintaining the highest level of security and stability for our clients.
                  </p>
                  <p style={{ textAlign: 'center' }}>
                    Check out our monthly rates for the 2022 calendar year below. Please inquire to learn more about our current rates.
                  </p>
                  <div style={{ width: '100%', height: 300 }}>
                    <VictoryChart>
                      <VictoryAxis
                        dependentAxis
                        label="Interest Rate"
                        style={{ axisLabel: { padding: 50 } }} // Adjust the padding value here
                      />
                      <VictoryAxis />
                      <VictoryLine
                        data={data}
                        x="month"
                        y="rate"
                        labelComponent={<VictoryTooltip />}
                      />
                    </VictoryChart>
                  </div>
                </div>
              </Box>

              <Box m={2} className="custom-btn-group" style={{ display: 'flex', justifyContent: 'center' }}>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    onClick={handlePopupClose}
                  >
                    Close
                  </Button>
                </ThemeProvider>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatesPopUp;
