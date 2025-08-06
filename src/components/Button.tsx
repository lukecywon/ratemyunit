// import React from 'react';
// import '../styles/button.css';
//
// interface ButtonProps {
//     children: React.ReactNode,
//     onClick: () => void,
//     className?: string
// }
//
// const Button: React.FC<ButtonProps> = ({children, onClick, className}) => {
//     return (
//         <button className={`custom-button ${className || ''}`} onClick={onClick}>
//             {children}
//         </button>
//     );
// };
//
// export default Button;

import styled from 'styled-components';
import type {ButtonProps} from "primereact/button";


const Button: React.FC<ButtonProps> = ({children, onClick, className}) => {
    return (
        <StyledWrapper>
            <div className="card">
                <button className={`custom-button ${className || ''}`} onClick={onClick}>
                    {children}
                </button>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .card {
    box-sizing: border-box;
      width: 100%;           
      max-width: 500px;      
    height: 30px;
    background: rgba(217, 217, 217, 0.58);
    border: 1px solid white;
    backdrop-filter: blur(4px);
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bolder;
    color: black;
  }

  .card:hover {
    border: 1px solid black;
      background: lightgrey;
    transform: scale(1.05);
  }

  .card:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }`;

export default Button;
