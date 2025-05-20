import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkingScheduler from "../workingScheduler/workingScheduler.jsx";
import "./EmployeeTileList.css";

function EmployeeTileList({ employees }) {
    const [ordersByEmployee, setOrdersByEmployee] = useState({});

    useEffect(() => {
        const fetchOrdersForAllEmployees = async () => {
            const requests = employees.map(async (employee) => {
                if (employee.qualifiedOrderIds?.length > 0) {
                    try {
                        const response = await axios.post(
                            "http://localhost:8080/api/orders/ids",
                            employee.qualifiedOrderIds,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                            }
                        );
                        return { employeeId: employee.employeeId, orders: response.data };
                    } catch (error) {
                        console.error(`Fout bij ophalen van orders voor medewerker ${employee.id}`, error);
                        return { employeeId: employee.id, orders: [] };
                    }
                } else {
                    return { employeeId: employee.employeeId, orders: [] };
                }
            });

            const responses = await Promise.all(requests);
            const resultMap = {};
            responses.forEach(({ employeeId, orders }) => {
                resultMap[employeeId] = orders;
            });
            setOrdersByEmployee(resultMap);
        };

        if (employees?.length > 0) {
            fetchOrdersForAllEmployees();
        }
    }, [employees]);

    if (!employees || employees.length === 0) {
        return <p>Geen medewerkers gevonden.</p>;
    }

    return (
        <div className="employee-tile-list">
            {employees.map((employee) => (
                <div className="employee-tile" key={employee.employeeId}>
                    <div className="tile-front">
                        <p><strong>Naam:</strong> {employee.firstName} {employee.lastName}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Geboortedatum:</strong> {employee.dateOfBirth}</p>
                        <p><strong>Telefoon:</strong> {employee.phoneNumber}</p>
                        <p><strong>Geslacht:</strong> {employee.gender}</p>

                        <p><strong>Vaardigheden:</strong></p>
                        {ordersByEmployee[employee.employeeId]?.length > 0 ? (
                            <ul>
                                {ordersByEmployee[employee.employeeId].map((order) => (
                                    <li key={order.id}>
                                        <strong>{order.description}</strong>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Geen orders gevonden.</p>
                        )}

                        <p><strong>Beschikbaarheid:</strong></p>
                        <WorkingScheduler schedule={employee.workingSchedule} />
                    </div>

                    <div className="tile-back">
                        {employee.profileImageUrl ? (
                            <img
                                src={`http://localhost:8080${employee.profileImageUrl}`}
                                alt="Profiel"
                            />
                        ) : (
                            <div className="text-black"> NO DATA </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EmployeeTileList;
