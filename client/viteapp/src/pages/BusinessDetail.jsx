import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import GeneralButton from "../components/GeneralButton";
import Banner from '../components/Banner';
import { FaPlus } from 'react-icons/fa';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Button from '@mui/material-next/Button';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
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
        <div className="content-container">
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div className="business-detail-business-section">
                    {business && business.BusinessBanner && (
                        <Banner image={`http://localhost:3001/uploads/${business.BusinessBanner}`} alt="..." />
                    )}
                    <div className="business-detail-info">
                        <h1>{business.BusinessName}</h1>
                        {business.BusinessTags && business.BusinessTags.length > 0 && (
                            <p>{business.BusinessTags.join(" • ")}</p>
                        )}
                        {user?.sub == business.UserId ? (
                            <div className="button-section">
                                <GeneralButton 
                                icon={<FaEdit />}
                                text={"Update business"} 
                                link={`/business/update/${business._id}`}
                                />
                                <GeneralButton 
                                icon={<FaPlus />}
                                text={"Add new product"} 
                                link={`/product/create`}
                                />
                                <GeneralButton 
                                icon={<FaPlus />}
                                text={"Add new service"} 
                                link={`/service/create`}
                                />
                                <Button variant="filledTonal" onClick={handleDeleteBusiness} sx={{ backgroundColor: "rgb(197, 77, 77)", "&:hover": { backgroundColor: "rgb(224, 102, 102)" }}}>
                                <FaTrash />
                                Delete Business
                                </Button>
                            </div>
                        ) : (null) }
                        <p className="business-detail-info-desc">{business.BusinessDescription}</p>
                    </div>
                    <div className="business-detail-contact">
                        <p>{business.Address}, {business.Suburb}, {business.City}</p>
                        <div className="contact-link">
                            <FaMailBulk />
                            <p>{business.Email}</p>
                        </div>
                        <div className="contact-link">
                            <FaPhone />
                            <p>{business.Phone}</p>
                        </div>
                        <div className="contact-link">
                            <FaRegArrowAltCircleRight />
                            <a href={business.LinkWebsite}>{business.LinkWebsite}</a>
                        </div>
                    </div>
                    <div className="external-links">
                        {business.LinkFB !== "" && (
                            <a href={business.LinkFB} target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </a>
                        )}
                        {business.LinkInstagram !== "" && (
                            <a href={business.LinkInstagram} target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                        )}
                        {business.LinkTwitter !== "" && (
                            <a href={business.LinkTwitter} target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                        )}
                    </div>
                    <button className="general-button" onClick={handleToggle}>Now viewing: {toggle ? "Products" : "Services"}</button>
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