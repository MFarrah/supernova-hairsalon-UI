import InputField from "../../components/inputField/inputField.jsx";
import {useContext, useState} from "react";
import NavBar from "../../components/navBar/NavBar.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";
import "./LoginPage.css";
import {useForm} from "react-hook-form";


function LoginPage() {


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const {language} = useContext(LanguageContext);

    const {title, emailTitle, passwordTitle} = languageContent[language].loginpage;

    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <>
            <NavBar/>
            <h1>{title}</h1>
            <p>{emailTitle}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    inputType="email"
                    inputId="email"
                    inputName="email"
                    placeholder={emailTitle.toLowerCase()}
                    register={register}
                    validationRules={{required: "Email is required"}}
                />
                <p>{passwordTitle}</p>

                <InputField
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

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default LoginPage;