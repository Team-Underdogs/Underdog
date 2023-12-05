import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material-next/Button';

const GeneralButton = ({link, text, icon}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link)
    };

    return (
        <Button variant="filledTonal" onClick={handleClick} sx={{backgroundColor: "#C1D7AE", "&:hover": { backgroundColor: "#d2e7c0" }}}>
            {icon}
            {text}
        </Button>
    );
};

export default GeneralButton;