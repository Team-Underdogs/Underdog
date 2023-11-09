import { useState, useEffect } from "react";
import axios from "axios";
import CategoriesBanner from "../components/categories";

const BrowseBusiness = () => {
    const [loading, setLoading] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    return (
        <div className="browse-container">
            <div className="browse-text">
                <h1>Browse Our Businesses</h1>
                <h4>Explore our diverse marketplace of locally owned businesses!</h4>
            </div>
            <CategoriesBanner />
        </div>
    );
}

export default BrowseBusiness;