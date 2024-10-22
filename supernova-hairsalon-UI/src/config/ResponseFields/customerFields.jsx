const customerFields = [
    { label: 'Customer ID', key: 'id' },
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
    }
];

export default customerFields;
