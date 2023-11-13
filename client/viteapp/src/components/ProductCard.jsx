import { Link } from 'react-router-dom';

const ProductCard = ({ productID, productName, businessName, price, image }) => {
    return (
        <div className="productcard-container">
            <Link to={productID}>
                <img src={image} />
                <div className="productcard-textbanner">
                    <p className="productcard-title">{productName}</p>
                    <p className="productcard-business">{businessName}</p>
                </div>
                <p className="productcard-price">{price}</p>
            </Link>
        </div>
    )
}

export default ProductCard;