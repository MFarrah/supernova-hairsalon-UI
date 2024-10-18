import React from 'react';
import EmployeeDataCards from "../DataCardsComponent/EmployeeDataCards.jsx";

const EmployeesComponent = () => {
    return (
        <div>
            <h2>Employees</h2>
            <p>Hier komt een component met employee kaarten</p>
            <p>Elke kaart is een employee profiel en kan worden aangepast of verwijderd worden</p>
            <p>de laatste kaart is een kaart met een plusje, hier kan een nieuwe employee worden aangemaakt</p>
        <EmployeeDataCards />
        </div>
    );
};

export default EmployeesComponent;
