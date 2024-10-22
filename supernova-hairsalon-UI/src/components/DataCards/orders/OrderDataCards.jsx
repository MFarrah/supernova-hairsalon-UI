import React from 'react';
import OrderService from '/src/services/orders/OrderService.jsx';
import orderFields from '/src/config/ResponseFields/orderFields.jsx';
import DataCard from '../DataCard.jsx';

const OrderDataCards = () => {
    return (
        <DataCard
            service={OrderService.getAllOrders}  // Haalt alle orders op
            fields={orderFields}  // Geeft de velden voor een order weer
            type="order"  // Specificeert dat het om order-data gaat
        />
    );
};

export default OrderDataCards;
