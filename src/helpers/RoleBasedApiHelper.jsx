import axios from "axios";

export default class RoleBasedApiHelper {
    static getEndpointByRole(role) {
        switch (role) {
            case "ROLE_ADMIN":
                return "api/admins";
            case "ROLE_EMPLOYEE":
                return "api/employees";
            case "ROLE_CUSTOMER":
                return "api/customers";
            default:
                throw new Error(`Onbekende rol: ${role}`);
        }
    }

    static async fetchUserData(jwtToken, decodedToken) {
        const baseUrl = "http://localhost:8080";
        const userId = decodedToken.sub;

        // ✅ Vereist: roles als array met minstens 1 waarde
        if (!Array.isArray(decodedToken.roles) || decodedToken.roles.length === 0) {
            throw new Error("JWT bevat geen geldige roles array.");
        }

        const role = decodedToken.roles[0]; // neem altijd eerste rol
        const endpoint = this.getEndpointByRole(role);

        const response = await axios.get(`${baseUrl}/${endpoint}/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`
            }
        });

        return {
            ...response.data,
            role
        };
    }
}
