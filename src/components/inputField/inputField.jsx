

function InputField({ inputType, inputId, inputName, placeholder, register, validationRules }) {


    return (
        <label htmlFor={inputId}>
            <input
                type={inputType}
                name={inputName}
                placeholder={placeholder}
                id={inputId}
                {...register(inputName, validationRules)}
            />
        </label>
    );
}


    export default InputField;