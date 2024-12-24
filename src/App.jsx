import React from 'react';
import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";
import ContactPage from "./pages/contactPage/ContactPage.jsx";
import ServicesPage from "./pages/servicesPage/ServicesPage.jsx";
import PortalPage from "./pages/portalPage/PortalPage.jsx";
import AdminPage from "./pages/dashboard/adminPage/AdminPage.jsx";
import EmployeePage from "./pages/dashboard/employeePage/EmployeePage.jsx";
import CustomerPage from "./pages/dashboard/customerPage/CustomerPage.jsx";
import CustomerProfilePage from "./pages/dashboard/customerPage/customerProfilePage/CustomerProfilePage.jsx";
import CustomerBookingsPage from "./pages/dashboard/customerPage/customerBookingsPage/CustomerBookingsPage.jsx";
import CustomerNewBookingPage from "./pages/dashboard/customerPage/customerNewBookingPage/CustomerNewBookingPage.jsx";
import EmployeeAgendaPage from "./pages/dashboard/employeePage/employeeAgendaPage/EmployeeAgendaPage.jsx";
import EmployeeNewBookingPage from "./pages/dashboard/employeePage/employeeNewBookingPage/EmployeeNewBookingPage.jsx";
import EmployeeBookingsPage from "./pages/dashboard/employeePage/employeeBookingsPage/EmployeeBookingsPage.jsx";
import EmployeeCustomersPage from "./pages/dashboard/employeePage/employeeCustomersPage/EmployeeCustomersPage.jsx";
import AdminBookingsPage from "./pages/dashboard/adminPage/adminBookingsPage/AdminBookingsPage.jsx";
import AdminNewBookingPage from "./pages/dashboard/adminPage/adminNewBookingPage/AdminNewBookingPage.jsx";
import CustomersOverviewPage from "./pages/dashboard/adminPage/customersOverviewPage/CustomersOverviewPage.jsx";
import EmployeesOverviewPage from "./pages/dashboard/adminPage/employeesOverviewPage/EmployeesOverviewPage.jsx";
import RostersOverviewPage from "./pages/dashboard/adminPage/rostersOverviewPage/RostersOverviewPage.jsx";
import ServicesOverviewPage from "./pages/dashboard/adminPage/servicesOverviewPage/ServicesOverviewPage.jsx";
import AdminAgendaPage from "./pages/dashboard/adminPage/adminAgendaPage/AdminAgendaPage.jsx";

function App() {
    return (
        <>

                <Navbar/>
            <Routes>
                <Route path="/portal" element={<PortalPage/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Services" element={<ServicesPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>

                <Route path="/adminboard" element={<AdminPage />}/>
                <Route path="/adminagenda" element={<AdminAgendaPage />}/>
                <Route path="/adminbookings" element={<AdminBookingsPage />}/>
                <Route path="/adminnewbooking" element={<AdminNewBookingPage />}/>
                <Route path="/admincustomers" element={<CustomersOverviewPage />}/>
                <Route path="/adminemployees" element={<EmployeesOverviewPage />}/>
                <Route path="/adminrosters" element={<RostersOverviewPage />}/>
                <Route path="/adminservices" element={<ServicesOverviewPage />}/>

                <Route path="/dashboard" element={<EmployeePage />}/>
                <Route path="/employeeagenda" element={<EmployeeAgendaPage />}/>
                <Route path="/employeenewbooking" element={<EmployeeNewBookingPage />}/>
                <Route path="/employeebookings" element={<EmployeeBookingsPage />}/>
                <Route path="/employeecustomers" element={<EmployeeCustomersPage />}/>

                <Route path="/profile" element={<CustomerPage/>}/>
                <Route path="/profile/*" element={<CustomerProfilePage />}/>
                <Route path="/mybookings" element={<CustomerBookingsPage/>}/>
                <Route path="/newbooking" element={<CustomerNewBookingPage/>}/>

            </Routes>
        </>
    );
}

export default App;
