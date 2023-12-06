import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material-next/Button';

const BusinessButton = () => {
    const [hasBusiness, setHasBusiness] = useState(false);
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth0();
    const [userBusiness, setUserBusiness] = useState({});

    useEffect(() => {
        const checkUserBusiness = async () => {
            try {
                if (user && user.sub) {
                    const response = await axios.get("http://localhost:3001/stores/getUserStore", {
                        params: { UserId: user.sub }
                    });

                    const { store } = response.data;
                    setUserBusiness(response.data);

                    setHasBusiness(store !== null);
                }
            } catch (error) {
                console.error("Error checking user business:", error);
            }
        };

        if (isAuthenticated) {
            checkUserBusiness();
        }
    }, [isAuthenticated, user]);

    const handleButtonClick = () => {
        if (hasBusiness) {
            navigate(`/business/${userBusiness.store._id}`);
        } else {
            navigate(`/business/create`);
        }
    };

    return isAuthenticated ? (
        <Button className="general-button" onClick={handleButtonClick} variant="filledTonal" sx={{ backgroundColor: "#C1D7AE", "&:hover": { backgroundColor: "#d2e7c0" }}}>
            {hasBusiness ? "View Business" : "Create Business"}
        </Button>
    ) : null;
};

export default BusinessButton;
