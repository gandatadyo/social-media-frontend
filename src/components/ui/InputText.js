import React from 'react';

const InputText = ({ value, onChange, placeholder, type = "text", name, className = "", stypeButton = 'primary' }) => {
    let classNameDefault = ''
    if (stypeButton == 'secondary') {
        classNameDefault = ` bg-gray-200 text-gray-700  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ${className} `
    } else {
        classNameDefault = `px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ${className} `
    }

    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={classNameDefault}
        />
    );
};

export default InputText;