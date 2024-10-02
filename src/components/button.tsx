import React from 'react';

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick })=> {
    return (
      <button  onClick={onClick} style={{
        margin: "0 15px",
        border: "0 solid #e5e7eb",
        borderRadius: "0.5rem", 
        opacity: 1, 
        height: "2.5rem",       
        color: "rgb(255 255 255)",
        fontWeight: "500",
        fontSize: ".875rem",
        lineHeight: "1.25rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: "rgb(47 111 235)",
        display: "flex", 
        alignItems: "center",        
            }}
        >
        Clear Filters and Sorters
      </button>
    );
  }

export default Button; 