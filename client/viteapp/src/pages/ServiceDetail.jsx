import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import GeneralButton from "../components/GeneralButton";
import Button from '@mui/material-next/Button';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const ServiceDetail = () => {
    const [service, setService] = useState({});
    const [store, setStore] = useState({});

    const { user, isAuthenticated } = useAuth0();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/services/getService/${id}`);
                setService(response.data);

                axios.get(`http://localhost:3001/stores/getStore/${response.data.Store}`)
                    .then((res) => {
                        setStore(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                        alert("Failed to get store. CHECK CONSOLE FOR DETAILS");
                        console.error("Get store error:", error);
                    });
            } catch (error) {
                setLoading(false);
                alert("Failed to get service. CHECK CONSOLE FOR DETAILS");
                console.error("Get service error:", error);
            }
        };

        getData(); 
        
    }, [id]);

    const handleDeleteService = async () => {
        
        const isConfirmed = window.confirm("Are you sure you want to delete this service?");

        if (!isConfirmed) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3001/services/deleteService/${service._id}`);
            console.log("Service deleted successfully");
            alert("Service deleted successfully");
            navigate("/")
        } catch (error) {
            alert("Failed to delete service. CHECK CONSOLE FOR DETAILS");
            console.error("Delete service error:", error)
        }
    };

    return ( 
        <div className="item-container">
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div className="detail-section">
                    <div className="item-info">
                    <h1>{service.ServiceName}</h1>
                    {user?.sub == service.UserId ? (
                        <div className="button-section">
                            <GeneralButton 
                            icon={<FaEdit />}
                            text={"Update Service"} 
                            link={`/service/update/${service._id}`}
                            />
                            <Button variant="filledTonal" onClick={handleDeleteService} sx={{ backgroundColor: "rgb(197, 77, 77)", "&:hover": { backgroundColor: "rgb(224, 102, 102)" }}}>
                            <FaTrash />
                            Delete Service
                            </Button>
                        </div>
                        ) : (null)
                        }
                    <h3>{store.BusinessName}</h3>
                    <h3>$ {service.ServicePrice}</h3>
                    <p>{service.ServiceDescription}</p>
                    <button >Purchase</button>
                    </div>
                    <div className="item-image">
                        {service && service.ServiceImage && (
                            <div className="item-main-image">
                                <img src={`http://localhost:3001/uploads/${service.ServiceImage}`} alt="..." />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ServiceDetail;

// reminder to add onClick=payment to purchase button