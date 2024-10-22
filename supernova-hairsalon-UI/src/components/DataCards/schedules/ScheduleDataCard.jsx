import React from 'react';

const ScheduleDataCard = ({ schedule, fields }) => {
    return (
        <div className="schedule-card">
            {fields.map(field => (
                <p key={field.key}>
                    <strong>{field.label}:</strong> {schedule[field.key]}
                </p>
            ))}
        </div>
    );
};

export default ScheduleDataCard;
