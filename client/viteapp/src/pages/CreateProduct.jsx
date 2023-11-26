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

    const {user, isAuthenticated} = useAuth0();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    const handleCreateProduct = () => {
        if (!name || !price || !description || !selectedTags || !categories) {
            alert("Please fill in all fields");
            return;
        }

        if (!isAuthenticated) {
            alert("User not authenticated");
            return;
        }

        const data = {
            ProductName: name,
            ProductDescription: description,
            ProductPrice: price,
            ProductTags: selectedTags,
            ProductCategories: categories,
        }

        axios
            .post("http://localhost:3001/products/createProduct", data, {params: {UserId: user.sub}})
            .then(response => {
                console.log(response.data);
                alert("Product created successfully");
            })
            .catch(error => {
                alert("Failed to create product. CHECK CONSOLE FOR DETAILS")
                console.error("Create product error", error);
            });
    };
    
    return (
        <div className="content-container">
            <h1>Create Product</h1>
            <div className="label-input-combo">
                <label>Product Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => (setName(e.target.value))}
                />
            </div>
            <div className="label-input-combo">
                <label>Product Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => (setPrice(e.target.value))}
                />
            </div>
            <div className="label-input-combo">
                <label>Product Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => (setDescription(e.target.value))}
                />
            </div>
            <h2>Product Tags</h2>
            {Object.entries(availableTags).map(([group, tags]) => (
                <div className="tag-groups" key={group}>
                    <h3 className="group-label">Product Tags: {group}</h3>
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
            <h2>Product Categories</h2>
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
                <button onClick={handleCreateProduct}>Create Product</button>
            </div>
        </div>
    );
}

export default CreateProduct;