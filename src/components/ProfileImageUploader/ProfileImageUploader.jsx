import React, { useState } from "react";
import axios from "axios";

function ProfileImageUploader({ employeeId }) {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            console.error("No file selected");
            return;
        }

        if (!employeeId || isNaN(employeeId)) {
            console.error("Invalid employeeId:", employeeId);
            return;
        }


        if (!employeeId) {
            console.error("Invalid employeeId");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                `http://localhost:8080/api/employees/${employeeId}/upload-image`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setImageUrl(response.data);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload afbeelding</button>
        </div>
    );
}

export default ProfileImageUploader;
