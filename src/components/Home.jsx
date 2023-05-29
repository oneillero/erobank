import React, { useState } from 'react';
import AboutPopUp from './popups/AboutPopUp';
import RatesPopUp from './popups/RatesPopUp';
import ServicesPopUp from './popups/ServicesPopUp';

const Home = () => {
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showRatesPopup, setShowRatesPopup] = useState(false);
  const [showServicesPopup, setShowServicesPopup] = useState(false);

  const handleAboutClick = () => {
    setShowAboutPopup(true);
    setShowRatesPopup(false);
    setShowServicesPopup(false);
  };

  const handleRatesClick = () => {
    setShowAboutPopup(false);
    setShowRatesPopup(true);
    setShowServicesPopup(false);
  };

  const handleServicesClick = () => {
    setShowAboutPopup(false);
    setShowRatesPopup(false);
    setShowServicesPopup(true);
  };

  const handleClosePopup = () => {
    setShowAboutPopup(false);
    setShowRatesPopup(false);
    setShowServicesPopup(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '60px' }}>
        <div style={{ flex: 2, marginRight: '20px' }}>
          <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <img src="/images/bankero.png" className="card-img-top" alt="..." style={{ width: '65%', height: 'auto' }} />
            <div className="card-body">
              <p className="card-text">
                <strong>Innovative Strategies, Unparalleled Results. Your partner in financial growth.</strong>
              </p>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="card" style={{ marginBottom: '20px', height: '240px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <h5 className="card-title">&nbsp; Save</h5>
            <div className="card-body">
              <p className="card-text">
                Secure your financial future with ERO's comprehensive savings solutions, designed to help individuals and businesses build a strong foundation for their financial goals.
              </p>
            </div>
          </div>
          <div className="card" style={{ height: '240px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <h5 className="card-title">&nbsp; Invest</h5>
            <div className="card-body">
              <p className="card-text">
                Unlock growth opportunities and maximize your investments with ERO's expert guidance and innovative investment strategies, tailored to your unique financial objectives..
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div className="card-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button
            className="btn btn-primary"
            onClick={handleAboutClick}
            style={{ backgroundColor: '#d0d4ce', borderColor: '#333c2e' }}
          >
            About
          </button>
          <button
            className="btn btn-primary"
            onClick={handleRatesClick}
            style={{ backgroundColor: '#d0d4ce', borderColor: '#333c2e' }}
          >
            Rates
          </button>
          <button
            className="btn btn-primary"
            onClick={handleServicesClick}
            style={{ backgroundColor: '#d0d4ce', borderColor: '#333c2e' }}
          >
            Services
          </button>
        </div>
      </div>

      {showAboutPopup && (
        <AboutPopUp handleClose={handleClosePopup} />
      )}

      {showRatesPopup && (
        <RatesPopUp handleClose={handleClosePopup} />
      )}

      {showServicesPopup && (
        <ServicesPopUp handleClose={handleClosePopup} />
      )}

      <footer style={{ background: '#e0e4de', padding: '20px', textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        ERO | Global Banking
      </footer>
    </div>
  );
};

export default Home;
