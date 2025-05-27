import { useForm } from 'react-hook-form';
import './PostOrderPage.css';
import NavBar from "../../components/navBar/NavBar.jsx";
import InputField from "../../components/inputField/inputField.jsx";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";
import { useContext } from "react";
import Button from "../../components/button/Button.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

function PostOrderPage () {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { language } = useContext(LanguageContext);
    const {
        title,
        orderDescriptionTitle,
        orderPriceTitle,
        orderDurationTitle,
        submitButton,
    } = languageContent[language].postorderpage;

    const { token } = useContext(AuthContext); // <== Haal token uit AuthContext

    const onSubmit = async (data) => {
        const orderData = {
            description: data.orderDescriptionTitle,
            price: parseFloat(data.price),
            duration: parseInt(data.duration),
        };

        try {
            const response = await fetch("http://localhost:8080/api/orders/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Order successfully posted:", result);
        } catch (error) {
            console.error("Error posting order:", error);
        }
    };

    return (
        <>
            <NavBar />
            <h1>{title}</h1>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <p>{orderDescriptionTitle}</p>
                <InputField
                    inputType="text"
                    inputId="orderDescriptionTitle"
                    inputName="orderDescriptionTitle"
                    placeholder={orderDescriptionTitle}
                    register={register}
                    validationRules={{ required: "Description is required" }}
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
                {errors.price && <p className="error-message">{errors.price.message}</p>}
                {errors.duration && <p className="error-message">{errors.duration.message}</p>}

                <Button className="btn-primary" type="submit" id="submitBtn"><p>{submitButton}</p></Button>
            </form>
        </>
    );
}

export default PostOrderPage;
