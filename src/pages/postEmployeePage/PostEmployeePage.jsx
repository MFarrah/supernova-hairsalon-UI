import { useForm } from "react-hook-form";
import NavBar from "../../components/navBar/NavBar.jsx";
import InputField from "../../components/inputField/inputField.jsx";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import languageContent from "../../content/content.json";
import Button from "../../components/button/Button.jsx";
import '../../content/OrderPlaceholder.jsx';
import { OrderPlaceholder } from "../../content/OrderPlaceholder.jsx";

function PostEmployeePage () {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { language } = useContext(LanguageContext);
    const { token } = useContext(AuthContext);

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
        otherTitle,
        roleTitle,
        roleAdmin,
        roleEmployee,
        qualificationsTitle,
        availabilityTitle,
    } = languageContent[language].postemployeepage;

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Wachtwoorden komen niet overeen.");
            return;
        }

        const {
            availability,
            qualifiedOrderIds,
            ...rest
        } = data;

        const workingSchedule = (availability || [])
            .filter(day => day.enabled)
            .map(({ dayOfWeek, startTime, endTime }) => ({
                dayOfWeek,
                startTime,
                endTime
            }));

        const formattedOrderIds = qualifiedOrderIds?.map(id => Number(id)) || [];

        const payload = {
            ...rest,
            qualifiedOrderIds: formattedOrderIds,
            workingSchedule,
        };

        console.log("Payload being sent:", JSON.stringify(payload, null, 2));

        try {
            const response = await fetch("http://localhost:8080/api/employees/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Employee successfully posted:", result);
        } catch (error) {
            console.error("Error posting employee:", error);
        }
    };

    return (
        <>
            <NavBar />
            <h1>{title}</h1>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <p>{emailTitle}</p>
                <InputField
                    inputType="email"
                    inputId="email"
                    inputName="email"
                    placeholder={emailTitle}
                    register={register}
                    validationRules={{ required: "Email is required" }}
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
                        required: "Confirm password is required",
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
                    validationRules={{ required: "First Name is required" }}
                />

                <p>{lastNameTitle}</p>
                <InputField
                    inputType="text"
                    inputId="lastName"
                    inputName="lastName"
                    placeholder={lastNameTitle}
                    register={register}
                    validationRules={{ required: "Last Name is required" }}
                />

                <p>{genderTitle}</p>
                <InputField
                    inputType="select"
                    inputId="gender"
                    inputName="gender"
                    register={register}
                    validationRules={{ required: "Please select your gender" }}
                    options={[
                        { value: "MALE", label: maleTitle },
                        { value: "FEMALE", label: femaleTitle },
                        { value: "OTHER", label: otherTitle }
                    ]}
                />

                <p>{dateOfBirthTitle}</p>
                <InputField
                    inputType="date"
                    inputId="dateOfBirth"
                    inputName="dateOfBirth"
                    register={register}
                    validationRules={{ required: "Please select your date of birth" }}
                />

                <p>{phoneNumberTitle}</p>
                <InputField
                    inputType="phone"
                    inputId="phoneNumber"
                    inputName="phoneNumber"
                    placeholder={phoneNumberTitle}
                    register={register}
                    validationRules={{ required: "Phone Number is required" }}
                />

                <p>{roleTitle}</p>
                <InputField
                    inputType="select"
                    inputId="role"
                    inputName="role"
                    placeholder={roleTitle}
                    register={register}
                    validationRules={{ required: "Please select your employee role" }}
                    options={[
                        { value: "EMPLOYEE", label: roleEmployee },
                        { value: "ADMIN", label: roleAdmin }
                    ]}
                />

                <p>{qualificationsTitle}</p>
                <InputField
                    inputType="checkbox-group"
                    inputName="qualifiedOrderIds"
                    register={register}
                    validationRules={{ required: "Please select at least one qualification" }}
                    options={OrderPlaceholder.map(order => ({
                        value: order.id,
                        label: order.description
                    }))}
                />

                <p>{availabilityTitle}</p>
                {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day, index) => (
                    <div key={day} className="day-availability">
                        <label>
                            <input type="checkbox" {...register(`availability.${index}.enabled`)} />
                            {day}
                        </label>
                        <input type="hidden" value={day} {...register(`availability.${index}.dayOfWeek`)} />
                        <input type="time" {...register(`availability.${index}.startTime`)} />
                        <input type="time" {...register(`availability.${index}.endTime`)} />
                    </div>
                ))}

                <div className="error-container">
                    {errors.email && <p>{errors.email.message}</p>}
                    {errors.password && <p>{errors.password.message}</p>}
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                    {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                </div>

                <Button className="btn-primary" type="submit" id="submitBtn">
                    <p>{submitButton}</p>
                </Button>
            </form>
        </>
    );
}

export default PostEmployeePage;
