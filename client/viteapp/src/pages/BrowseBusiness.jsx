import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import CategoriesBanner from "../components/CategoriesMenu";
import TagsBanner from "../components/tagsMenu";
import BusinessCard from "../components/BusinessCard";

const BrowseBusiness = () => {
    const [loading, setLoading] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        setLoading(true);
        const tagsParam = Object.values(selectedTags).flat().join(',');
        axios.get("http://localhost:3001/stores/getAllStores")
            .then((res) => {
                setBusinesses(res.data.data);
                return axios.get(`http://localhost:3001/stores/filterBusinesses?category=${selectedCategory}&tags=${tagsParam}`);
            })
            .then((res2) => {
                setFilteredBusinesses(res2.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Axios Error:", err.response ? err.response.data : err.message);
                setLoading(false);
            });
    }, [selectedCategory, selectedTags]);  
    
    const selectCategoryFilter = (category) => {
        setSelectedCategory(category)
    }

    const selectTagFilters = (tags) => {
        setSelectedTags(tags)
    }

    return (
        <div className="browse-container">
            <div className="browse-text-bb">
                <div className="background-overlay"></div>
                <h1>Browse Our Businesses</h1>
                <h4>Explore our diverse marketplace of locally owned businesses!</h4>
            </div>
            <CategoriesBanner onCategorySelect={selectCategoryFilter} />
            <div className="browse-body">
                <TagsBanner onTagsSelect={selectTagFilters} />
                <div className="browse-bps-cards">
                {filteredBusinesses.map((business, index) => ( 
                    <Link to={`/business/${business._id}`} key={index}>
                        <BusinessCard 
                        businessName={business.BusinessName}
                        city={business.City}
                        suburb={business.Suburb}
                        image={`http://localhost:3001/uploads/${business.BusinessImage}`}
                        className='card'
                        />
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
}

export default BrowseBusiness;