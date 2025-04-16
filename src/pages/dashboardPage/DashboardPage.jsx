import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import TimeBasedGreeting from "../../helpers/TimeBasedGreeting.jsx";

function DashboardPage() {
    const { isAuth, user } = useContext(AuthContext);

    if (!user) {
        return <p>Gebruikersgegevens worden geladen...</p>; // of een spinner
    }
    return (
        <>
            <NavBar />
            <h1>Dashboard</h1>
            <p>{TimeBasedGreeting()}  {isAuth ? (user.firstName ? user.firstName : user.email) : null}, welcome to your dashboard!</p>
        </>
    );
}

export default DashboardPage;