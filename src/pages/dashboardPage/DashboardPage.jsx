import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import TimeBasedGreeting from "../../helpers/TimeBasedGreeting.jsx";
import axios from "axios";
import WorkingScheduler from "../../components/workingScheduler/workingScheduler.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function DashboardPage() {
    const {isAuth, user, token} = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [rosterItems, setRosterItems] = useState([]);

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

    // ✅ ISO 8601-conforme weeknummer berekening
    function getISOWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    }

    const handleFetchRosters = async () => {
        if (!selectedEmployeeId || !selectedDate) return;

        const year = selectedDate.getFullYear();
        const week = getISOWeekNumber(selectedDate);

        try {
            const response = await axios.get("http://localhost:8080/api/rosters/week", {
                params: {
                    employeeId: selectedEmployeeId,
                    year: year,
                    week: week,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setRosterItems(response.data);
        } catch (error) {
            console.error("Fout bij ophalen roosters:", error);
            setRosterItems([]);
        }
    };

    if (!user) return <p>Gebruikersgegevens worden geladen...</p>;

    return (
        <>
        <NavBar/>
        <h1>Dashboard</h1>
        <p>
            {TimeBasedGreeting()} {isAuth ? (user.firstName ?? user.email) : null}, welkom op je dashboard!
        </p>


            {user.role.includes("ROLE_ADMIN") ? (
                <div>
                    <p><ul>
                        <li>Weekoverzicht van boekingen</li>
                        <li>Medewerkers die aan het werk zijn</li>
                        <li>Medewerkers met roosters</li>
                        <li>Bekijk en beheer roosters</li>
                        <li>Bekijk en beheer tijdslots</li>
                        <li>Bekijk en beheer afspraken</li>
                    </ul></p>
                    <h2>Medewerkers</h2>
                    {loading && <p>Medewerkers laden...</p>}
                    {error && <p style={{color: "red"}}>{error}</p>}
                    {!loading && !error && employees.length > 0 && (
                        <ul>
                            {employees.map((employee) => (
                                <li key={employee.id}>
                                    <p><strong>Naam:</strong> {employee.firstName} {employee.lastName}</p>
                                    <p><strong>Email:</strong> {employee.email}</p>
                                    <p><strong>Geboortedatum:</strong> {employee.dateOfBirth}</p>
                                    <p><strong>Telefoon:</strong> {employee.phoneNumber}</p>
                                    <p><strong>Geslacht:</strong> {employee.gender}</p>
                                    <p><strong>Orders:</strong></p>
                                    <ul>
                                        {employee.qualifiedOrderIds?.map((orderId, index) => (
                                            <li key={index}>{orderId}</li>
                                        ))}
                                    </ul>
                                    <p><strong>Werkrooster:</strong></p>
                                    <WorkingScheduler schedule={employee.workingSchedule} />
                                </li>
                            ))}
                        </ul>
                    )}
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
                    <label>
                        Selecteer medewerker:
                        <select value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)}>
                            <option value="">-- Kies medewerker --</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label style={{marginLeft: "20px"}}>
                        Kies datum:
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </label>

                    <p style={{marginTop: "10px"}}>
                        Gekozen jaar: <strong>{selectedDate.getFullYear()}</strong> |
                        Weeknummer: <strong>{getISOWeekNumber(selectedDate)}</strong>
                    </p>

                    <button onClick={handleFetchRosters} style={{marginTop: "10px"}}>
                        Ophalen rooster
                    </button>

                    <div>
                        <h2>Werkrooster Tijdslots</h2>
                        {rosterItems.length > 0 ? (
                            Object.entries(
                                rosterItems.reduce((acc, slot) => {
                                    if (!acc[slot.date]) acc[slot.date] = [];
                                    acc[slot.date].push(slot);
                                    return acc;
                                }, {})
                            ).map(([date, slots]) => (
                                <div key={date}>
                                    <h3>{date}</h3>
                                    <ul>
                                        {slots.map((slot) => (
                                            <li key={slot.timeSlotId}>
                                                {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)} | {slot.status}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>Geen tijdslots beschikbaar voor deze selectie.</p>
                        )}
                    </div>
                </div>
            ) : user.role.includes("ROLE_CUSTOMER") ? (
                <>
                <p>
                    <ul>
                        <li>Bekijk je afspraken</li>
                        <li>Plan afspraak</li>
                        <li>Bekijk medewerkers</li>
                    </ul>
                </p>
                <p>Welcome, Customer! Manage your appointments and profile here.</p>
                </>
            ) : (
                <p>Access denied. You do not have permission to view this content.</p>
            )}



</>
)
    ;
}

export default DashboardPage;
