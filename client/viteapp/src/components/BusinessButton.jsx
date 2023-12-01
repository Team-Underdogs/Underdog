import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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
        <button className="general-button" onClick={handleButtonClick}>
            {hasBusiness ? "View Business" : "Create Business"}
        </button>
    ) : null;
};

export default BusinessButton;
