import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import BusinessCard from '../components/BusinessCard';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';

const SearchResults = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const keyword = params.get('keyword');
    const [loading, setLoading] = useState(false); 
    const [businesses, setBusinesses] = useState([]);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [allItems, setAllItems] = useState([]);

    useEffect(()=>{
      setLoading(true);
      axios.get("http://localhost:3001/stores/getAllStores")
      .then((res1)=>{
        setBusinesses(res1.data.data)
        return axios.get("http://localhost:3001/products/getAllProducts")
      })
      .then((res2)=>{
        setProducts(res2.data.data)
        return axios.get("http://localhost:3001/services/getAllServices")
      })
      .then((res3)=>{
        setServices(res3.data.data)
        setLoading(false);
      })
    }, [])

    useEffect(() => {
      if (category === 'businesses') {
        const filteredBusinesses = businesses.filter(business => business.BusinessName.toLowerCase().includes(keyword.toLowerCase()));
        setFilteredBusinesses(filteredBusinesses);
      } 
      else if (category === 'products') {
        const filteredProducts = products.filter(product => product.ProductName.toLowerCase().includes(keyword.toLowerCase()));
        setFilteredProducts(filteredProducts);
      }
      else if (category === 'services') {
        const filteredServices = services.filter(service => service.ServiceName.toLowerCase().includes(keyword.toLowerCase()));
        setFilteredServices(filteredServices);
      }
    }, [businesses, products, services, category, keyword]);

    const getFilteredResults = () => {
      if (category === 'businesses') {
        return filteredBusinesses.map((business, index) => (
          <Link to={`/business/${business._id}`} key={index}>
            <BusinessCard
              businessName={business.BusinessName}
              city={business.City}
              suburb={business.Suburb}
              image='../src/assets/business.jpeg'
              className='card'
            />
          </Link>
        ), console.log(filteredBusinesses))}
        else if (category === 'products') {
          return filteredProducts.map((product, index) => (
            <Link to={`/products/${product._id}`} key={index}>
              <ProductCard
                productName={product.ProductName}
                businessName={product.Store.BusinessName}
                image='../src/assets/products.jpg'
                price={`$ ${product.ProductPrice}`}
                className='card'
              />
            </Link>
        ), console.log(filteredProducts))} 
        else if (category === 'services') {
          return filteredServices.map((service, index) => (
            <Link to={`/services/${service._id}`} key={index}>
              <ServiceCard
                serviceName={service.ServiceName}
                businessName={service.Store.BusinessName}
                image='../src/assets/products.jpg'
                price={`$ ${service.ServicePrice}`}
                className='card'
              />
            </Link>
        ), 
        console.log(filteredServices))
      }
      return null;
    };

    useEffect(()=>{
      if (category === 'all'){

        const filteredBusinesses = businesses.filter(business => business.BusinessName.toLowerCase().includes(keyword.toLowerCase()));

        const filteredProducts = products.filter(product => product.ProductName.toLowerCase().includes(keyword.toLowerCase()));

        const filteredServices = services.filter(service => service.ServiceName.toLowerCase().includes(keyword.toLowerCase()));

        const updatedAllItems = [
          (filteredBusinesses || []).map((business, index) => (
            <Link to={`/business/${business._id}`} key={index}>
              <BusinessCard
                businessName={business.BusinessName}
                city={business.City}
                suburb={business.Suburb}
                image='../src/assets/business.jpeg'
                className='card'
              />
            </Link>
          )),
          (filteredProducts || []).map((product, index) => (
            <Link to={`/products/${product._id}`} key={index}>
              <ProductCard
                productName={product.ProductName}
                businessName={product.Store.BusinessName}
                image='../src/assets/products.jpg'
                price={`$ ${product.ProductPrice}`}
                className='card'
              />
            </Link>
          )),
          (filteredServices || []).map((service, index) => (
            <Link to={`/services/${service._id}`} key={index}>
              <ServiceCard
                serviceName={service.ServiceName}
                businessName={service.Store.BusinessName}
                image='../src/assets/products.jpg'
                price={`$ ${service.ServicePrice}`}
                className='card'
              />
            </Link>
          ))
        ];
        console.log(updatedAllItems);
        setAllItems(updatedAllItems);
      }
    }, [filteredBusinesses, filteredProducts, filteredServices, category, allItems])
    
    const renderedItems = category === 'all' ? allItems : getFilteredResults();
    
    return(
        <div className='searchResults-container'>
            <div className="browse-text">
                <h1>Search Results</h1>
                {category === 'all' ? (
                  <h4>All items associated with '{keyword}'</h4>
                ) : (
                  <h4>All {category} associated with '{keyword}'</h4>
                )}
            </div>
            <div className='browse-bps-cards'>
              {renderedItems}
            </div>
        </div>
    )
}

export default SearchResults;