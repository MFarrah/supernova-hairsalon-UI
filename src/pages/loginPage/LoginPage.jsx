import InputField from "../../components/inputField/inputField.jsx";
import {useState} from "react";
import NavBar from "../../components/navBar/NavBar.jsx";


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <NavBar/>
            <InputField label="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <InputField label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </>
    );
}

export default LoginPage;