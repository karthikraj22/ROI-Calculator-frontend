// src/RoiResults.js
import React from 'react';
import { Card, CardBody, CardText, Row, Col, Button } from 'reactstrap';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale
} from 'chart.js';
import './RoiResults.css';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale
);

function RoiResults({ results }) {
  const barData = {
    labels: ['3-Year ROI %', 'Payback Period (Months)', 'Annual Savings', 'Total Costs', 'Productivity Hours Saved'],
    datasets: [
      {
        label: 'ROI Metrics',
        data: [
          results?.roiPercentage || 0,
          results?.paybackPeriodMonths || 0,
          results?.annualSavings || 0,
          results?.totalCosts || 0,
          results?.productivityHoursSaved || 0,
        ],
        backgroundColor: '#007bff',
        borderColor: '#0056b3',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Annual Savings', 'Total Costs'],
    datasets: [
      {
        data: [
          results?.annualSavings || 0,
          results?.totalCosts || 0,
        ],
        backgroundColor: ['#28a745', '#dc3545'],
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: ['Year 1', 'Year 2', 'Year 3'],
    datasets: [
      {
        label: 'Cumulative ROI',
        data: [results?.roiYear1 || 0, results?.roiYear2 || 0, results?.roiYear3 || 0],
        fill: false,
        borderColor: '#007bff',
        tension: 0.1,
      },
    ],
  };

  const radarData = {
    labels: ['ROI %', 'Savings', 'Costs', 'Productivity', 'Payback Period'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [
          results?.roiPercentage || 0,
          results?.annualSavings || 0,
          results?.totalCosts || 0,
          results?.productivityHoursSaved || 0,
          results?.paybackPeriodMonths || 0,
        ],
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#007bff',
      },
    ],
  };

  const downloadPDF = () => {
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const content = document.querySelector('#report-content');
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('ROI_Report.pdf');
    });
  };

  return (
    <Card className="results-card">
      {/* Button to download PDF placed in the top-right corner */}
      <div className="d-flex justify-content-end mb-4">
        <Button color="primary" size="sm" onClick={downloadPDF}>
          Download Report as PDF
        </Button>
      </div>
      
      <CardBody id="report-content">
        {/* Output summary cards for each result */}
        <Row>
          <Col md="6">
            <Card className="result-card mb-3">
              <CardBody>
                <CardText><strong>3-Year ROI %:</strong> {results?.roiPercentage || '0.00%'}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="result-card mb-3">
              <CardBody>
                <CardText><strong>Payback Period (Months):</strong> {results?.paybackPeriodMonths || '0.00'}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="result-card mb-3">
              <CardBody>
                <CardText><strong>Annual Savings:</strong> ₹{results?.annualSavings || 0}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="result-card mb-3">
              <CardBody>
                <CardText><strong>Total Costs:</strong> ₹{results?.totalCosts || 0}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="result-card mb-3">
              <CardBody>
                <CardText><strong>Productivity Hours Saved:</strong> {results?.productivityHoursSaved || 0}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="result-card mb-3">
              <CardBody>
                <CardText><strong>Recommendation:</strong> {results?.recommendation || 'Re-evaluate or consider alternatives'}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Charts section */}
        {results ? (
          <div className="charts-container">
            <div className="chart-row">
              <div className="chart-item">
                <Bar data={barData} options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.dataset.label + ': ' + context.raw;
                        }
                      }
                    }
                  }
                }} />
              </div>
              <div className="chart-item">
                <Doughnut data={doughnutData} options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.label + ': ' + context.raw;
                        }
                      }
                    }
                  }
                }} />
              </div>
            </div>
            <div className="chart-row">
              <div className="chart-item">
                <Line data={lineData} options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.dataset.label + ': ' + context.raw;
                        }
                      }
                    }
                  }
                }} />
              </div>
              <div className="chart-item">
                <Radar data={radarData} options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.dataset.label + ': ' + context.raw;
                        }
                      }
                    }
                  }
                }} />
              </div>
            </div>
          </div>
        ) : (
          <CardText>No results to display</CardText>
        )}
      </CardBody>
    </Card>
  );
}

export default RoiResults;
