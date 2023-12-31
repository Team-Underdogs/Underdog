import { useState, useEffect } from "react";
import axios from "axios";
import CategoriesBanner from "../components/CategoriesMenu";
import TagsBanner from "../components/tagsMenu";
import ProductCard from "../components/ProductCard";
import ServiceCard from "../components/ServiceCard";
import { Link } from 'react-router-dom';

const BrowseProducts = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        setLoading(true);
        const tagsParam = Object.values(selectedTags).flat().join(',');
        axios
          .get("http://localhost:3001/products/getAllProducts")
          .then((res1) => {
            setProducts(res1.data.data);
            return axios.get("http://localhost:3001/services/getAllServices");
          })
          .then((res2) => {
            setServices(res2.data.data);
            return axios.get(`http://localhost:3001/products/filterProducts?category=${selectedCategory}&tags=${tagsParam}`);
          })
          .then((res3) => {
            setFilteredProducts(res3.data);
            return axios.get(`http://localhost:3001/services/filterServices?category=${selectedCategory}&tags=${tagsParam}`);
          })
          .then((res4) => {
            setFilteredServices(res4.data);
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
            <div className="browse-text-bps">
              <div className="background-overlay"></div>
                <h1>Browse By Products & Services</h1>
                <h4>Explore unique products sourced by our diverse communities within New Zealand!</h4>
            </div>
            <CategoriesBanner onCategorySelect={selectCategoryFilter} />
            <div className="browse-body">
                <TagsBanner onTagsSelect={selectTagFilters} />
                <div className="browse-bps-cards">
                    {filteredProducts.map((product, index)=>(
                        <Link to={`/product/${product._id}`} key={index}>
                            <ProductCard 
                            productName={product.ProductName}
                            businessName={product.Store.BusinessName}
                            image={`http://localhost:3001/uploads/${product.ProductImage}`}
                            price={`$ ${product.ProductPrice}`}
                            className='card'
                        />
                        </Link>
                    ))}
                    {filteredServices.map((service, index)=>(
                        <Link to={`/service/${service._id}`} key={index}>
                            <ServiceCard 
                            serviceName={service.ServiceName}
                            businessName={service.Store.BusinessName}
                            image={`http://localhost:3001/uploads/${service.ServiceImage}`}
                            price={`$ ${service.ServicePrice}`}
                            className='card'
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BrowseProducts;