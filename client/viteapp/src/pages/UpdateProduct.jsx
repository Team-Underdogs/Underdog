import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const UpdateProduct = () => {
    const [product, setProduct] = useState({
        ProductName: "",
        ProductPrice: "",
        ProductDescription: "",
        ProductTags: [],
        ProductCategories: []
    })

    const { user, isAuthenticated } = useAuth0();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/products/getProduct/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("Failed to get product. CHECK CONSOLE FOR DETAILS");
                console.error("Get product error: ", error);
            })
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleUpdateProduct = () => {

        if (!product.ProductName || !product.ProductPrice || !product.ProductDescription || !product.ProductTags || !product.ProductCategories) {
            alert("Please fill in all fields");
            return;
        }

        if (!isAuthenticated) {
            alert("User not authenticated");
            return;
        }

        setLoading(true);

        axios
            .put(`http://localhost:3001/products/updateProduct/${id}`, product, {params: {UserId: user.sub}})
            .then(res => {
                setLoading(false);
                console.log(res.data);
                alert("Product updated successfully");
            })
            .catch(error => {
                setLoading(false);
                alert("Failed to update product. CHECK CONSOLE FOR DETAILS")
                console.error("Update product error: ", error)
            });
    };
    
    return (
        <div>
            <h1>Update Product</h1>
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div>
                    {Object.entries(product).map(([field, value]) => {
                        if (["_id", "UserId", "__v"].includes(field)) {
                            return null;
                        }
                    return (
                        <div key={field}>
                            <label>{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={value}
                                onChange={handleInputChange}
                            />
                        </div>
                    );
                    })}
                    <button onClick={handleUpdateProduct}>Save</button>
                </div>
            )}
        </div>
    );
}

export default UpdateProduct;