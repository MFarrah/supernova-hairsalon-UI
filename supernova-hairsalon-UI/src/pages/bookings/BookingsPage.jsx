import { Route, Routes } from "react-router-dom";
import DataCard from "../../components/DataCards/DataCard.jsx";
import BookingService from "../../services/bookings/BookingService.jsx";
import bookingFields from "../../config/ResponseFields/bookingFields.jsx";
import React from "react";

const BookingsPage = () => {
    return (
        <div className="dashboard-container">
            <Routes>
                <Route path="bookings" element={<DataCard service={BookingService.getAllBookings} fields={bookingFields} type="booking"/>}/>
            </Routes>
        </div>
    );
};

export default BookingsPage;
