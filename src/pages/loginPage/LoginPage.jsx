import InputField from "../../components/inputField/inputField.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar.jsx";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();
    const { title, emailTitle, passwordTitle, submitButton, noAccountTitle } = languageContent[language].loginpage;

    const [loginError, setLoginError] = useState("");

    const handleLogin = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: data.email,
                password: data.password,
            });
            login(response.data.token);
            console.log("loginpage : Login successful");
            navigate("/DashboardPage");
        } catch (e) {
            console.error(e);
            setLoginError(e.response?.data?.message || "An error occurred during login.");
        }
    };

    return (
        <>
            <NavBar />
            <h1>{title}</h1>
            <form className="form-container" onSubmit={handleSubmit(handleLogin)}>
                <p>{emailTitle}</p>
                <InputField
                    key="email"
                    inputType="email"
                    inputId="email"
                    inputName="email"
                    placeholder={emailTitle.toLowerCase()}
                    register={register}
                    validationRules={{ required: "Email is required" }}
                />
                <p>{passwordTitle}</p>
                <InputField
                    key="password"
                    inputType="password"
                    inputId="password"
                    inputName="password"
                    placeholder={passwordTitle.toLowerCase()}
                    register={register}
                    validationRules={{
                        required: "Password is required",
                        minLength: {
                            value: 4,
                            message: "Password must have at least 4 characters"
                        }
                    }}
                />
                {errors.email && <p>{errors.email.message}</p>}
                {errors.password && <p>{errors.password.message}</p>}
                {loginError && <p className="error-message">{loginError}</p>}
                <Button className="btn-primary" type="submit" id="submitBtn"><p>{submitButton}</p></Button>
                <Link to={"/RegistrationPage"}>{noAccountTitle}</Link>
            </form>
        </>
    );
}

export default LoginPage;