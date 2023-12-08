import BrowseCard from "../components/BrowseCard";
import { Link } from "react-router-dom";
import BusinessExhibit from "../components/BusinessExhibit";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    
    useEffect(()=>{
        setLoading(true);
        axios
        .get("http://localhost:3001/stores/getAllStores")
        .then((res1) => {
            const sortedStores = res1.data.data.slice(-5);
            setStores(sortedStores);
            return axios.get("http://localhost:3001/products/getAllProducts");
        })
        .then((res2) => {
            const sortedProducts = res2.data.data.slice(-5);
            setProducts(sortedProducts);
            return axios.get("http://localhost:3001/services/getAllServices");
        }).then((res3) => {
            const sortedServices = res3.data.data.slice(-5);
            setServices(sortedServices);
            setLoading(false);
        })
        .catch((err) => console.error(err));
    }, [])

    return (
        <div className="browse-container">
            <div className="browse-text-h">
                <div className="background-overlay"></div>
                <h1>Shop With Purpose</h1>
                <h4>Start browsing for products or businesses that embody the values you want to support.</h4>
            </div>
            <div className="browse-options">
                <BrowseCard
                    image='../src/assets/business.jpeg'
                    title='Businesses'
                    link='/browse/business'
                />
                <BrowseCard
                     image='../src/assets/products.jpg'
                    title='Products & Services'
                    link='/browse/product' 
                />
            </div> 
            <div className="purpose">
                <h4>What sets you and your business apart? Is it your unique cultural identity, your LGBTQ+ pride, your gender, or your commitment to sustainability and charity? Join our marketplace of businesses, and let us help you connect with the audience you've been searching for.</h4>
            </div>
            <div className="exhibition">
                <div className="bus-exhib">
                    <p className="exhib-statement">Take a look at some of our newest businesses that have joined our marketplace!</p>
                    <div className="suggested-items">
                    {stores.map((store, index) => (
                        <BusinessExhibit
                            image={`http://localhost:3001/uploads/${store.BusinessImage}`}
                            name={store.BusinessName}
                            tags={store.BusinessTags.slice(-2)}
                            key={index}
                            link={`/business/${store._id}`}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <div className="exhibition">
                <div className="pro-exhib">
                    <p className="exhib-statement">Be the first to see our newest products!</p>
                    <div className="suggested-items">
                    {products.map((product, index) => (
                        <BusinessExhibit
                            image={`http://localhost:3001/uploads/${product.ProductImage}`}
                            name={product.ProductName}
                            tags={product.ProductTags.slice(-2)}
                            key={index}
                            link={`/product/${product._id}`}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <div className="exhibition">
                <div className="ser-exhib">
                    <p className="exhib-statement">Or... be the first to see our newest services!</p>
                    <div className="suggested-items">
                    {services.map((service, index) => (
                        <BusinessExhibit
                            image={`http://localhost:3001/uploads/${service.ServiceImage}`}
                            name={service.ServiceName}
                            tags={service.ServiceTags.slice(-2)}
                            key={index}
                            link={`/service/${service._id}`}
                        />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;