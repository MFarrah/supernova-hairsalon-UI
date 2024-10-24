import React from 'react';
import DataCard from '../DataCard.jsx';

const EmployeeDataCards = () => {
    return (
        <DataCard
            service={BookingService.getAllBookings}  // Haalt alle bookings op
            fields={['id', 'customerName', 'bookingDate']}  // Geeft de velden voor een booking weer
            type="booking"  // Specificeert dat het om booking-data gaat
        />

    );
};

export default EmployeeDataCards;
