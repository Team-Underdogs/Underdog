import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import GeneralButton from "../components/GeneralButton";

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

    const handlePayment = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/products/checkout/${id}`, {StoreId: store._id} );
            window.location.href = response.data.sessionUrl
            console.log(response.data)
        } catch (error) {
            console.error({ message: error })
        }
    }

    const handleDeleteProduct = async () => {
        
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");

        if (!isConfirmed) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3001/products/deleteProduct/${product._id}`);
            console.log("Product deleted successfully");
            alert("Product deleted successfully");
            navigate("/")
        } catch (error) {
            alert("Failed to delete product. CHECK CONSOLE FOR DETAILS");
            console.error("Delete product error:", error)
        }
    };

    return (
        <div className="item-container">
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div className="product-detail-product-section">
                    <h1>Price: ${product.ProductPrice}</h1>
                    {user?.sub == product.UserId ? (
                        <div className="button section">
                            <GeneralButton 
                            text={"Update product"} 
                            link={`/product/update/${product._id}`}
                            />
                            <button
                            onClick={handleDeleteProduct}
                            className="delete-button"
                            >
                            Delete product
                            </button>
                        </div>
                        ) : (null)
                        }
                    <h3>{product.ProductName}</h3>
                    <h3>{store.BusinessName}</h3>
                    <p>{product.ProductDescription}</p>
                    <button onClick={handlePayment}>Purchase</button>
                    <div className="item-image">
                        <img src="../src/assets/products.jpg" />
                    </div>
                    {product && product.ProductImage && (
                        <div className="item-main-image">
                            <img src={`http://localhost:3001/uploads/${product.ProductImage}`} alt="..." />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductDetail;