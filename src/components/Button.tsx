import React from 'react';
import '../styles/button.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({children, onClick}) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;