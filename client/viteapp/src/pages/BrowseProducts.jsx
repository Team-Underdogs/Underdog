import { useState, useEffect } from "react";
import axios from "axios";

const BrowseProducts = () => {
    const [loading, setLoading] = useState(false);
    const [productsandservices, setproductsandservices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    return (
        <div>
            <h1>Browse Products</h1>
        </div>
    );
}

export default BrowseProducts;