import React from 'react';
import RosterService from '/src/services/rosters/RosterService.jsx';
import rosterFields from '/src/config/ResponseFields/rosterFields.jsx';
import DataCard from '../DataCard.jsx';

const RosterDataCards = () => {
    return (
        <DataCard
            service={RosterService.getAllRosters}  // Haalt alle rosters op
            fields={rosterFields}  // Geeft de velden voor een rooster weer
            type="roster"  // Specificeert dat het om roster-data gaat
        />
    );
};

export default RosterDataCards;
