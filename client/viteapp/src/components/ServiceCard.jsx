const ServiceCard = ({ serviceID, serviceName, businessName, price, image }) => {
    return (
        <div className="servicecard-container">
            <img src={image} />
            <div className="servicecard-textbanner">
                <p className="servicecard-title">{serviceName}</p>
                <p className="servicecard-business">{businessName}</p>
            </div>
            <p className="servicecard-price">{price}</p>
        </div>
    )
}

export default ServiceCard;