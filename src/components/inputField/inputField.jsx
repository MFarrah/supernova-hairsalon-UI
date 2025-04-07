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
    if (inputType === 'checkbox-group') {
        return (
            <div className="checkbox-group">
                {options.map(option => (
                    <label key={option.value} className="checkbox-option">
                        <input
                            type="checkbox"
                            value={option.value}
                            {...register(inputName, validationRules)}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
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