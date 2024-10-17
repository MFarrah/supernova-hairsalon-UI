import React, { useState, useEffect } from 'react';
import './AgendaComponent.css'; // Specifieke CSS voor dit component

const AgendaComponent = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [skills, setSkills] = useState([]); // Indien nodig voor vaardigheden
    const [error, setError] = useState('');

    // Haal token op uit localStorage
    const token = localStorage.getItem('token');

    // Haal medewerkers op bij component mount
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/employees`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => {
                console.error('Error fetching employees:', error);
                setError('Fout bij het ophalen van medewerkers');
            });
    }, [token]);

    // Haal beschikbare tijdsloten op wanneer datum en medewerker zijn geselecteerd
    useEffect(() => {
        if (selectedDate && selectedEmployee) {
            fetch(`${import.meta.env.VITE_API_URL}/api/timeslots?date=${selectedDate}&employee=${selectedEmployee}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => setAvailableTimeSlots(data))
                .catch(error => {
                    console.error('Error fetching timeslots:', error);
                    setError('Fout bij het ophalen van tijdsloten');
                });
        }
    }, [selectedDate, selectedEmployee, token]);

    // Functie om de afspraak te boeken
    const handleBooking = () => {
        const bookingData = {
            date: selectedDate,
            timeSlot: selectedTimeSlot,
            employeeId: selectedEmployee,
        };

        fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Voeg de token toe aan de headers
            },
            body: JSON.stringify(bookingData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fout bij het boeken van de afspraak');
                }
                return response.json();
            })
            .then(data => {
                alert('Afspraak succesvol geboekt!');
                // Eventueel resetten van de velden na succesvolle booking
                setSelectedDate('');
                setSelectedTimeSlot('');
                setSelectedEmployee('');
                setAvailableTimeSlots([]);
            })
            .catch(error => {
                console.error(error);
                setError('Fout bij het boeken van de afspraak');
            });
    };

    return (
        <div className="agenda-container">
            <h2>Maak een nieuwe afspraak</h2>

            {error && <p className="input-error">{error}</p>}

            {/* DatePicker voor datumselectie */}
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-field"
                required
            />

            {/* Dropdown voor medewerker selectie */}
            <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="input-field"
                required
            >
                <option value="">Selecteer een medewerker</option>
                {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                        {emp.name} (Vaardigheden: {emp.skills.join(', ')})
                    </option>
                ))}
            </select>

            {/* Dropdown voor beschikbare tijdsloten */}
            {selectedDate && selectedEmployee && (
                <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="input-field"
                    required
                >
                    <option value="">Selecteer een tijdslot</option>
                    {availableTimeSlots.map(slot => (
                        <option key={slot.id} value={slot.id}>
                            {slot.time} ({slot.available ? 'Beschikbaar' : 'Niet beschikbaar'})
                        </option>
                    ))}
                </select>
            )}

            {/* Bevestigingsknop */}
            <button onClick={handleBooking} className="button" disabled={!selectedTimeSlot}>
                Bevestig afspraak
            </button>
        </div>
    );
};

export default AgendaComponent;
