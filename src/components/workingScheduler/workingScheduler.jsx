import React from "react";
import PropTypes from "prop-types";
import "./WorkingScheduler.css";

/**
 * Toont een vast werkrooster van maandag t/m zondag.
 *
 * @component
 * @param {Object[]} schedule - Lijst van roosterregels per dag.
 * @param {string} schedule[].dayOfWeek - Naam van de dag (in hoofdletters).
 * @param {string} schedule[].startTime - Starttijd van de werkdag.
 * @param {string} schedule[].endTime - Eindtijd van de werkdag.
 * @returns {JSX.Element} Compacte agendaweergave.
 */
function WorkingScheduler({ schedule }) {
    const daysOfWeek = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
    ];

    const scheduleMap = schedule?.reduce((acc, item) => {
        acc[item.dayOfWeek.toUpperCase()] = item;
        return acc;
    }, {}) || {};

    return (
        <div className="working-scheduler">
            <p className="working-scheduler__title">Werkrooster:</p>
            <table className="working-scheduler__table">
                <thead>
                <tr>
                    <th>Dag</th>
                    <th>Van</th>
                    <th>Tot</th>
                </tr>
                </thead>
                <tbody>
                {daysOfWeek.map((day) => {
                    const entry = scheduleMap[day];
                    return (
                        <tr key={day}>
                            <td>{translateDay(day)}</td>
                            <td>{entry?.startTime || "-"}</td>
                            <td>{entry?.endTime || "-"}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

function translateDay(day) {
    const translations = {
        MONDAY: "Maandag",
        TUESDAY: "Dinsdag",
        WEDNESDAY: "Woensdag",
        THURSDAY: "Donderdag",
        FRIDAY: "Vrijdag",
        SATURDAY: "Zaterdag",
        SUNDAY: "Zondag",
    };
    return translations[day] || day;
}

WorkingScheduler.propTypes = {
    schedule: PropTypes.arrayOf(
        PropTypes.shape({
            dayOfWeek: PropTypes.string.isRequired,
            startTime: PropTypes.string.isRequired,
            endTime: PropTypes.string.isRequired,
        })
    ),
};

export default WorkingScheduler;
