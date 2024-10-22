import React from 'react';
import EmployeeService from '/src/services/employees/EmployeeService.jsx';
import employeeFields from '/src/config/ResponseFields/employeeFields.jsx';
import DataCard from '../DataCard.jsx';

const EmployeeDataCards = () => {
    return (
        <DataCard
            service={EmployeeService.getAllEmployees}  // Haalt alle employees op
            fields={employeeFields}  // Geeft de velden voor een employee weer
            type="employee"  // Specificeert dat het om employee-data gaat
        />
    );
};

export default EmployeeDataCards;
