import { useState, useEffect } from "react";
import axios from "axios";

const BrowseBusiness = () => {
    const [loading, setLoading] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    return (
        <div>
            <h1>Browse Businesses</h1>
        </div>
    );
}

export default BrowseBusiness;