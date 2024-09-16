// src/App.js
import React, { useState } from 'react';
import { Container, Modal, Navbar } from 'react-bootstrap';
import RoiForm from './RoiCalculator/RoiForm';
import RoiResults from './RoiCalculator/RoiResult';
import './App.css'; // Import the custom CSS file

function App() {
  const [results, setResults] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCalculate = async (formData) => {
    try {
      const response = await fetch('https://roi-calculator-backend-kappa.vercel.app/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data);
      setShowModal(true);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="app-container">
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand className="mx-auto">ROI Calculator</Navbar.Brand>
      </Navbar>
      
      {/* Title and Description */}
      <Container className="text-center mt-4">
        <h1>Return on Investment (ROI) Calculator</h1>
        <p className="lead">Easily assess the returns on your investments</p>
      </Container>
      
      <Container className="main-container mt-5" fluid>
        <RoiForm onCalculate={handleCalculate} />
        <Modal show={showModal} onHide={handleCloseModal} centered className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>ROI Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RoiResults results={results} />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
