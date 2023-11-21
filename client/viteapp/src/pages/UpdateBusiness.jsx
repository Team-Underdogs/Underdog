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

    const handleTagChange = (tag) => {
        setBusiness((prevBusiness) => {
            const updatedTags = [...prevBusiness.BusinessTags];
            if (updatedTags.includes(tag)) {
                return {...prevBusiness, BusinessTags: updatedTags.filter((selectedTag) => selectedTag !== tag)};
            } else {
                return { ...prevBusiness, BusinessTags: [...updatedTags, tag]}
            }
        });
    };

    const handleCategoryChange = (category) => {
        setBusiness((prevBusiness) => {
          const updatedCategories = [...prevBusiness.BusinessCategories];
          if (updatedCategories.includes(category)) {
            return { ...prevBusiness, BusinessCategories: updatedCategories.filter((selectedCategory) => selectedCategory !== category) };
          } else {
            return { ...prevBusiness, BusinessCategories: [...updatedCategories, category] };
          }
        });
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
        <div className="content-container">
            <h1>Update Business</h1>
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div>
                    {Object.entries(business).map(([field, value]) => {
                        if (["_id", "UserId", "__v", "BusinessTags", "BusinessCategories"].includes(field)) {
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
                        <h1>Business Tags</h1>
                        {Object.entries(availableTags).map(([group, tags]) => (
                            <div className="tag-groups" key={group}>
                                <h3 className="group-label">Business Tags: {group}</h3>
                                <div className="tag-rows">
                                {tags.map((tag) => (
                                <div className="tag-select-container" key={tag}>
                                    <input
                                    className="tag-checkbox"
                                    type="checkbox"
                                    id={tag}
                                    value={tag}
                                    checked={business.BusinessTags.includes(tag)}
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
                        <h1>Business Categories</h1>
                        <div className="tag-rows">
                        {availableCategories.map((category) => (
                        <div className="tag-select-container" key={category}>
                            <input
                            className="tag-checkbox"
                            type="checkbox"
                            id={category}
                            value={category}
                            checked={business.BusinessCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            />
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                    </div>
                    </div>
                    <button onClick={handleUpdateBusiness}>Save</button>
                </div>
            )}
        </div>
    );
}

export default UpdateBusiness;