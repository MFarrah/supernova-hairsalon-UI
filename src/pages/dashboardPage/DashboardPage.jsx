import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";


function DashboardPage() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <p>Gebruikersgegevens worden geladen...</p>; // of een spinner
    }
    return (
        <>
            <NavBar/>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard {user.email}!</p>
        </>
    );
}

export default DashboardPage;