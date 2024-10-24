import { Route, Routes } from "react-router-dom";
import DataCard from "../../components/DataCards/DataCard.jsx";
import CustomerService from "../../services/customers/CustomerService.jsx";
import customerFields from "../../config/ResponseFields/customerFields.jsx";
import React from "react";

const CustomersPage = () => {
    return (
        <div className="dashboard-container">
            <Routes>
                <Route path="customers" element={<DataCard service={CustomerService.getAllCustomers} fields={customerFields} type="customer"/>}/>
            </Routes>
        </div>
    );
};

export default CustomersPage;
