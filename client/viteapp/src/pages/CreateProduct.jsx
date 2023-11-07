import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [categories, setCategories] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Create Product</h1>
        </div>
    );
}

export default CreateProduct;