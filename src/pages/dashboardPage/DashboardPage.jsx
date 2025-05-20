import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import TimeBasedGreeting from "../../helpers/TimeBasedGreeting.jsx";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import ProfileImageUploader from "../../components/ProfileImageUploader/ProfileImageUploader.jsx";
import EmployeeTileList from "../../components/employeeTileList/EmployeeTileList.jsx";
import CustomerTileList from "../../components/employeeTileList/CustomerTileList.jsx";

function DashboardPage() {
    const {isAuth, user, token} = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/customers/all", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCustomers(response.data);
            } catch (err) {
                setError("Fout bij het laden van klanten.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

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
                if (!axios.isCancel(err)) {
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

        return () => controller.abort();
    }, [token]);




    if (!user) return <p>Gebruikersgegevens worden geladen...</p>;

    return (
        <>
            <NavBar />
            <h1>Dashboard</h1>
            <p>
                {TimeBasedGreeting()} {isAuth ? (user.firstName ?? user.email) : null}, welkom op je dashboard!
            </p>

            {user.role.includes("ROLE_ADMIN") ? (
                <div>

                    <p>
                        <ul>
                            <li>Weekoverzicht van boekingen</li>
                            <li>Medewerkers die aan het werk zijn</li>
                            <li>Medewerkers met roosters</li>
                            <li>Bekijk en beheer roosters</li>
                            <li>Bekijk en beheer tijdslots</li>
                            <li>Bekijk en beheer afspraken</li>
                            <label>
                                Selecteer medewerker voor profielfoto:
                                <select
                                    value={selectedEmployeeId}
                                    onChange={(e) => setSelectedEmployeeId(Number(e.target.value))} // cast expliciet
                                >

                                <option value="">-- Kies medewerker --</option>
                                    {employees.map((employee) => (
                                        <option key={employee.employeeId} value={employee.employeeId}>
                                            {employee.firstName} {employee.lastName}
                                        </option>

                                    ))}
                                </select>
                            </label>
                            {selectedEmployeeId && (
                                <ProfileImageUploader employeeId={selectedEmployeeId} />
                            )}

                        </ul>
                    </p>
                    <h2>Medewerkers</h2>
                    {loading && <p>Medewerkers laden...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!loading && !error && employees.length > 0 && (
                        <EmployeeTileList employees={employees} />
                    )}

                    {employees.length === 0 && <p>Geen medewerkers gevonden.</p>}
                    <h2>Klanten</h2>
                    {loading && <p>Klanten laden...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!loading && !error && customers.length > 0 && (
                        <CustomerTileList customers={customers} />
                    )}
                    {!loading && !error && customers.length === 0 && <p>Geen klanten gevonden.</p>}



                </div>
            ) : user.role.includes("ROLE_EMPLOYEE") ? (
                <div>
                    <p>
                        <ul>
                            <li>Bekijk je rooster</li>
                            <li>Bekijk klanten</li>
                            <li>Bekijk je afspraken</li>
                            <li>Plan afspraak</li>
                        </ul>
                    </p>
                </div>
            ) : user.role.includes("ROLE_CUSTOMER") ? (
                <div>
                    <p>
                        <ul>
                            <li>Bekijk je afspraken</li>
                            <li>Plan afspraak</li>
                            <li>Bekijk medewerkers</li>
                        </ul>
                    </p>
                    <p>Welcome, Customer! Manage your appointments and profile here.</p>
                </div>
            ) : (
                <div>
                    <p>Access denied. You do not have permission to view this content.</p>
                </div>
            )}
        </>
    );
}

export default DashboardPage;