// src/StageTracker.js
import React from 'react';
import { Row, Col } from 'reactstrap';
import './StageTracker.css';

const StageTracker = ({ currentStage }) => {
  return (
    <Row className="stage-tracker">
      <Col className={`stage ${currentStage >= 1 ? 'active' : ''}`}>
        <div className="circle">
          <span className={`badge ${currentStage >= 1 ? 'completed' : ''}`}>1</span>
        </div>
        <span className="stage-label">Personal Info</span>
      </Col>
      <Col className={`stage ${currentStage >= 2 ? 'active' : ''}`}>
        <div className="circle">
          <span className={`badge ${currentStage >= 2 ? 'completed' : ''}`}>2</span>
        </div>
        <span className="stage-label">Details</span>
      </Col>
      <Col className={`stage ${currentStage >= 3 ? 'active' : ''}`}>
        <div className="circle">
          <span className={`badge ${currentStage >= 3 ? 'completed' : ''}`}>3</span>
        </div>
        <span className="stage-label">Summary</span>
      </Col>
    </Row>
  );
};

export default StageTracker;
