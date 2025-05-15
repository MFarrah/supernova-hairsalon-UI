import React from "react";
import WorkingScheduler from "../workingScheduler/workingScheduler.jsx";
import "./EmployeeTileList.css";

function EmployeeTileList({ employees }) {
    if (!employees || employees.length === 0) {
        return <p>Geen medewerkers gevonden.</p>;
    }

    return (
        <div className="employee-tile-list">
            {employees.map((employee) => (
                <div className="employee-tile" key={employee.id}>
                    <div className="tile-front">
                        <p><strong>Naam:</strong> {employee.firstName} {employee.lastName}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Geboortedatum:</strong> {employee.dateOfBirth}</p>
                        <p><strong>Telefoon:</strong> {employee.phoneNumber}</p>
                        <p><strong>Geslacht:</strong> {employee.gender}</p>
                        <p><strong>Orders:</strong></p>
                        <ul>
                            {employee.qualifiedOrderIds?.length > 0 ? (
                                employee.qualifiedOrderIds.map((orderId, index) => (
                                    <li key={index}>{orderId}</li>
                                ))
                            ) : (
                                <li>Geen</li>
                            )}
                        </ul>
                        <p><strong>Werkrooster:</strong></p>
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
