import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import GeneralButton from "../components/GeneralButton";
import Banner from '../components/Banner';
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ServiceCard from "../components/ServiceCard";

const BusinessDetail = () => {
    const [business, setBusiness] = useState({});
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);

    const { user, isAuthenticated } = useAuth0();

    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/stores/getStore/${id}`)
            .then((res) => {
                setBusiness(res.data);
                return axios.get(`http://localhost:3001/products/getProductsByStore/${id}`);
            })
            .then((res2) => {
                console.log(res2)
                setProducts(res2.data)
                return axios.get(`http://localhost:3001/services/getServicesByStore/${id}`)
            })
            .then((res3) => {
                setServices(res3.data)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("Failed to get store. CHECK CONSOLE FOR DETAILS")
                console.error("Get store error:", error)
            })
    }, [id]);

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleDeleteBusiness = async () => {

        const isConfirmed = window.confirm("This will delete your business and all products/services. Are you sure you want to delete?")

        if (!isConfirmed) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3001/products/deleteAssociatedProducts`, { params: { storeId: business._id } });
            console.log("Products deleted successfully.");
    
            await axios.delete(`http://localhost:3001/services/deleteAssociatedServices`, { params: { storeId: business._id } });
            console.log("Services deleted successfully.");
    
            await axios.delete(`http://localhost:3001/stores/deleteStore/${business._id}`);
            console.log("Store deleted successfully.");

            alert("Succesfully deleted business and products");
            navigate("/")
        } catch (error) {
            alert("Failed to delete. CHECK CONSOLE FOR DETAILS");
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="content-container-bs">
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div className="business-detail-business-section">
                    {business && business.BusinessBanner && (
                        <Banner image={`http://localhost:3001/uploads/${business.BusinessBanner}`} alt="..." />
                    )}
                    <div className="business-detail-info">
                        <h1>{business.BusinessName}</h1>
                        {user?.sub == business.UserId ? (
                            <div className="button section">
                            <GeneralButton 
                            text={"Update business"} 
                            link={`/business/update/${business._id}`}
                            />
                            <GeneralButton 
                            text={"Add new product"} 
                            link={`/product/create`}
                            />
                            <GeneralButton 
                            text={"Add new service"} 
                            link={`/service/create`}
                            />
                            <button
                            className="delete-button"
                            onClick={handleDeleteBusiness}
                            >
                            Delete business
                            </button>
                        </div>
                        ) : (null)
                        }
                        {business.BusinessTags && business.BusinessTags.length > 0 && (
                            <p>{business.BusinessTags.join(" • ")}</p>
                        )}
                        <p className="business-detail-info-desc">{business.BusinessDescription}</p>
                    </div>
                    <div className="business-detail-contact">
                        <p>Address: {business.Address}, {business.Suburb}, {business.City}</p>
                        <p>{business.Email}</p>
                        <p>{business.Phone}</p>
                        <p>{business.LinkWebsite}</p>
                    </div>
                    <div className="business-detail-links">
                        <a href={business.LinkFB}>fb icon</a>
                        <a href={business.LinkTwitter}>insta icon</a>
                        <a href={business.LinkInstagram}>twitter icon</a>
                    </div>
                    <button onClick={handleToggle}>toggle</button>
                    <div className="browse-body">
                    <div className="browse-bps-cards">
                            {toggle ? (
                                products.map((product, index) => (
                                <Link to={`/product/${product._id}`} key={index}>
                                    <ProductCard
                                    productName={product.ProductName}
                                    businessName={product.Store.BusinessName}
                                    image={`http://localhost:3001/uploads/${product.ProductImage}`}
                                    price={`$ ${product.ProductPrice}`}
                                    className='card'
                                    />
                                </Link>
                            ))) : (
                                services.map((service, index) => (
                                    <Link to={`/service/${service._id}`} key={index}>
                                        <ServiceCard 
                                        serviceName={service.ServiceName}
                                        businessName={service.Store.BusinessName}
                                        image={`http://localhost:3001/uploads/${service.ServiceImage}`}
                                        price={`$ ${service.ServicePrice}`}
                                        className='card'
                                    />
                                    </Link>
                                ))
                            )}
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BusinessDetail;