import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TileList.css"; // Reuse styles

function OrderTileList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/orders/all", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setOrders(response.data);
            } catch (err) {
                setError("Fout bij het laden van orders.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Orders laden...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (orders.length === 0) return <p>Geen orders gevonden.</p>;

    return (
        <div className="employee-tile-list">
            {orders.map((order) => (
                <div className="employee-tile" key={order.id}>
                    <div className="tile-front">
                        <p><strong>Beschrijving:</strong> {order.description}</p>
                        <p><strong>Duur:</strong> {order.duration} minuten</p>
                        <p><strong>Prijs:</strong> € {order.price}</p>
                        <p><strong>Categorie:</strong> {order.category}</p>
                        <p><strong>Actief:</strong> {order.active ? "Ja" : "Nee"}</p>
                    </div>

                    <div className="tile-back">
                        <div className="text-black">ORDER #{order.id}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderTileList;
