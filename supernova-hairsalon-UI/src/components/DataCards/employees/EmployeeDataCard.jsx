import React from 'react';

const EmployeeDataCard = ({ employee, fields }) => {
    return (
        <div className="employee-card">
            {fields.map(field => (
                <p key={field.key}>
                    <strong>{field.label}:</strong> {employee[field.key]}
                </p>
            ))}
        </div>
    );
};

export default EmployeeDataCard;
