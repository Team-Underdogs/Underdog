import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const CreateBusiness = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [suburb, setSuburb] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [fb, setFb] = useState('');
    const [twitter, setTwitter] = useState('');
    const [insta, setInsta] = useState('');
    const [selectedTags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const { user, isAuthenticated } = useAuth0();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const availableTags = {
        Regions: ['Northland', 'Auckland', 'Waikato', 'Bay of Plenty', 'Gisborne', 'Hawkes Bay', 'Taranaki', 'Whanganui', 'Wellington', 'Tasman', 'Nelson', 'Marlborough', 'West Coast', 'Canterbury', 'Otago', 'Southland'],
        Ethnicity: ['Maori', 'Pacific Islander', 'European', 'Asia', 'Africa', 'MENA'],
        Identity: ['Women', 'LGBTQIA+'],
        Religion: ['Muslim', 'Jewish', 'Sikh', 'Buddhist', 'Hindu', 'Other'],
        Sustainability: ['Eco-Friendly', 'Vegan', 'Halal', 'Organic'],
        Health: ['Mental Health', 'Disabilities', 'Aged']
    };

    const availableCategories = ['Clothing', 'Accessories', 'Homeware', 'Technology', 'Cosmetic', 'Food', 'Sport', 'Pet', 'Other'];

    const handleTagChange = (tag) => {
        setTags((prevTags) => {
            if (prevTags.includes(tag)) {
                return prevTags.filter((selectedTag) => selectedTag !== tag);
            } else {
                return [...prevTags, tag]
            }
        })
    };

    const handleCategoryChange = (category) => {
        setCategories((prevCategories) => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter((selectedCategory) => selectedCategory !== category)
            } else {
                return [...prevCategories, category]
            }
        });
    };

    const handleCreateStore = () => {
        if (!name || !address || !suburb || !city || !description || !phone || !categories || !selectedTags) {
            alert("Please fill in all fields that have a *");
            return;
        }

        if (!isAuthenticated) {
            alert("User not authenticated");
            return;
        }

        const data = {
            BusinessName: name,
            Address: address,
            Suburb: suburb,
            City: city,
            Phone: phone,
            BusinessDescription: description,
            LinkWebsite: website,
            LinkFB: fb,
            LinkTwitter: twitter,
            LinkInstagram: insta,
            BusinessTags: selectedTags,
            BusinessCategories: categories
        }

        axios
            .post("http://localhost:3001/stores/createStore", data, {params: { UserId: user.sub, Email: user.email}})
            .then(response => {
                console.log(response.data);
                alert("Store created successfully");
            })
            .catch(error => {
                alert("Failed to create store. CHECK CONSOLE FOR DETAILS")
                console.error("Create store error:", error);
            });
    };

    return (
        <div className="content-container">
            <h1>Create Business</h1>
            <div className="label-input-combo">
                <label>Business Name *</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="label-input-combo">
                <label>Address *</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className="label-input-combo">
                <label>City *</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className="label-input-combo">
                <label>Suburb *</label>
                <input
                    type="text"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                />
            </div>
            <div className="label-input-combo">
                <label>Business Description *</label>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="label-input-combo">
                <label>Phone *</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="label-input-combo">
                <label>Website</label>
                <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
            <div className="label-input-combo">
                <label>Facebook</label>
                <input
                    type="text"
                    value={fb}
                    onChange={(e) => setFb(e.target.value)}
                />
            </div>
            <div className="label-input-combo">
                <label>Twitter</label>
                <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                />
            </div>
            <div className="label-input-combo">
                <label>Instagram</label>
                <input
                    type="text"
                    value={insta}
                    onChange={(e) => setInsta(e.target.value)}
                />
            </div>
            <h2>Business Tags</h2>
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
                            checked={selectedTags.includes(tag)}
                            onChange={() => handleTagChange(tag)}
                            />
                            <label htmlFor={tag}>{tag}</label>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
            <div>
                <h2>Business Categories</h2>
                <div className="tag-rows">
                {availableCategories.map((category) => (
                    <div className="tag-select-container" key={category}>
                        <input
                        className="tag-checkbox"
                        type="checkbox"
                        id={category}
                        value={category}
                        checked={categories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={category}>{category}</label>
                    </div>
                ))}
                </div>
            </div>
            <div>
                <button onClick={handleCreateStore}>Create Store</button>
            </div>
        </div>
    );
}

export default CreateBusiness;