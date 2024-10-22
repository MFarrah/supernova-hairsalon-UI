const employeeFields = [
    { label: 'Employee ID', key: 'employeeId' },
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Date of Birth', key: 'dateOfBirth' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Gender', key: 'gender' },
    {
        label: 'Roles',
        key: 'roles',
        render: (roles) => roles.map(role => role.name).join(', ')
    },
    {
        label: 'Qualified Orders',
        key: 'qualifiedOrderIds',
        render: (ids) => ids.join(', ')
    },
    {
        label: 'Working Schedule',
        key: 'workingSchedule',
        render: (schedule) => schedule.map(slot => `${slot.dayOfWeek}: ${slot.startTime} - ${slot.endTime}`).join(', ')
    }
];

export default employeeFields;
