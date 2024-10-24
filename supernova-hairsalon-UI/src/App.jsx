import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeesPage from '/src/pages/employees/EmployeesPage.jsx';
import CustomersPage from '/src/pages/customers/CustomersPage.jsx';
import BookingsPage from '/src/pages/bookings/BookingsPage.jsx';
import OrdersPage from '/src/pages/orders/OrdersPage.jsx';
import SchedulesPage from '/src/pages/schedules/SchedulesPage.jsx';
import RostersPage from '/src/pages/rosters/RostersPage.jsx';
import Navbar from '/src/components/Navbar/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/employees/*" element={<EmployeesPage />} />
                    <Route path="/customers/*" element={<CustomersPage />} />
                    <Route path="/bookings/*" element={<BookingsPage />} />
                    <Route path="/orders/*" element={<OrdersPage />} />
                    <Route path="/schedules/*" element={<SchedulesPage />} />
                    <Route path="/rosters/*" element={<RostersPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
