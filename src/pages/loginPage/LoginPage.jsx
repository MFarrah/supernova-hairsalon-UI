import InputField from "../../components/inputField/inputField.jsx";
import {useContext, useState} from "react";
import NavBar from "../../components/navBar/NavBar.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";
import "./LoginPage.css";
import { useForm } from "react-hook-form";


function LoginPage() {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   const onSubmit = (data) => {
        console.log(data);
   }
    const {language} = useContext(LanguageContext);
    const {title, emailTitle, passwordTitle} = languageContent[language].loginpage;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    return (
        <>
            <NavBar/>
            <h1>{title}</h1>
            <p>{emailTitle}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
            inputType= "email"
            inputId="email"
            inputName="email"
            placeholder={emailTitle.toLowerCase()}
            register={register}
            validationRules={{required: "Email is required"}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <p>{passwordTitle}</p>

                <InputField
                    inputType="password"
                    inputId="password"
                    inputName="password"
                    placeholder={passwordTitle.toLowerCase()}
                    register={register}
                    validationRules={{required: "Password is required"}}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

            {errors.email && <p>{errors.email.message}</p>}
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit">Submit</button>
        </form>
        </>
    );
}

export default LoginPage;