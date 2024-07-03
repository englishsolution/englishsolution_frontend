import React from 'react';
import './Button.css'; // Button 스타일을 위한 CSS 파일 import

const Button = ({ label, onClick }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;
