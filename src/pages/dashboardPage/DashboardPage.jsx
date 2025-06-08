import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import TimeBasedGreeting from "../../helpers/TimeBasedGreeting.jsx";
import "react-datepicker/dist/react-datepicker.css";
import DataCard from "../../components/DataCard/DataCard.jsx";
import EmployeeImageManager from "../../components/EmployeeImageManager/EmployeeImageManager.jsx";

function DashboardPage() {
    const { isAuth, user } = useContext(AuthContext);

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
                    <ul>
                        <li>Weekoverzicht van boekingen</li>
                        <li>Medewerkers die aan het werk zijn</li>
                        <li>Medewerkers met roosters</li>
                        <li>Bekijk en beheer roosters</li>
                        <li>Bekijk en beheer tijdslots</li>
                        <li>Bekijk en beheer afspraken</li>
                    </ul>

                    <EmployeeImageManager />

                    <h2>Medewerkers</h2>
                    <DataCard type="employee" />

                    <h2>Klanten</h2>
                    <DataCard type="customer" />

                    <h2>Orders</h2>
                    <DataCard type="order" />
                </div>
            ) : user.role.includes("ROLE_EMPLOYEE") ? (
                <div>
                    <ul>
                        <li>Bekijk je rooster</li>
                        <li>Bekijk je klanten</li>
                        <li>Bekijk je afspraken</li>
                        <li>Plan afspraak</li>
                    </ul>
                </div>
            ) : user.role.includes("ROLE_CUSTOMER") ? (
                <div>
                    <ul>
                        <li>Bekijk je afspraken</li>
                        <li>Plan afspraak</li>
                        <li>Bekijk medewerkers</li>
                    </ul>
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
