import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeDataCards from '/src/components/DataCards/employees/EmployeeDataCards.jsx';
import CustomerDataCards from '/src/components/DataCards/customers/CustomerDataCards.jsx';
import OrderDataCards from '/src/components/DataCards/orders/OrderDataCards.jsx';
import BookingDataCards from '/src/components/DataCards/bookings/BookingDataCards.jsx';
import RosterDataCards from '/src/components/DataCards/rosters/RosterDataCards.jsx';
import ScheduleDataCards from '/src/components/DataCards/schedules/ScheduleDataCards.jsx';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Routes>
                <Route path="employees" element={<EmployeeDataCards />} />
                <Route path="customers" element={<CustomerDataCards />} />
                <Route path="orders" element={<OrderDataCards />} />
                <Route path="bookings" element={<BookingDataCards />} />
                <Route path="rosters" element={<RosterDataCards />} />
                <Route path="schedules" element={<ScheduleDataCards />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
