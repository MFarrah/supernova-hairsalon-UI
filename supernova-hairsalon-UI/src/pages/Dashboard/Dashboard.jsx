import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OverviewComponent from '../../components/OverviewComponent/OverviewComponent';
import BookingsComponent from '../../components/BookingsComponent/BookingsComponent';
import CustomersComponent from '../../components/CustomersComponent/CustomersComponent';
import EmployeesComponent from '../../components/EmployeesComponent/EmployeesComponent';
import RosterComponent from '../../components/RosterComponent/RosterComponent';
import SchedulesComponent from '../../components/SchedulesComponent/SchedulesComponent';
import ServicesComponent from '../../components/ServicesComponent/ServicesComponent';
import Navbar from '../../components/Navbar/Navbar';
import ProfileComponent from "../../components/ProfileComponent/ProfileComponent.jsx";  // Zorg ervoor dat de navbar correct is geïmporteerd

const Dashboard = () => {
    return (
        <>
            <div className="dashboard-container">
                <h1>Admin Dashboard</h1>
                <Navbar />
                <div className="content">
                    {/* Dynamische routing in het content-gebied */}
                    <Routes>
                        <Route path="profile" element={<ProfileComponent />} />
                        <Route path="overview" element={<OverviewComponent />} />
                        <Route path="bookings" element={<BookingsComponent />} />
                        <Route path="customers" element={<CustomersComponent />} />
                        <Route path="employees" element={<EmployeesComponent />} />
                        <Route path="roster" element={<RosterComponent />} />
                        <Route path="schedules" element={<SchedulesComponent />} />
                        <Route path="services" element={<ServicesComponent />} />
                    </Routes>
                </div>
            </div>
            <footer className="footer"></footer>
        </>
    );
};

export default Dashboard;
