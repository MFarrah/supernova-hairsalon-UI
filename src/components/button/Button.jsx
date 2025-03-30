import React from "react";
import "./Button.css";

function Button({ type = "button", id, children }) {
    return (
        <button
            type={type}
            id={id}

        >
            {children}
        </button>
    );
}

export default Button;