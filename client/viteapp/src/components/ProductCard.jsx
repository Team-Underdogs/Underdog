const ProductCard = ({ productID, productName, businessName, price, image }) => {
    return (
        <div className="productcard-container">
            <img src={image} />
            <div className="productcard-textbanner">
                <p className="productcard-title">{productName}</p>
                <p className="productcard-business">{businessName}</p>
            </div>
            <p className="productcard-price">{price}</p>
        </div>
    )
}

export default ProductCard; 