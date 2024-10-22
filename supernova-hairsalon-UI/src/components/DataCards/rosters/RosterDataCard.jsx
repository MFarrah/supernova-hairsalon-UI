import React from 'react';

const RosterDataCard = ({ roster, fields }) => {
    return (
        <div className="roster-card">
            {fields.map(field => (
                <p key={field.key}>
                    <strong>{field.label}:</strong> {roster[field.key]}
                </p>
            ))}
        </div>
    );
};

export default RosterDataCard;
