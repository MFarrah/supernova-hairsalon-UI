import React from 'react';

const OrderDataCard = ({ order, fields }) => {
    return (
        <div className="order-card">
            {fields.map(field => (
                <p key={field.key}>
                    <strong>{field.label}:</strong> {order[field.key]}
                </p>
            ))}
        </div>
    );
};

export default OrderDataCard;
