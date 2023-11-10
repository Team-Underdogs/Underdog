import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [categories, setCategories] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {user, isAuthenticated} = useAuth0();

    const handleCreateProduct = () => {
        if (!name || !price || !description || !tags || !categories) {
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
            ProductTags: tags,
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
        <div>
            <h1>Create Product</h1>
            <div>
                <label>Product Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => (setName(e.target.value))}
                />
            </div>
            <div>
                <label>Product Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => (setPrice(e.target.value))}
                />
            </div>
            <div>
                <label>Product Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => (setDescription(e.target.value))}
                />
            </div>
            <div>
                <label>Product Tags</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => (setTags(e.target.value))}
                />
            </div>
            <div>
                <label>Product Categories</label>
                <input
                    type="text"
                    value={categories}
                    onChange={(e) => (setCategories(e.target.value))}
                />
            </div>
            <div>
                <button onClick={handleCreateProduct}>Create Product</button>
            </div>
        </div>
    );
}

export default CreateProduct;