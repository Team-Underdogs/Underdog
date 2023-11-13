import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const CreateService = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [categories, setCategories] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {user, isAuthenticated} = useAuth0();
    
    const handleCreateService = () => {
        if (!name || !price || !description || !tags || !categories) {
            alert("Please fill in all fields");
            return;
        }

        if (!isAuthenticated) {
            alert("User not authenticated");
            return;
        }

        const data = {
            ServiceName: name,
            ServiceDescription: description,
            ServicePrice: price,
            ServiceTags: tags,
            ServiceCategories: categories
        }

        axios
            .post("http://localhost:3001/services/createService", data, {params: {UserId: user.sub}})
            .then(response => {
                console.log(response.data);
                alert("Service created successfully");
            })
            .catch(error => {
                alert("Failed to create service. CHECK CONSOLE FOR DETAILS")
                console.error("Create service error", error)
            });
    };
    
    return (
        <div>
            <h1>Create Service</h1>
            <div>
                <label>Service Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => (setName(e.target.value))}
                />
            </div>
            <div>
                <label>Service Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => (setPrice(e.target.value))}
                />
            </div>
            <div>
                <label>Service Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => (setDescription(e.target.value))}
                />
            </div>
            <div>
                <label>Service Tags</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => (setTags(e.target.value))}
                />
            </div>
            <div>
                <label>Service Categories</label>
                <input
                    type="text"
                    value={categories}
                    onChange={(e) => (setCategories(e.target.value))}
                />
            </div>
            <div>
                <button onClick={handleCreateService}>Create Service</button>
            </div>
        </div>
        
    );
}

export default CreateService;