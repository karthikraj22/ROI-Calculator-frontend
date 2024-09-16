import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Tooltip } from 'reactstrap';
import './RoiForm.css';

function RoiForm({ onCalculate }) {
  const [formData, setFormData] = useState({
    totalEmployees: '',
    softwareApps: '',
    avgSoftwareLicenseCost: '',
    newSoftwareSolutionCost: '',
    exEmployees: '',
    avgOnboardingCost: '',
    contractorsEmployed: '',
    contractorHourlyRate: '',
    contractorWeeklyHours: '',
    avgEmployeeHourlyWage: '',
    manualTaskHoursPerWeek: '',
    manualTaskReduction: '',
    itSupportStaff: '',
    itTicketReduction: '',
    currentAnnualServerCosts: '',
    newAnnualServerCosts: '',
    implementationCost: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [tooltipOpen, setTooltipOpen] = useState({
    totalEmployees: false,
    softwareApps: false,
    avgSoftwareLicenseCost: false,
    newSoftwareSolutionCost: false,
    exEmployees: false,
    avgOnboardingCost: false,
    contractorsEmployed: false,
    contractorHourlyRate: false,
    contractorWeeklyHours: false,
    avgEmployeeHourlyWage: false,
    manualTaskHoursPerWeek: false,
    manualTaskReduction: false,
    itSupportStaff: false,
    itTicketReduction: false,
    currentAnnualServerCosts: false,
    newAnnualServerCosts: false,
    implementationCost: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onCalculate(formData);
    }
  };

  const toggleTooltip = (field) => {
    setTooltipOpen({ ...tooltipOpen, [field]: !tooltipOpen[field] });
  };

  return (
    <div className="form-container">
      <div className="step-tracker">
        <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
          <span className="step-number">1</span> General Info
        </div>
        <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
          <span className="step-number">2</span> Costs
        </div>
        <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
          <span className="step-number">3</span> Additional Info
        </div>
      </div>
      <Form className="form" onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="form-grid">
            {[
              { label: 'Total Employees', name: 'totalEmployees', tooltip: 'Number of employees in your organization.' },
              { label: 'Software Apps (Current)', name: 'softwareApps', tooltip: 'Number of software applications currently used.' },
              { label: 'Average Cost per Software License', name: 'avgSoftwareLicenseCost', tooltip: 'Average cost of each software license.' },
              { label: 'New Software Solution Cost', name: 'newSoftwareSolutionCost', tooltip: 'Cost of the new software solution.' },
              { label: 'Ex-Employees (Last Year)', name: 'exEmployees', tooltip: 'Number of employees who left last year.' },
              { label: 'Average Onboarding Cost', name: 'avgOnboardingCost', tooltip: 'Average cost for onboarding a new employee.' },
              { label: 'Contractors Employed', name: 'contractorsEmployed', tooltip: 'Number of contractors employed.' },
            ].map(({ label, name, tooltip }) => (
              <FormGroup className="form-group" key={name}>
                <Label for={name}>{label}</Label>
                <Input
                  type="number"
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
                <i id={`${name}Info`} className="info-icon">i</i>
                <Tooltip
                  isOpen={tooltipOpen[name]}
                  target={`${name}Info`}
                  toggle={() => toggleTooltip(name)}
                >
                  {tooltip}
                </Tooltip>
              </FormGroup>
            ))}
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-grid">
            {[
              { label: 'Contractor Hourly Rate', name: 'contractorHourlyRate', tooltip: 'Hourly rate paid to contractors.' },
              { label: 'Contractor Weekly Hours', name: 'contractorWeeklyHours', tooltip: 'Average weekly hours worked by contractors.' },
              { label: 'Average Employee Hourly Wage', name: 'avgEmployeeHourlyWage', tooltip: 'Average hourly wage of employees.' },
              { label: 'Manual Task Hours per Week', name: 'manualTaskHoursPerWeek', tooltip: 'Hours spent on manual tasks per week.' },
              { label: 'Manual Task Reduction', name: 'manualTaskReduction', tooltip: 'Expected reduction in manual task hours.' },
              { label: 'IT Support Staff', name: 'itSupportStaff', tooltip: 'Number of IT support staff in the organization.' },
            ].map(({ label, name, tooltip }) => (
              <FormGroup className="form-group" key={name}>
                <Label for={name}>{label}</Label>
                <Input
                  type="number"
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
                <i id={`${name}Info`} className="info-icon">i</i>
                <Tooltip
                  isOpen={tooltipOpen[name]}
                  target={`${name}Info`}
                  toggle={() => toggleTooltip(name)}
                >
                  {tooltip}
                </Tooltip>
              </FormGroup>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-grid">
            {[
              { label: 'IT Ticket Reduction', name: 'itTicketReduction', tooltip: 'Expected reduction in IT support tickets.' },
              { label: 'Current Annual Server Costs', name: 'currentAnnualServerCosts', tooltip: 'Current annual costs for server maintenance.' },
              { label: 'New Annual Server Costs', name: 'newAnnualServerCosts', tooltip: 'Projected annual costs for the new server solution.' },
              { label: 'Implementation Cost', name: 'implementationCost', tooltip: 'Cost associated with implementing the new software.' },
            ].map(({ label, name, tooltip }) => (
              <FormGroup className="form-group" key={name}>
                <Label for={name}>{label}</Label>
                <Input
                  type="number"
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
                <i id={`${name}Info`} className="info-icon">i</i>
                <Tooltip
                  isOpen={tooltipOpen[name]}
                  target={`${name}Info`}
                  toggle={() => toggleTooltip(name)}
                >
                  {tooltip}
                </Tooltip>
              </FormGroup>
            ))}
          </div>
        )}

        <Button type="submit" className="submit-btn">
          {currentStep < 3 ? 'Continue →' : 'Calculate'}
        </Button>
      </Form>
    </div>
  );
}

export default RoiForm;
