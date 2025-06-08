
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

function EmployeeImageManager() {
    const { token } = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/employees/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployees(response.data);
            } catch (err) {
                console.error("Fout bij ophalen van medewerkers:", err);
            }
        };

        fetchEmployees();
    }, [token]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !selectedEmployeeId) {
            console.error("Bestand of medewerker niet geselecteerd");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                `http://localhost:8080/api/employees/${selectedEmployeeId}/upload-image`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setImageUrl(response.data);
        } catch (error) {
            console.error("Upload mislukt:", error);
        }
    };

    return (
        <div style={{ marginBottom: "2rem" }}>
            <label>
                Selecteer medewerker voor profielfoto:
                <select
                    value={selectedEmployeeId}
                    onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
                >
                    <option value="">-- Kies medewerker --</option>
                    {employees.map((employee) => (
                        <option key={employee.employeeId} value={employee.employeeId}>
                            {employee.firstName} {employee.lastName}
                        </option>
                    ))}
                </select>
            </label>

            <div style={{ marginTop: "1rem" }}>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload afbeelding</button>
            </div>

            {imageUrl && (
                <div style={{ marginTop: "1rem" }}>
                    <img src={imageUrl} alt="Profiel" width={200} />
                </div>
            )}
        </div>
    );
}

export default EmployeeImageManager;
