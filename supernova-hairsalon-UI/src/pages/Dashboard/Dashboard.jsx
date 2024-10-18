import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OverviewComponent from '../../components/features/overviews/OverviewComponent.jsx';
import BookingsComponent from '../../components/features/bookings/BookingsComponent.jsx';
import CustomersComponent from '../../components/features/customers/CustomersComponent.jsx';
import EmployeesComponent from '../../components/features/employees/EmployeesComponent.jsx';
import RosterComponent from '../../components/features/rosters/RosterComponent.jsx';
import SchedulesComponent from '../../components/features/schedules/SchedulesComponent.jsx';
import ServicesComponent from '../../components/features/products/ServicesComponent.jsx';
import Navbar from '../../components/Navbar/Navbar';
import ProfileComponent from "../../components/features/profiles/ProfileComponent.jsx";  // Zorg ervoor dat de navbar correct is geïmporteerd

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
