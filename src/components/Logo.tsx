import rateMyUnitLogo from "../assets/logo-default.svg";

interface LogoProps {
    className?: string;
}

const Logo = (className) => {
    return (
        <img src={rateMyUnitLogo} className={ className } alt="Rate My Unit logo"/>
    )
};

export default Logo;