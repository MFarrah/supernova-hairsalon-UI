import InputField from "../../components/inputField/inputField.jsx";
import {useForm} from "react-hook-form";
import NavBar from "../../components/navBar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import {useContext} from "react";
import languageContent from "../../content/content.json";
import "./RegistrationPage.css"
import axios from "axios";


function RegistrationPage() {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const {language} = useContext(LanguageContext);
    const {
        title,
        firstNameTitle,
        lastNameTitle,
        genderTitle,
        dateOfBirthTitle,
        emailTitle,
        passwordTitle,
        confirmPasswordTitle,
        phoneNumberTitle,
        submitButton,
        maleTitle,
        femaleTitle,
        otherTitle
    } = languageContent[language].registrationpage;

    async function registerData(data){
        console.log(data)
        try{
            const result = await axios.post('http://localhost:8080/api/auth/register',{
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            })
            console.log(result)

        }catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <NavBar/>
            <h1>{title}</h1>
            <form className="form-container" onSubmit={handleSubmit(registerData)}>
                <p>{emailTitle}</p>
                <InputField
                    inputType="email"
                    inputId="email"
                    inputName="email"
                    placeholder={emailTitle}
                    register={register}
                    validationRules={{required: "Email is required"}}
                />
                <p>{passwordTitle}</p>
                <InputField
                    inputType="password"
                    inputId="password"
                    inputName="password"
                    placeholder={passwordTitle}
                    register={register}
                    validationRules={{
                        required: "Password is required",
                        minLength: {
                            value: 4,
                            message: "Password must have at least 4 characters"
                        }
                    }}
                />
                <p>{confirmPasswordTitle}</p>
                <InputField
                    inputType="password"
                    inputId="confirmPassword"
                    inputName="confirmPassword"
                    placeholder={confirmPasswordTitle}
                    register={register}
                    validationRules={{
                        required: "Password is required",
                        minLength: {
                            value: 4,
                            message: "Password must have at least 4 characters"
                        }
                    }}
                />
                <p>{firstNameTitle}</p>
                <InputField
                    inputType="text"
                    inputId="firstName"
                    inputName="firstName"
                    placeholder={firstNameTitle}
                    register={register}
                    validationRules={{required: "First Name is required"}}
                />
                <p>{lastNameTitle}</p>
                <InputField
                    inputType="text"
                    inputId="lastName"
                    inputName="lastName"
                    placeholder={lastNameTitle}
                    register={register}
                    validationRules={{required: "Last Name is required"}}
                />
                <p>{genderTitle}</p>
                <InputField
                    inputType="select"
                    inputId="gender"
                    inputName="gender"
                    register={register}
                    validationRules={{required: "Please select your gender"}}
                    options={[
                        {value: maleTitle, label: maleTitle},
                        {value: femaleTitle, label: femaleTitle},
                        {value: otherTitle, label: otherTitle}
                    ]}
                />
                <p>{dateOfBirthTitle}</p>
                <InputField
                    inputType="date"
                    inputId="dateOfBirth"
                    inputName="dateOfBirth"
                    register={register}
                    validationRules={{required: "Please select your date of birth"}}
                />
                <p>{phoneNumberTitle}</p>
                <InputField
                    inputType="phone"
                    inputId="phoneNumber"
                    inputName="phoneNumber"
                    placeholder={phoneNumberTitle}
                    register={register}
                    validationRules={{required: "Phone Number is required"}}
                />

                <div className="error-container">
                    {errors.email && <p>{errors.email.message}</p>}
                    {errors.password && <p>{errors.password.message}</p>}
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                    {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                </div>

                <Button className="btn-primary" type="submit" id="submitBtn"><p>{submitButton}</p></Button>

            </form>


        </>

    );

}


export default RegistrationPage;