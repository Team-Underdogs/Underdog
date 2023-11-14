import { useState, useEffect } from "react";
import axios from "axios";
import CategoriesBanner from "../components/CategoriesMenu";
import TagsBanner from "../components/TagsMenu";
import BusinessCard from "../components/BusinessCard";

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
            <div className="browse-body">
                <TagsBanner />
                <div className="browse-bps-cards">
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                    <BusinessCard 
                        businessName='Test Business'
                        city='City'
                        suburb='Suburb'
                        image='../src/assets/business.jpeg'
                        className='card'
                    />
                </div>
            </div>
        </div>
    );
}

export default BrowseBusiness;