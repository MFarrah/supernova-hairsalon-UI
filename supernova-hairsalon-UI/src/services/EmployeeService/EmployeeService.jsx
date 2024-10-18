
export const fetchAllEmployees = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/employees/all'); // replace with your API endpoint
        if (!response.ok) {
            throw new Error('Network error!');
        }
        const employees = await response.json();
        return employees.map(employee => ({
            id: employee.employeeId,  // Mapping van 'employeeId'
            name: `${employee.firstName} ${employee.lastName}`,  // Samenvoegen van 'firstName' en 'lastName'
            birthDate: employee.dateOfBirth,  // Mapping van 'dateOfBirth'
            email: employee.email,  // Mapping van 'email'
            phone: employee.phoneNumber,  // Mapping van 'phoneNumber'
            gender: employee.gender,  // Mapping van 'gender'
            roles: employee.roles,  // Mapping van 'roles'
            schedule: employee.workingSchedule.map(schedule => ({  // Mapping van 'workingSchedule'
                day: schedule.dayOfWeek,
                start: schedule.startTime,
                end: schedule.endTime
            }))
        }));
    } catch (error) {
        console.error('Something went wrong:', error);
        return [];
    }
};