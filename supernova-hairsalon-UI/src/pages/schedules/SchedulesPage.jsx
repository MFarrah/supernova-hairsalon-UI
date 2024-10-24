import { Route, Routes } from "react-router-dom";
import DataCard from "../../components/DataCards/DataCard.jsx";
import ScheduleService from "../../services/schedules/ScheduleService.jsx";
import scheduleFields from "../../config/ResponseFields/scheduleFields.jsx";
import React from "react";

const SchedulesPage = () => {
    return (
        <div className="dashboard-container">
            <Routes>
                <Route path="schedules" element={<DataCard service={ScheduleService.getAllSchedules} fields={scheduleFields} type="schedule"/>}/>
            </Routes>
        </div>
    );
};

export default SchedulesPage;
