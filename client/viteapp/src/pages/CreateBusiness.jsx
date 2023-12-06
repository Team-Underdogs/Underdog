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
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [fb, setFb] = useState('');
    const [twitter, setTwitter] = useState('');
    const [insta, setInsta] = useState('');
    const [selectedTags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filenameDP, setFilenameDP] = useState("");
    const [filenameBan, setFilenameBan] = useState("");

    const { user, isAuthenticated } = useAuth0();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChangeFileDP = (e) => {
        setFilenameDP(e.target.files[0])
    };

    const onChangeFileBan = (e) => {
        setFilenameBan(e.target.files[0])
    };

    const availableTags = {
        Regions: ['Northland', 'Auckland', 'Waikato', 'Bay of Plenty', 'Gisborne', 'Hawkes Bay', 'Taranaki', 'Whanganui', 'Wellington', 'Tasman', 'Nelson', 'Marlborough', 'West Coast', 'Canterbury', 'Otago', 'Southland'],
        Ethnicity: ['Maori', 'Pacific Islander', 'European', 'Asia', 'Africa', 'MENA'],
        Identity: ['Women', 'LGBTQIA'],
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

    const handleCreateStore = async (e) => {
        e.preventDefault();
        if (!name || !address || !suburb || !city || !description || !phone || !categories || !selectedTags) {
            alert("Please fill in all fields that have a *");
            return;
        }

        if (!isAuthenticated) {
            alert("User not authenticated");
            return;
        }

        const formData = new FormData();

        formData.append("BusinessName", name);
        formData.append("Address", address);
        formData.append("Suburb", suburb);
        formData.append("City", city);
        formData.append("Phone", phone);
        formData.append("Email", email);
        formData.append("BusinessDescription", description);
        formData.append("LinkWebsite", website);
        formData.append("LinkFB", fb);
        formData.append("LinkTwitter", twitter);
        formData.append("LinkInstagram", insta);
        formData.append("BusinessTags", selectedTags.join(','));
        formData.append("BusinessCategories", categories.join(','));
        formData.append("businessImage", filenameDP);
        formData.append("businessBanner", filenameBan);

        axios
            .post("http://localhost:3001/stores/createStore", 
            formData, 
            {params: { UserId: user?.sub, Email: user?.email}})
            .then(response => {
                console.log(response.formData);
                alert("Store created successfully");
                window.location.href = response.data.accountLink.url
            })
            .catch(error => {
                alert("Failed to create store. CHECK CONSOLE FOR DETAILS")
                console.log(error)
                console.error("Create store error:", error);
            });
    };

    return (
        <div className="content-container">
            <div className="browse-text">
                <h1>Create Business</h1>
                <h4>Enter details about your business in order to be registered on the Underdog marketplace.</h4>
            </div>
            <form onSubmit={handleCreateStore} encType="multipart/form-data" name="create-form" className="create-form">
                <div className="basic-info">
                    <div className="info-title">
                        <h4>Basic Information:</h4>
                        <p>All fields are required.</p>
                    </div>
                    <div className="info-grid">
                        <div className="info-grid-item">
                            <div className="average-input">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label for="input" placeholder="Business Name"></label>
                            </div>
                        </div>
                        <div className="info-grid-item">
                            <div className="upload-input">
                                <label htmlFor="file">Business Image:</label>
                                <input 
                                    type="file"
                                    filename="businessimage"
                                    className="form-control-file"
                                    onChange={onChangeFileDP}
                                />
                            </div>
                        </div>
                        <div className="info-grid-item">
                            <div className="average-input">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <label for="input" placeholder="Address"></label>
                            </div>
                        </div>
                        <div className="info-grid-item">
                            <div className="upload-input">
                                <label htmlFor="file">Business Banner:</label>
                                <input 
                                    type="file"
                                    filename="businessbanner"
                                    className="form-control-file"
                                    onChange={onChangeFileBan}
                                />
                            </div>
                        </div>
                        <div className="info-grid-item">
                            <div className="average-input">
                                <input
                                    type="text"
                                    value={suburb}
                                    onChange={(e) => setSuburb(e.target.value)}
                                />
                                <label for="input" placeholder="Suburb"></label>
                            </div>
                        </div>
                        <div className="info-grid-item">
                            <div className="average-input">
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <label for="input" placeholder="City"></label>
                            </div>
                        </div>
                        <div className="info-grid-item">
                            <div className="average-input">
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <label for="input" placeholder="Phone Number"></label>
                            </div>
                        </div>
                        <div className="info-grid-item">
                            <div className="average-input">
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label for="input" placeholder="Business Email Address"></label>
                            </div>
                        </div>
                    </div>
                    <div className="textarea-input">
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe Your Business..."
                        />
                    </div>
                </div>
                <div className="links-form">
                    <div className="info-title">
                        <h4>External Links:</h4>
                        <p>These are optional fields.</p>
                    </div>
                    <div className="grid-links">
                        <div className="average-input">
                            <input
                                type="text"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                            <label for="input" placeholder="Business Website"></label>
                        </div>
                        <div className="average-input">
                            <input
                                type="text"
                                value={fb}
                                onChange={(e) => setFb(e.target.value)}
                            />
                            <label for="input" placeholder="Facebook Page"></label>
                        </div>
                        <div className="average-input">
                            <input
                                type="text"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                            />
                            <label for="input" placeholder="X (Twitter)"></label>
                        </div>
                        <div className="average-input">
                            <input
                                type="text"
                                value={insta}
                                onChange={(e) => setInsta(e.target.value)}
                            />
                            <label for="input" placeholder="Instagram"></label>
                        </div>
                    </div>
                </div>
                <div className="category-assignment">
                    <div className="info-title">
                        <h4>Business Categories:</h4>
                        <p>What kind of items/services does your business provide? You must select at least one.</p>
                    </div>
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
                <div className="tag-assignment">
                    <div className="info-title">
                        <h4>Business Tags:</h4>
                        <p>What makes your business unique? You must select at least one.</p>
                    </div>
                    {Object.entries(availableTags).map(([group, tags]) => (
                        <div className="tag-groups" key={group}>
                            <p className="group-label">{group}</p>
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
                </div>
                <div>
                    <button className="general-button" type="submit">Create Store</button>
                </div>
            </form>
        </div>
    );
}

export default CreateBusiness;