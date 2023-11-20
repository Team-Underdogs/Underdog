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

    return (
        <div className="content-container">
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div className="service-detail-service-section">
                    <h1>{service.ServicePrice}</h1>
                    {user?.sub == service.UserId ? (
                        <div className="button section">
                            <GeneralButton 
                            text={"Update service"} 
                            link={`/service/update/${service._id}`}
                            />
                        </div>
                        ) : (null)
                        }
                    <h2>{service.ServiceName}</h2>
                    <h2>{store.BusinessName}</h2>
                    <p>{service.ServiceDescription}</p>
                </div>
            )}
        </div>
    );
}

export default ServiceDetail;