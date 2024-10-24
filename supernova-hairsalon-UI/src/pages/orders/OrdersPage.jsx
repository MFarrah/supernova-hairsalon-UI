import { Route, Routes } from "react-router-dom";
import DataCard from "../../components/DataCards/DataCard.jsx";
import OrderService from "../../services/orders/OrderService.jsx";
import orderFields from "../../config/ResponseFields/orderFields.jsx";
import React from "react";

const OrdersPage = () => {
    return (
        <div className="dashboard-container">
            <Routes>
                <Route path="orders" element={<DataCard service={OrderService.getAllOrders} fields={orderFields} type="order"/>}/>
            </Routes>
        </div>
    );
};

export default OrdersPage;
