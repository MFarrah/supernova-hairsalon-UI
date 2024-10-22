import React from 'react';
import ScheduleService from '/src/services/schedules/ScheduleService.jsx';
import scheduleFields from '/src/config/ResponseFields/scheduleFields.jsx';
import DataCard from '../DataCard.jsx';

const ScheduleDataCards = () => {
    return (
        <DataCard
            service={ScheduleService.getAllSchedules}  // Haalt alle schedules op
            fields={scheduleFields}  // Geeft de velden voor een schedule weer
            type="schedule"  // Specificeert dat het om schedule-data gaat
        />
    );
};

export default ScheduleDataCards;
