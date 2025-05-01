import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import TimeBasedGreeting from "../../helpers/TimeBasedGreeting.jsx";
import axios from "axios";
import WorkingScheduler from "../../components/workingScheduler/workingScheduler.jsx";

function DashboardPage() {
    const { isAuth, user, token } = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchEmployees() {
            try {
                const response = await axios.get("http://localhost:8080/api/employees/all", {
                    signal: controller.signal,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployees(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request canceled:", err.message);
                } else {
                    console.error(err);
                    setError("Kon medewerkers niet ophalen.");
                }
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            fetchEmployees();
        }

        return () => {
            controller.abort();
        };
    }, [token]);

    if (!user) {
        return <p>Gebruikersgegevens worden geladen...</p>;
    }

    return (
        <>
            <NavBar />
            <h1>Dashboard</h1>
            <p>
                {TimeBasedGreeting()}, welcome to your dashboard{" "}
                {isAuth ? (user.firstName ? user.firstName : user.email) : null}!
            </p>

            <h2>Employee List</h2>

            {loading && <p>Loading employees...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && employees.length > 0 ? (
                <ul>
                    {employees.map((employee) => (
                        <li key={employee.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                  {/*          <div onClick={() => handleEmployeeClick(employee.id)} style={{ cursor: 'pointer' }}>*/}
                                <p><strong>Naam:</strong> {employee.firstName} {employee.lastName}</p>
                                <p><strong>Email:</strong> {employee.email}</p>
                                <p><strong>Geboortedatum:</strong> {employee.dateOfBirth}</p>
                                <p><strong>Telefoon:</strong> {employee.phoneNumber}</p>
                                <p><strong>Geslacht:</strong> {employee.gender}</p>
                            <p><strong>Orders:</strong></p>
                            <ul>{employee.qualifiedOrderIds?.map((orderId, index) => (
                                    <li key={index}>{orderId}</li>
                                ))}</ul>
                            <p><strong>Werkrooster:</strong></p>
                            <WorkingScheduler schedule={employee.workingSchedule} />
                            {/*</div>*/}
                            {/*<button onClick={() => handleUpdate(employee.id)}>Update</button>
                            <button onClick={() => handleDelete(employee.id)}>Delete</button>*/}
                        </li>
                    ))}
                </ul>
            ) : null}

            {!loading && !error && employees.length === 0 && (
                <p>Geen medewerkers gevonden.</p>
            )}
        </>
    );
}

export default DashboardPage;
