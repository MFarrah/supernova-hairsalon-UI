import React from 'react';

const RosterComponent = () => {
    return (
        <div>
            <h2>Roster</h2>
            <p>Hier komt een component met rooster kaarten</p>
            <p>Elke kaart is een  rooster en kan worden aangepast of verwijderd worden, max 1 rooster per employee per maand</p>
            <p>tegen het eind van de maand moet er een herrinnering komen dat er geen nieuw rooster voor employee is</p>
            <p>de laatste kaart is een kaart met een plusje, hier kan een nieuw rooster voor een werknemer gegenereerd worden</p>
        </div>
    );
};

export default RosterComponent;
