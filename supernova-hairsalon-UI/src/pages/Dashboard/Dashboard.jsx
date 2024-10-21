import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OverviewComponent from '../../components/features/overviews/OverviewComponent';
import BookingsComponent from '../../components/features/bookings/BookingsComponent';
import CustomersComponent from '../../components/features/customers/CustomersComponent';
import EmployeesComponent from '../../components/features/employees/EmployeesComponent';
import RosterComponent from '../../components/features/rosters/RosterComponent';
import SchedulesComponent from '../../components/features/schedules/SchedulesComponent';
import ServicesComponent from '../../components/features/services/ServicesComponent';
import ProfileComponent from "../../components/features/profiles/ProfileComponent";  // Zorg ervoor dat de navbar correct is geïmporteerd

const Dashboard = () => {
    return (
        <>
            <div className="dashboard-container">

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
