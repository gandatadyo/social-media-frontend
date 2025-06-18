import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' ,stypeButton = 'primary' }) => {
    let classNameDefault = '';
    if (stypeButton === 'secondary') {
        classNameDefault = 'bg-gray-200 text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150';
    } else {
        classNameDefault = 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400';
    }
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${classNameDefault} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;