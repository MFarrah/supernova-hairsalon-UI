import React from "react";
import "./Button.css";

function Button({ type = "button", id, children, className }) {
    return (
        <button
            type={type}
            id={id}
            className={className}

        >
            {children}
        </button>
    );
}

export default Button;