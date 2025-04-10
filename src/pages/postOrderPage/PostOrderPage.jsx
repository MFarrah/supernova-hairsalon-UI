import { useForm } from 'react-hook-form';
import './PostOrderPage.css';
import NavBar from "../../components/navBar/NavBar.jsx";
import InputField from "../../components/inputField/inputField.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";
import {useContext} from "react";
import Button from "../../components/button/Button.jsx";


function PostOrderPage () {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const {language} = useContext(LanguageContext);
    const {
        title,
        orderDescriptionTitle,
        submitButton,
    } = languageContent[language].postorderpage;

    const onSubmit = (data) => {
        console.log(data);
    }



    return (
        <>
            <NavBar/>
            <h1>{title}</h1>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <p>{orderDescriptionTitle}</p>
                <InputField
                    inputType="text"
                    inputId="orderDescriptionTitle"
                    inputName="orderDescriptionTitle"
                    placeholder={orderDescriptionTitle}
                    register={register}
                    validationRules={{required: "Description is required"}}
                />

                {errors.orderDescriptionTitle && <p className="error-message">{errors.orderDescriptionTitle.message}</p>}

                <Button className="btn-primary" type="submit" id="submitBtn"><p>{submitButton}</p></Button>
            </form>
        </>
    )
}

export default PostOrderPage;


