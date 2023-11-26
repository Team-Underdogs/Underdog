import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GeneralButton = ({link, text}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link)
    };

    return (
        <button className="general-button" onClick={handleClick}>
            {text}
        </button>
    );
};

export default GeneralButton;