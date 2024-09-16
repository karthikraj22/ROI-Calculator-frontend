// src/RoiResults.js
import React from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
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
  RadialLinearScale // Register RadialLinearScale for Radar charts
} from 'chart.js';
import './RoiResults.css'; // Import the new CSS file

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
  RadialLinearScale // Register RadialLinearScale for Radar charts
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
    labels: ['Year 1', 'Year 2', 'Year 3'], // Example time-based labels
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

  return (
    <Card className="results-card">
      <CardBody>
        {/* Output summary card */}
        <Card className="output-summary-card mb-4">
          <CardBody>
            <Row>
              <Col>
                <CardText><strong>3-Year ROI %:</strong> {results?.roiPercentage || '0.00%'}</CardText>
                <CardText><strong>Payback Period (Months):</strong> {results?.paybackPeriodMonths || '0.00'}</CardText>
                <CardText><strong>Annual Savings:</strong> ${results?.annualSavings || 0}</CardText>
                <CardText><strong>Total Costs:</strong> ${results?.totalCosts || 0}</CardText>
                <CardText><strong>Productivity Hours Saved:</strong> {results?.productivityHoursSaved || 0}</CardText>
                <CardText><strong>Recommendation:</strong> {results?.recommendation || 'Re-evaluate or consider alternatives'}</CardText>
              </Col>
            </Row>
          </CardBody>
        </Card>

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
