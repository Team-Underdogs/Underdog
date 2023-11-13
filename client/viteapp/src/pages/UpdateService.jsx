import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const UpdateService = () => {
    const [service, setService] = useState({
        ServiceName: "",
        ServicePrice: "",
        ServiceDescription: "",
        ServiceTags: [],
        ServiceCategories: []
    })

    const { user, isAuthenticated } = useAuth0();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/services/getService/${id}`)
            .then((res) => {
                setService(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("Failed to get service. CHECK CONSOLE FOR DETAILS");
                console.error("Get service error: ", error);
            })
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setService((prevService) => ({
            ...prevService,
            [name]: value
        }));
    };

    const handleUpdateService = () => {

        if (!service.ServiceName || !service.ServicePrice || !service.ServiceDescription || !service.ServiceTags || !service.ServiceCategories) {
            alert("Please fill in all fields");
            return;
        }

        if (!isAuthenticated) {
            alert("User not authenticated");
            return;
        }

        setLoading(true);

        axios
            .put(`http://localhost:3001/services/updateService/${id}`, service, {params: {UserId: user.sub}})
            .then(res => {
                setLoading(false);
                console.log(res.data);
                alert("Service updated successfully");
            })
            .catch(error => {
                setLoading(false);
                alert("Failed to update service. CHECK CONSOLE FOR DETAILS")
                console.error("Update service error: ", error)
            });
    };
    
    return (
        <div>
            <h1>Update Service</h1>
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div>
                    {Object.entries(service).map(([field, value]) => {
                        if (["_id", "UserId", "__v"].includes(field)) {
                            return null;
                        }
                    return (
                        <div key={field}>
                            <label>{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={value}
                                onChange={handleInputChange}
                            />
                        </div>
                    );
                    })}
                    <button onClick={handleUpdateService}>Save</button>
                </div>
            )}
        </div>
    );
}

export default UpdateService;