import "./inputField.css"

function InputField({ inputType, inputId, inputName, placeholder, register, validationRules, options }) {
    if (inputType === 'select') {
        return (
            <select className="input-box" id={inputId} name={inputName} {...register(inputName, validationRules)}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <input
            className="input-box"
            type={inputType}
            id={inputId}
            name={inputName}
            placeholder={placeholder}
            {...register(inputName, validationRules)}
        />
    );
}

export default InputField;