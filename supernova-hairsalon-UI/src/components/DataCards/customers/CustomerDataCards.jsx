import React from 'react';
import CustomerService from '/src/services/customers/CustomerService.jsx';
import customerFields from '/src/config/ResponseFields/customerFields.jsx';
import DataCard from '../DataCard.jsx';

const CustomerDataCards = () => {
    return (
        <DataCard
            service={CustomerService.getAllCustomers}  // Haalt alle klanten op
            fields={customerFields}  // Geeft de velden voor een klant weer
            type="customer"  // Specificeert dat het om klantdata gaat
        />
    );
};

export default CustomerDataCards;
