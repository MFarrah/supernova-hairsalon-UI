const rosterFields = [
    { label: 'Roster ID', key: 'id' },
    { label: 'Employee ID', key: 'employeeId' },
    { label: 'Month', key: 'month' },
    { label: 'Year', key: 'year' },
    {
        label: 'Time Slots',
        key: 'timeSlots',
        render: (slots) => slots.map(slot => `${slot.startTime} - ${slot.endTime}`).join(', ')
    }
];

export default rosterFields;
