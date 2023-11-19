import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import CategoriesBanner from "../components/CategoriesMenu";
import TagsBanner from "../components/TagsMenu";
import BusinessCard from "../components/BusinessCard";

const BrowseBusiness = () => {
    const [loading, setLoading] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:3001/stores/getAllStores")
            .then((res) => {
                setBusinesses(res.data.data);
                return axios.get(`http://localhost:3001/stores/filterBusinesses?category=${selectedCategory}`);
            })
            .then((res2) => {
                setFilteredBusinesses(res2.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Axios Error:", err.response ? err.response.data : err.message);
                setLoading(false);
            });
    }, [selectedCategory]);  
    
    const selectCategoryFilter = (category) => {
        setSelectedCategory(category)
    }

    return (
        <div className="browse-container">
            <div className="browse-text">
                <h1>Browse Our Businesses</h1>
                <h4>Explore our diverse marketplace of locally owned businesses!</h4>
            </div>
            <CategoriesBanner onCategorySelect={selectCategoryFilter} />
            <div className="browse-body">
                <TagsBanner />
                <div className="browse-bps-cards">
                {filteredBusinesses.map((business, index) => ( 
                    <Link to={`/business/${business._id}`} key={index}>
                        <BusinessCard 
                        businessName={business.BusinessName}
                        city={business.City}
                        suburb={business.Suburb}
                        image='../src/assets/business.jpeg'
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
