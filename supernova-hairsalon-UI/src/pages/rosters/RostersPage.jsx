import { Route, Routes } from "react-router-dom";
import DataCard from "../../components/DataCards/DataCard.jsx";
import RosterService from "../../services/rosters/RosterService.jsx";
import rosterFields from "../../config/ResponseFields/rosterFields.jsx";
import React from "react";

const RostersPage = () => {
    return (
        <div className="dashboard-container">
            <Routes>
                <Route path="rosters" element={<DataCard service={RosterService.getAllRosters} fields={rosterFields} type="roster"/>}/>
            </Routes>
        </div>
    );
};

export default RostersPage;
