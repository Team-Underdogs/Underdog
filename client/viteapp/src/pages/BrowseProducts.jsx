import { useState, useEffect } from "react";
import axios from "axios";
import CategoriesBanner from "../components/CategoriesMenu";
import TagsBanner from "../components/TagsMenu";
import ProductCard from "../components/ProductCard";
import ServiceCard from "../components/ServiceCard";

const BrowseProducts = () => {
    const [loading, setLoading] = useState(false);
    const [productsandservices, setproductsandservices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    return (
        <div className="browse-container">
            <div className="browse-text">
                <h1>Browse By Products & Services</h1>
                <h4>Explore unique products sourced by our diverse communities within New Zealand!</h4>
            </div>
            <CategoriesBanner />
            <div className="browse-body">
                <TagsBanner />
                <div className="browse-bps-cards">
                    <ProductCard 
                        productName='Test Product'
                        businessName='Test Business'
                        image='../src/assets/products.jpg'
                        price='$0.00'
                        className='card'
                    />
                    <ServiceCard 
                        serviceName='Test Service'
                        businessName='Test Business'
                        image='../src/assets/products.jpg'
                        price='$0.00'
                        className='card'
                    />
                </div>
            </div>
        </div>
    );
}

export default BrowseProducts;