import { useState } from "react";
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react";

const CreateProduct = () => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productTags, setProductTags] = useState("");
    const [store, setStore] = useState("");

    const { user, isAuthenticated, isLoading } = useAuth0();

    const handleSaveProduct = () => {
        const data = {
            ProductName: productName,
            ProductDescription: productDescription,
            ProductPrice: productPrice,
            ProductTags: productTags.split(',').map(tag => tag.trim()),
            StoreId: store,
            UserId: user.sub
        };
        axios
            .post("http://localhost:3001/products/createProduct", data)
            .then(response => {
                console.log(response.data);
                alert("Product created successfully");
            })
            .catch((error) => {
                alert("ERROR, CHECK CONSOLE FOR DETAILS");
                console.log(error);
            });
    };

    return (
        <div>
            <div>
                <label>Product Name</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>
            <div>
                <label>Product Description</label>
                <input
                    type="text"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Product Price</label>
                <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
            </div>
            <div>
                <label>Product Tags</label>
                <input
                    type="text"
                    value={productTags}
                    onChange={(e) => setProductTags(e.target.value)}
                />
            </div>
            <div>
                <label>Store ID</label>
                <input
                    type="text"
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleSaveProduct}>Create product</button>
            </div>
        </div>
    );
};

export default CreateProduct;