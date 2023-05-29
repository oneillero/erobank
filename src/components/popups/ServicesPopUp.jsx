import React from 'react';
import { Button, Box, createTheme, ThemeProvider } from "@mui/material";

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

const ServicesPopUp = ({ handleClose }) => {
  const handlePopupClose = () => {
    handleClose();
  };

  return (
    <div className="popup-box">
      <div className="box">
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <span className="">ERO | Global Banking</span>
            <hr />
            <h2 style={{ textAlign: 'center' }}>Services</h2>
            <p style={{ textAlign: 'center' }}>
              At ERO Global Bank, we offer a comprehensive range of financial services to meet the diverse needs of our clients. Our services are designed to provide exceptional value and support for individuals, corporations, and institutions across various sectors.
            </p>
            <p style={{ textAlign: 'center' }}>
              Our services include:
            </p>
            <ul style={{ textAlign: 'center' }}>
              <li>Wealth Management: Our experienced team of wealth managers provides personalized financial planning and investment strategies tailored to your unique goals and risk profile.</li>
              <li>Corporate Financing: We offer a wide range of corporate financing solutions, including debt financing, equity financing, and structured financing, to help businesses achieve their growth objectives.</li>
              <li>Capital Markets: Our capital markets team provides expertise in equity offerings, debt securities, initial public offerings (IPOs), and other capital market transactions.</li>
              <li>Asset Management: We offer a range of asset management solutions, including portfolio management, mutual funds, and alternative investments, to optimize returns and manage risk.</li>
              <li>Advisory Services: Our advisory services encompass mergers and acquisitions, strategic partnerships, divestitures, and other strategic transactions, providing strategic guidance and support throughout the process.</li>
            </ul>
            <p style={{ textAlign: 'center' }}>
              Our dedicated team of professionals is committed to delivering tailored solutions that drive growth and success. With us by your side, you can confidently pursue your financial goals.
            </p>
            
            <Box m={2} className="custom-btn-group" display="flex" justifyContent="center">
              <ThemeProvider theme={theme}>
                <Button variant="contained" onClick={handlePopupClose}>
                  Close
                </Button>
              </ThemeProvider>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPopUp;
