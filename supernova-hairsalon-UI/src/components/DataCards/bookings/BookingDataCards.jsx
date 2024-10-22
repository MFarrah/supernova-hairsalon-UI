import React from 'react';
import BookingService from '/src/services/bookings/BookingService.jsx';
import bookingFields from '/src/config/ResponseFields/bookingFields.jsx';
import DataCard from '../DataCard.jsx';

const BookingDataCards = () => {
    return (
        <DataCard
            service={BookingService.getAllBookings}  // Haalt alle bookings op
            fields={bookingFields}  // Geeft de velden voor een booking weer
            type="booking"  // Specificeert dat het om booking-data gaat
        />
    );
};

export default BookingDataCards;
