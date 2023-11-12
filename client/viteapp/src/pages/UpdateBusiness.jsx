import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const UpdateBusiness = () => {
    const [business, setBusiness] = useState({
        BusinessName: "",
        Address: "",
        Suburb: "",
        City: "",
        Phone: "",
        Email: "",
        BusinessDescription: "",
        BusinessTags: [],
        BusinessCategories: [],
        LinkWebsite: "",
        LinkFB: "",
        LinkTwitter: "",
        LinkInstagram: ""
    })

    const { user, isAuthenticated} = useAuth0();

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/stores/getStore/${id}`)
            .then((res) => {
                setBusiness(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("Failed to get store. CHECK CONSOLE FOR DETAILS")
                console.error("Get store error:", error)
            })
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setBusiness((prevBusiness) => ({
            ...prevBusiness,
            [name]: value
        }));
    };

    const handleUpdateBusiness = () => {

        if (!business.BusinessName || !business.Address || !business.Suburb || !business.City || !business.BusinessDescription || !business.Phone || !business.BusinessCategories || !business.BusinessTags) {
            alert("Please fill in all fields that have a *");
            return;
        }

        if (!isAuthenticated) {
            alert("User not authenticated");
            return;
        }

        setLoading(true);

        axios
            .put(`http://localhost:3001/stores/updateStore/${id}`, business, {params: { UserId: user.sub}})
            .then(res => {
                setLoading(false);
                console.log(res.data)
                alert("Store updated successfully");
            })
            .catch(error => {
                setLoading(false);
                alert("Failed to update store. CHECK CONSOLE FOR DETAILS")
                console.error("Update store error.", error);
                console.log(error)
            });
    };

    return (
        <div>
            <h1>Update Business</h1>
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div>
                    {Object.entries(business).map(([field, value]) => {
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
                    <button onClick={handleUpdateBusiness}>Save</button>
                </div>
            )}
        </div>
    );
}

export default UpdateBusiness;