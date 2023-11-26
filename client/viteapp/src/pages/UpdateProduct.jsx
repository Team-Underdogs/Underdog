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

    const availableTags = {
        Regions: ['Northland', 'Auckland', 'Waikato', 'Bay of Plenty', 'Gisborne', 'Hawkes Bay', 'Taranaki', 'Whanganui', 'Wellington', 'Tasman', 'Nelson', 'Marlborough', 'West Coast', 'Canterbury', 'Otago', 'Southland'],
        Ethnicity: ['Maori', 'Pacific Islander', 'European', 'Asia', 'Africa', 'MENA'],
        Identity: ['Women', 'LGBTQIA'],
        Religion: ['Muslim', 'Jewish', 'Sikh', 'Buddhist', 'Hindu', 'Other'],
        Sustainability: ['Eco-Friendly', 'Vegan', 'Halal', 'Organic'],
        Health: ['Mental Health', 'Disabilities', 'Aged']
    };

    const availableCategories = ['Clothing', 'Accessories', 'Homeware', 'Technology', 'Cosmetic', 'Food', 'Sport', 'Pet', 'Other'];

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

    const handleTagChange = (tag) => {
        setProduct((prevProduct) => {
            const updatedTags = [...prevProduct.ProductTags];
            if (updatedTags.includes(tag)) {
                return {...prevProduct, ProductTags: updatedTags.filter((selectedTag) => selectedTag !== tag)};
            } else {
                return { ...prevProduct, ProductTags: [...updatedTags, tag]}
            }
        });
    };

    const handleCategoryChange = (category) => {
        setProduct((prevProduct) => {
          const updatedCategories = [...prevProduct.ProductCategories];
          if (updatedCategories.includes(category)) {
            return { ...prevProduct, ProductCategories: updatedCategories.filter((selectedCategory) => selectedCategory !== category) };
          } else {
            return { ...prevProduct, ProductCategories: [...updatedCategories, category] };
          }
        });
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
        <div className="content-container">
            <h1>Update Product</h1>
            {loading ? (
                <h1>Loading, please wait</h1>
            ) : (
                <div>
                    {Object.entries(product).map(([field, value]) => {
                        if (["_id", "UserId", "__v", "ProductTags", "ProductCategories", "Store"].includes(field)) {
                            return null;
                        }
                    return (
                        <div className="label-input-combo" key={field}>
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
                    <div>
                        <h1>Product Tags</h1>
                        {Object.entries(availableTags).map(([group, tags]) => (
                            <div className="tag-groups" key={group}>
                                <h3 className="group-label">Product Tags: {group}</h3>
                                <div className="tag-rows">
                                {tags.map((tag) => (
                                <div className="tag-select-container" key={tag}>
                                    <input
                                    className="tag-checkbox"
                                    type="checkbox"
                                    id={tag}
                                    value={tag}
                                    checked={product.ProductTags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                    />
                                    <label htmlFor={tag}>{tag}</label>
                                </div>
                            ))}
                            </div>
                            </div>
                    ))}
                    </div>
                    <div>
                        <h1>Product Categories</h1>
                        <div className="tag-rows">
                        {availableCategories.map((category) => (
                        <div className="tag-select-container" key={category}>
                            <input
                            className="tag-checkbox"
                            type="checkbox"
                            id={category}
                            value={category}
                            checked={product.ProductCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            />
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                    </div>
                    </div>
                    <button onClick={handleUpdateProduct}>Save</button>
                </div>
            )}
        </div>
    );
}

export default UpdateProduct;