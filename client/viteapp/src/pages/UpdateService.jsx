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

    const availableTags = {
        Regions: ['Northland', 'Auckland', 'Waikato', 'Bay of Plenty', 'Gisborne', 'Hawkes Bay', 'Taranaki', 'Whanganui', 'Wellington', 'Tasman', 'Nelson', 'Marlborough', 'West Coast', 'Canterbury', 'Otago', 'Southland'],
        Ethnicity: ['Maori', 'Pacific Islander', 'European', 'Asia', 'Africa', 'MENA'],
        Identity: ['Women', 'LGBTQIA+'],
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
            })
            .catch(error => {
                setLoading(false);
                alert("Failed to update service. CHECK CONSOLE FOR DETAILS")
                console.error("Update service error: ", error)
            });
    };
    
    return (
        <div className="content-container">
            <h1>Update Service</h1>
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div>
                    {Object.entries(service).map(([field, value]) => {
                        if (["_id", "UserId", "__v", "ServiceTags", "ServiceCategories", "Store"].includes(field)) {
                            return null;
                        }
                    return (
                        <div className="label-input-combo" key={field}>
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
                    <div>
                        <h1>Service Tags</h1>
                        {Object.entries(availableTags).map(([group, tags]) => (
                            <div className="tag-groups" key={group}>
                                <h3 className="group-label">Service Tags: {group}</h3>
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
                    <div>
                        <h1>Service Categories</h1>
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
                    <button onClick={handleUpdateService}>Save</button>
                </div>
            )}
        </div>
    );
}

export default UpdateService;