import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const [store, setStore] = useState({});

    const { user, isAuthenticated } = useAuth0();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products/getProduct/${id}`);
                setProduct(response.data);

                axios.get(`http://localhost:3001/stores/getStore/${response.data.Store}`)
                    .then((res) => {
                        setStore(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                        alert("Failed to get store. CHECK CONSOLE FOR DETAILS");
                        console.error("Get store error:", error);
                    });
            } catch (error) {
                setLoading(false);
                alert("Failed to get product. CHECK CONSOLE FOR DETAILS");
                console.error("Get product error:", error);
            }
        };

        getData();
        
    }, [id]);

    return (
        <div className="product-detail">
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div className="product-detail-product-section">
                    <h1>Price: ${product.ProductPrice}</h1>
                    <h3>{product.ProductName}</h3>
                    <h3>{store.BusinessName}</h3>
                    <p>{product.ProductDescription}</p>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;