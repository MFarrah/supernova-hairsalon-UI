import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import WorkingScheduler from "../workingScheduler/workingScheduler.jsx";
import "./DataCard.css";

function DataCard({ type }) {
    const { token } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [ordersByEmployee, setOrdersByEmployee] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const endpoints = {
        employee: "http://localhost:8080/api/employees/all",
        customer: "http://localhost:8080/api/customers/all",
        order: "http://localhost:8080/api/orders/all",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoints[type], {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setItems(response.data);

                if (type === "employee") {
                    await fetchOrdersForEmployees(response.data);
                }
            } catch (err) {
                setError(`Fout bij laden van ${type}s.`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    const fetchOrdersForEmployees = async (employees) => {
        const requests = employees.map(async (employee) => {
            if (employee.qualifiedOrderIds?.length > 0) {
                try {
                    const response = await axios.post(
                        "http://localhost:8080/api/orders/ids",
                        employee.qualifiedOrderIds,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    return { employeeId: employee.employeeId, orders: response.data };
                } catch (error) {
                    console.error(`Fout bij ophalen van orders voor medewerker ${employee.employeeId}`, error);
                    return { employeeId: employee.employeeId, orders: [] };
                }
            } else {
                return { employeeId: employee.employeeId, orders: [] };
            }
        });

        const responses = await Promise.all(requests);
        const map = {};
        responses.forEach(({ employeeId, orders }) => {
            map[employeeId] = orders;
        });
        setOrdersByEmployee(map);
    };

    if (loading) return <p>{type}s laden...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (items.length === 0) return <p>Geen {type}s gevonden.</p>;

    return (
        <div className="employee-tile-list">
            {items.map((item) => (
                <div className="employee-tile" key={item.employeeId || item.customerId || item.id}>
                    <div className="tile-front">
                        {type === "employee" && (
                            <>
                                <p><strong>Naam:</strong> {item.firstName} {item.lastName}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Geboortedatum:</strong> {item.dateOfBirth}</p>
                                <p><strong>Telefoon:</strong> {item.phoneNumber}</p>
                                <p><strong>Geslacht:</strong> {item.gender}</p>

                                <p><strong>Vaardigheden:</strong></p>
                                {ordersByEmployee[item.employeeId]?.length > 0 ? (
                                    <ul>
                                        {ordersByEmployee[item.employeeId].map((order) => (
                                            <li key={order.id}>
                                                <strong>{order.description}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Geen orders gevonden.</p>
                                )}

                                <p><strong>Beschikbaarheid:</strong></p>
                                <WorkingScheduler schedule={item.workingSchedule} />
                            </>
                        )}

                        {type === "customer" && (
                            <>
                                <p><strong>Naam:</strong> {item.firstName} {item.lastName}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Geboortedatum:</strong> {item.dateOfBirth}</p>
                                <p><strong>Telefoon:</strong> {item.phoneNumber}</p>
                                <p><strong>Geslacht:</strong> {item.gender}</p>
                            </>
                        )}

                        {type === "order" && (
                            <>
                                <p><strong>Beschrijving:</strong> {item.description}</p>
                                <p><strong>Duur:</strong> {item.duration} minuten</p>
                                <p><strong>Prijs:</strong> € {item.price}</p>
                            </>
                        )}
                    </div>

                    <div className="tile-back">
                        {item.profileImageUrl ? (
                            <img
                                src={`http://localhost:8080${item.profileImageUrl}`}
                                alt="Profiel"
                            />
                        ) : (
                            <div className="text-black">
                                {type === "order" ? `ORDER #${item.id}` : "NO DATA"}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DataCard;
