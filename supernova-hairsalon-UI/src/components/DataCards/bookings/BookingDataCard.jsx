import React from 'react';

const BookingDataCard = ({ booking, fields }) => {
    return (
        <div className="booking-card">
            {fields.map(field => (
                <p key={field.key}>
                    <strong>{field.label}:</strong> {booking[field.key]}
                </p>
            ))}
        </div>
    );
};

export default BookingDataCard;
