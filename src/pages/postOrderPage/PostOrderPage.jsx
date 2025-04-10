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
        orderPriceTitle,
        orderDurationTitle,
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

<p>{orderPriceTitle}</p>
                <InputField
                    inputType="number"
                    inputId="price"
                    inputName="price"
                    placeholder={orderPriceTitle}
                    step="0.01"
                    register={register}
                    validationRules={{
                        required: "Price is required",
                        min: {
                            value: 0,
                            message: "Price must be a positive number"
                        }
                    }}
                />


                <p>{orderDurationTitle}</p>
                <InputField
                    inputType="number"
                    inputId="duration"
                    inputName="duration"
                    placeholder={orderDurationTitle}
                    register={register}
                    validationRules={{
                        required: "Duration is required",
                        min: {
                            value: 15,
                            message: "Duration must be at least 15 minutes"
                        }
                    }}
                />


                {errors.orderDescriptionTitle && <p className="error-message">{errors.orderDescriptionTitle.message}</p>}
                {errors.orderPriceTitle && <p className="error-message">{errors.orderPriceTitle.message}</p>}
                {errors.orderDurationTitle && (<p className="error-message">{errors.orderDurationTitle.message}</p>)}

                <Button className="btn-primary" type="submit" id="submitBtn"><p>{submitButton}</p></Button>
            </form>
        </>
    )
}

export default PostOrderPage;


