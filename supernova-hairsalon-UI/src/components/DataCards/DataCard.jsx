import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth/AuthContext.jsx';
import EmployeeDataCard from './employees/EmployeeDataCard.jsx';
import CustomerDataCard from './customers/CustomerDataCard.jsx';
import BookingDataCard from './bookings/BookingDataCard.jsx';
import OrderDataCard from './orders/OrderDataCard.jsx';
import RosterDataCard from './rosters/RosterDataCard.jsx';
import ScheduleDataCard from './schedules/ScheduleDataCard.jsx';



const DataCard = ({ service, fields, type }) => {
    const { token } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await service(token);  // Zorg dat 'service' een functie is
                setData(response.data);  // Zorg dat dit overeenkomt met je API response structuur
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [service, token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    const renderSpecificDataCard = (item) => {
        switch (type) {
            case 'employee':
                return <EmployeeDataCard key={item.id} employee={item} fields={fields} />;
            case 'customer':
                return <CustomerDataCard key={item.id} customer={item} fields={fields} />;
            case 'booking':
                return <BookingDataCard key={item.id} booking={item} fields={fields} />;
            case 'order':
                return <OrderDataCard key={item.id} order={item} fields={fields} />;
            case 'roster':
                return <RosterDataCard key={item.id} roster={item} fields={fields} />;
            case 'schedule':
                return <ScheduleDataCard key={item.id} schedule={item} fields={fields} />;
            default:
                return <p>Unknown data type</p>;
        }
    };

    return (
        <div className="data-cards-container">
            {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => renderSpecificDataCard(item))
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
};

export default DataCard;
