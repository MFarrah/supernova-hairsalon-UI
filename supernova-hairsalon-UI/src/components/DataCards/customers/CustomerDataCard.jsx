import React from 'react';

const CustomerDataCard = ({ customer, fields }) => {
    return (
        <div className="customer-card">
            {fields.map(field => (
                <p key={field.key}>
                    <strong>{field.label}:</strong> {customer[field.key]}
                </p>
            ))}
        </div>
    );
};

export default CustomerDataCard;
