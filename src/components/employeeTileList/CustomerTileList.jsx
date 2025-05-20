import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeTileList.css"; // Hergebruikt de styling

function CustomerTileList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/customers/all", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCustomers(response.data);
            } catch (error) {
                console.error("Fout bij ophalen van klanten:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) return <p>Bezig met laden...</p>;
    if (!customers || customers.length === 0) return <p>Geen klanten gevonden.</p>;

    return (
        <div className="employee-tile-list">
            {customers.map((customer) => (
                <div className="employee-tile" key={customer.customerId}>
                    <div className="tile-front">
                        <p><strong>Naam:</strong> {customer.firstName} {customer.lastName}</p>
                        <p><strong>Email:</strong> {customer.email}</p>
                        <p><strong>Geboortedatum:</strong> {customer.dateOfBirth}</p>
                        <p><strong>Telefoon:</strong> {customer.phoneNumber}</p>
                        <p><strong>Geslacht:</strong> {customer.gender}</p>
                    </div>

                    <div className="tile-back">
                        {customer.profileImageUrl ? (
                            <img
                                src={`http://localhost:8080${customer.profileImageUrl}`}
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

export default CustomerTileList;
