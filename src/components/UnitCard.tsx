import styled from 'styled-components';
import type {ButtonProps} from "primereact/button";


const UnitCard: React.FC<ButtonProps> = ({children, onClick, className}) => {
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
    height: 30px;
    background: white;
    border: 1px solid rgba(217, 217, 217, 0.58);
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
    transform: scale(1);
  }

  .card:active {
    transform: scale(0.95);
  }`;

export default UnitCard;
