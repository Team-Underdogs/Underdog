import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material-next/Button";

const UpdateService = () => {
    const [service, setService] = useState({
        ServiceName: "",
        ServicePrice: "",
        ServiceDescription: "",
        ServiceTags: [],
        ServiceCategories: [],
        ServiceImage: "",
    })

    const { user, isAuthenticated } = useAuth0();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const availableTags = {
        Regions: ['Northland', 'Auckland', 'Waikato', 'Bay of Plenty', 'Gisborne', 'Hawkes Bay', 'Taranaki', 'Whanganui', 'Wellington', 'Tasman', 'Nelson', 'Marlborough', 'West Coast', 'Canterbury', 'Otago', 'Southland'],
        Ethnicity: ['Maori', 'Pacific Islander', 'European', 'Asia', 'Africa', 'MENA'],
        Identity: ['Women', 'LGBTQIA'],
        Religion: ['Muslim', 'Jewish', 'Sikh', 'Buddhist', 'Hindu', 'Other'],
        Sustainability: ['Eco-Friendly', 'Vegan', 'Halal', 'Organic'],
        Health: ['Mental Health', 'Disabilities', 'Aged']
    };

    const availableCategories = ['Clothing', 'Accessories', 'Homeware', 'Technology', 'Cosmetic', 'Food', 'Sport', 'Pet', 'Other'];

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

    const handleTagChange = (tag) => {
        setService((prevService) => {
            const updatedTags = [...prevService.ServiceTags];
            if (updatedTags.includes(tag)) {
                return {...prevService, ServiceTags: updatedTags.filter((selectedTag) => selectedTag !== tag)};
            } else {
                return { ...prevService, ServiceTags: [...updatedTags, tag]}
            }
        });
    };

    const handleCategoryChange = (category) => {
        setService((prevService) => {
          const updatedCategories = [...prevService.ServiceCategories];
          if (updatedCategories.includes(category)) {
            return { ...prevService, ServiceCategories: updatedCategories.filter((selectedCategory) => selectedCategory !== category) };
          } else {
            return { ...prevService, ServiceCategories: [...updatedCategories, category] };
          }
        });
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
                navigate(`/service/${id}`)
            })
            .catch(error => {
                setLoading(false);
                alert("Failed to update service. CHECK CONSOLE FOR DETAILS")
                console.error("Update service error: ", error)
            });
    };
    
    return (
        <div className="content-container">
            <div className="browse-text-form">
                <h1>Update Service</h1>
                <h4>Edit your details to update your service's information.</h4>
            </div>
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div className="info-container">
                    <div className="info-title">
                        <h4>Basic Information:</h4>
                        <p>All fields are required.</p>
                    </div>
                    <div className="info-grid-update">
                        {Object.entries(service).map(([field, value]) => {
                            if (["_id", "UserId", "__v", "ServiceTags", "ServiceCategories", "Store", "ServiceImage", "ServiceDescription", "stripeProduct", "stripePrice"].includes(field)) {
                                if (field === "ServiceDescription") {
                                    return (
                                        <div className="info-grid-item-update" key={field}>
                                            <div className="textarea-input-update">
                                                <label>Service Description:</label>
                                                <textarea
                                                    name={field}
                                                    value={value}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }
                            return (
                                <div className="info-grid-item-update" key={field}>
                                    <div className="average-input">
                                        <input
                                            type="text"
                                            name={field}
                                            value={value}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="input" placeholder={field}></label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="category-assignment">
                        <div className="info-title">
                            <h4>Service Categories:</h4>
                            <p>What is your service related to? You must select at least one.</p>
                        </div>
                        <div className="tag-rows">
                            {availableCategories.map((category) => (
                            <div className="tag-select-container" key={category}>
                                <input
                                className="tag-checkbox"
                                type="checkbox"
                                id={category}
                                value={category}
                                checked={service.ServiceCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                />
                                <label htmlFor={category}>{category}</label>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="tag-assignment">
                        <div className="info-title">
                            <h4>Service Tags:</h4>
                            <p>Some users will directly search for services based on the businesses values and ownership. You can select the same as your business, or personalise the tags for each service. You must select at least one.</p>
                        </div>
                        {Object.entries(availableTags).map(([group, tags]) => (
                            <div className="tag-groups" key={group}>
                                <h3 className="group-label">{group}</h3>
                                <div className="tag-rows">
                                {tags.map((tag) => (
                                <div className="tag-select-container" key={tag}>
                                    <input
                                    className="tag-checkbox"
                                    type="checkbox"
                                    id={tag}
                                    value={tag}
                                    checked={service.ServiceTags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                    />
                                    <label htmlFor={tag}>{tag}</label>
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
                    </div>
                    <Button variant="filledTonal" sx={{ backgroundColor: "#C1D7AE", "&:hover": { backgroundColor: "#d2e7c0" }}} onClick={handleUpdateService}>Save</Button>
                </div>
            )}
        </div>   
    );
}

export default UpdateService;