import React from 'react';
import EmployeeService from '/src/services/employees/EmployeeService.jsx';
import employeeFields from '/src/config/ResponseFields/employeeFields.jsx';
import DataCard from '/src/components/DataCards/DataCard.jsx';


function EmployeesPage() {

    return (
        <div>
            <DataCard
                service={() => EmployeeService.getAllEmployees(token)}  // Geef het token door aan de service
                fields={employeeFields}
                type="employee"
            />
        </div>
    );
}

export default EmployeesPage;
