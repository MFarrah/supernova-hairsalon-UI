const bookingFields = [
    { label: 'Booking ID', key: 'bookingId' },
    { label: 'Customer ID', key: 'customerId' },
    { label: 'Employee ID', key: 'employeeId' },
    { label: 'Date', key: 'date' },
    { label: 'Start Time', key: 'startTime' },
    { label: 'End Time', key: 'endTime' },
    { label: 'Total Cost', key: 'totalCost' },
    { label: 'Estimated Duration', key: 'estimatedDuration' },
    { label: 'Notes', key: 'notes' },
    { label: 'Status', key: 'status' },
    {
        label: 'Orders',
        key: 'orders',
        render: (orders) => orders.map(order => `${order.description} (${order.price})`).join(', ')
    },
    {
        label: 'Time Slots',
        key: 'timeSlots',
        render: (timeSlots) => timeSlots.map(slot => `${slot.startTime} - ${slot.endTime}`).join(', ')
    }
];

export default bookingFields;
