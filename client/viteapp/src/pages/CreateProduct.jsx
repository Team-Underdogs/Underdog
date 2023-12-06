import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filename, setFilename] = useState("");
    const [banner, setBanner] = useState("");

    const {user, isAuthenticated} = useAuth0();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChangeFile = (e) => {
        setFilename(e.target.files[0])
    }

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

    const handleCreateProduct = async (e) => {

        e.preventDefault();
        if (!name || !price || !description || !selectedTags || !categories) {
            alert("Please fill in all fields");
            return;
        }

        if (!isAuthenticated) {
            alert("User not authenticated");
            return;
        }

        const formData = new FormData();

        formData.append("ProductName", name);
        formData.append("ProductDescription", description);
        formData.append("ProductPrice", price);
        formData.append("ProductTags", selectedTags.join(','));
        formData.append("ProductCategories", categories.join(','));
        formData.append("productImage", filename)

        axios
            .post("http://localhost:3001/products/createProduct", formData, {params: {UserId: user?.sub}})
            .then(response => {
                console.log(response.data);
                alert("Product created successfully");
                navigate("/")
            })
            .catch(error => {
                alert("Failed to create product. CHECK CONSOLE FOR DETAILS")
                console.error("Create product error", error);
            });
    };
    
    return (
        <div className="content-container">
            <div className="browse-text">
                <h1>Create Product</h1>
                <h4>List an item that you are selling. All fields are required.</h4>
            </div>
            <form onSubmit={handleCreateProduct} encType="multipart/form-data" name="create-form">
                <div className="info-grid">
                    <div className="info-grid-item">
                        <div className="average-input">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => (setName(e.target.value))}
                            />
                            <label for="input" placeholder="Name"></label>
                        </div>
                    </div>
                    <div className="info-grid-item">
                        <div className="average-input">
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => (setPrice(e.target.value))}
                            />
                            <label for="input" placeholder="Price"></label>
                        </div>
                    </div>
                    <div className="info-grid-item">
                        <div className="textarea-input">
                            <textarea
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe Your Product..."
                            />
                        </div>
                    </div>
                    <div className="info-grid-item">
                        <div className="upload-input">
                            <label htmlFor="file">Upload Product Image:</label>
                            <input 
                                type="file"
                                filename="productimage"
                                className="form-control-file"
                                onChange={onChangeFile}
                            />
                        </div>
                    </div>
                </div>
                <div className="category-assignment">
                    <div className="info-title">
                        <h4>Product Categories:</h4>
                        <p>What is your item? You must select at least one.</p>
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
                        <h4>Product Tags:</h4>
                        <p>Some users will directly search for items based on the businesses values and ownership. You can select the same as your business, or personalise the tags for each product. You must select at least one.</p>
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
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
  