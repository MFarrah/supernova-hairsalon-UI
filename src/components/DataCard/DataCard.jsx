// src/components/DataCard/DataCard.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import WorkingScheduler from "../workingScheduler/workingScheduler.jsx";
import { Pencil, Trash2, Save, X } from "lucide-react";
import "./DataCard.css";

function DataCard({ type }) {
    const { token } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [ordersByEmployee, setOrdersByEmployee] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editedData, setEditedData] = useState({});

    const endpoints = {
        employee: "http://localhost:8080/api/employees",
        customer: "http://localhost:8080/api/customers",
        order: "http://localhost:8080/api/orders",
    };

    const getId = (item) => item.employeeId || item.customerId || item.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${endpoints[type]}/all`, {
                    headers: { Authorization: `Bearer ${token}` },
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

    const handleEdit = (item) => {
        setEditingId(getId(item));
        setEditedData({ ...item });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedData({});
    };

    const handleChange = (field, value) => {
        setEditedData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`${endpoints[type]}/${id}`, editedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingId(null);
            setEditedData({});
            const refreshed = await axios.get(`${endpoints[type]}/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(refreshed.data);
        } catch (err) {
            console.error("Fout bij opslaan:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${endpoints[type]}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems((prev) => prev.filter((i) => getId(i) !== id));
        } catch (err) {
            console.error("Fout bij verwijderen:", err);
        }
    };

    if (loading) return <p>{type}s laden...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (items.length === 0) return <p>Geen {type}s gevonden.</p>;

    return (
        <div className="employee-tile-list">
            {items.map((item) => {
                const id = getId(item);
                const isEditing = editingId === id;
                const data = isEditing ? editedData : item;

                return (
                    <div className="employee-tile" key={id}>
                        {item.profileImageUrl && (
                            <img
                                src={`http://localhost:8080${item.profileImageUrl}`}
                                alt="Profiel"
                                className="profile-img"
                            />
                        )}
                        <div className="tile-front">
                            {type === "order" ? (
                                <>
                                    <p><strong>Beschrijving:</strong>{" "}
                                        {isEditing ? (
                                            <input value={data.description} onChange={(e) => handleChange("description", e.target.value)} />
                                        ) : data.description}
                                    </p>
                                    <p><strong>Duur:</strong>{" "}
                                        {isEditing ? (
                                            <input type="number" value={data.duration} onChange={(e) => handleChange("duration", e.target.value)} />
                                        ) : `${data.duration} minuten`}
                                    </p>
                                    <p><strong>Prijs:</strong>{" "}
                                        {isEditing ? (
                                            <input type="number" value={data.price} onChange={(e) => handleChange("price", e.target.value)} />
                                        ) : `€ ${data.price}`}
                                    </p>
                                    <p><strong>Categorie:</strong>{" "}
                                        {isEditing ? (
                                            <input value={data.category} onChange={(e) => handleChange("category", e.target.value)} />
                                        ) : data.category}
                                    </p>
                                    <p><strong>Actief:</strong>{" "}
                                        {isEditing ? (
                                            <select value={data.active} onChange={(e) => handleChange("active", e.target.value === "true")}>
                                                <option value="true">Ja</option>
                                                <option value="false">Nee</option>
                                            </select>
                                        ) : data.active ? "Ja" : "Nee"}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p><strong>Naam:</strong>{" "}
                                        {isEditing ? (
                                            <>
                                                <input value={data.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
                                                <input value={data.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
                                            </>
                                        ) : `${data.firstName} ${data.lastName}`}
                                    </p>
                                    <p><strong>Email:</strong>{" "}
                                        {isEditing ? (
                                            <input value={data.email} onChange={(e) => handleChange("email", e.target.value)} />
                                        ) : data.email}
                                    </p>
                                    <p><strong>Geboortedatum:</strong>{" "}
                                        {isEditing ? (
                                            <input value={data.dateOfBirth} onChange={(e) => handleChange("dateOfBirth", e.target.value)} />
                                        ) : data.dateOfBirth}
                                    </p>
                                    <p><strong>Telefoon:</strong>{" "}
                                        {isEditing ? (
                                            <input value={data.phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} />
                                        ) : data.phoneNumber}
                                    </p>
                                    <p><strong>Geslacht:</strong>{" "}
                                        {isEditing ? (
                                            <input value={data.gender} onChange={(e) => handleChange("gender", e.target.value)} />
                                        ) : data.gender}
                                    </p>

                                    {type === "employee" && (
                                        <>
                                            <p><strong>Vaardigheden:</strong></p>
                                            {ordersByEmployee[item.employeeId]?.length > 0 ? (
                                                <ul>
                                                    {ordersByEmployee[item.employeeId].map((order) => (
                                                        <li key={order.id}>{order.description}</li>
                                                    ))}
                                                </ul>
                                            ) : <p>Geen orders gevonden.</p>}
                                            <p><strong>Beschikbaarheid:</strong></p>
                                            <WorkingScheduler schedule={data.workingSchedule} />
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="icon-bar bottom">
                            {isEditing ? (
                                <>
                                    <Save onClick={() => handleSave(id)} className="icon" />
                                    <X onClick={handleCancel} className="icon" />
                                </>
                            ) : (
                                <>
                                    <Pencil onClick={() => handleEdit(item)} className="icon" />
                                    <Trash2 onClick={() => handleDelete(id)} className="icon" />
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default DataCard;
