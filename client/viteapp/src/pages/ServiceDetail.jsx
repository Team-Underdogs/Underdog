import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import GeneralButton from "../components/GeneralButton";

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

    const handlePayment = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/services/checkout/${id}`, {StoreId: store._id});
            window.location.href = response.data.sessionUrl
            console.log(response.data)
        } catch (error) {
            console.error({ message: error })
        }
    }

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
                <div className="service-detail-service-section">
                    <h1>Price: ${service.ServicePrice}</h1>
                    {user?.sub == service.UserId ? (
                        <div className="button section">
                            <GeneralButton 
                            text={"Update service"} 
                            link={`/service/update/${service._id}`}
                            />
                            <button
                            onClick={handleDeleteService}
                            className="delete-button"
                            >
                            Delete service
                            </button>
                        </div>
                        ) : (null)
                        }
                    <h2>{service.ServiceName}</h2>
                    <h2>{store.BusinessName}</h2>
                    <p>{service.ServiceDescription}</p>
                    <button onClick={handlePayment}>Purchase</button>
                    <div className="item-image">
                        <img src="../src/assets/products.jpg" />
                    </div>
                    {service && service.ServiceImage && (
                    <div className="item-main-image">
                        <img src={`http://localhost:3001/uploads/${service.ServiceImage}`} alt="..." />
                    </div>
                )}
                </div>
            )}
        </div>
    );
}

export default ServiceDetail;