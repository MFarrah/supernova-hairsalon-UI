import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RosterViewer({ employeeId, year, month }) {
    const [timeSlots, setTimeSlots] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [weekOffset, setWeekOffset] = useState(0);

    useEffect(() => {
        const fetchTimeSlots = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:8080/api/rosters/month', {
                    employeeId,
                    year,
                    month
                });
                setTimeSlots(response.data);
                setError(null);
            } catch (err) {
                setError('Fout bij ophalen van tijdsloten.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTimeSlots();
    }, [employeeId, year, month]);

    const getCurrentWeekDates = () => {
        const now = new Date(year, month - 1);
        now.setDate(now.getDate() + weekOffset * 7);
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(now);
            d.setDate(d.getDate() + i);
            dates.push(d);
        }
        return dates;
    };

    const currentWeekDates = getCurrentWeekDates();
    const timeBlocks = generateTimeBlocks();

    const filteredSlots = currentWeekDates.reduce((acc, date) => {
        const dayStr = date.toISOString().split('T')[0];
        acc[dayStr] = timeSlots.filter(slot => slot.date === dayStr);
        return acc;
    }, {});

    return (
        <div>
            <div>
                <button onClick={() => setWeekOffset(weekOffset - 1)}>Vorige week</button>
                <button onClick={() => setWeekOffset(weekOffset + 1)}>Volgende week</button>
            </div>
            {loading && <p>Laden...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <table>
                    <thead>
                    <tr>
                        <th>Tijd</th>
                        {currentWeekDates.map((d, i) => (
                            <th key={i}>
                                {d.toLocaleDateString('nl-NL', { weekday: 'long' })}<br />
                                {d.toLocaleDateString()}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {timeBlocks.map((time, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{time}</td>
                            {currentWeekDates.map((date, colIndex) => {
                                const dayStr = date.toISOString().split('T')[0];
                                const slot = filteredSlots[dayStr]?.find(
                                    s => s.startTime.slice(0, 5) === time
                                );
                                return (
                                    <td key={colIndex}>
                                        {slot ? slot.status : ''}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

// Helper functie
function generateTimeBlocks(start = '09:00', end = '21:00', interval = 15) {
    const result = [];
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const d = new Date();
    d.setHours(sh, sm, 0, 0);
    const endDate = new Date();
    endDate.setHours(eh, em, 0, 0);

    while (d <= endDate) {
        result.push(d.toTimeString().slice(0, 5));
        d.setMinutes(d.getMinutes() + interval);
    }
    return result;
}

export default RosterViewer;
