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

const AboutPopUp = ({ handleClose }) => {
  const handlePopupClose = () => {
    handleClose();
  };

  return (
    <div className="popup-box" style={{ zIndex: 9999 }}>
      <div className="box">
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <span className="">ERO | Global Banking</span>
            <hr />
            <div>
              <Box m={2} className="custom-btn-group">
                <div>
                  <h2 style={{ textAlign: 'center' }}>About</h2>
                  <p style={{ textAlign: 'center' }}>
                    ERO is a leading global investment bank that provides a comprehensive range of financial services to individuals, corporations, and institutions. With a strong commitment to excellence and innovation, we strive to be the trusted partner for our clients' financial needs.
                  </p>
                  <p style={{ textAlign: 'center' }}>
                    We offer a wide array of investment banking services, including mergers and acquisitions, corporate financing, capital markets, asset management, and advisory services. Our team of experienced professionals combines industry knowledge with strategic insights to deliver tailored solutions that drive growth and value for our clients.
                  </p>
                  <p style={{ textAlign: 'center' }}>
                    We pride ourselves on our strong relationships, integrity, and dedication to delivering exceptional results. Our global presence allows us to serve clients across diverse sectors and geographies, providing them with access to a broad network of opportunities and resources.
                  </p>
                  <p style={{ textAlign: 'center' }}>
                    ERO Global Bank is committed to staying at the forefront of technological advancements and market trends. We leverage cutting-edge technologies and data-driven insights to provide innovative solutions that empower our clients to make informed decisions and navigate the complexities of the financial landscape.
                  </p>
                  <p style={{ textAlign: 'center' }}>
                    Whether you're an individual looking for personalized wealth management services or a corporation seeking strategic financial solutions, ERO is here to help you achieve your financial goals. Trust us to be your partner in financial growth and success.
                  </p>
                </div>
              </Box>

              <Box m={2} className="custom-btn-group" style={{ justifyContent: 'center' }}>
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

export default AboutPopUp;
