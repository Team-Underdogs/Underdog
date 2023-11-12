import { Link } from 'react-router-dom';

const ServiceCard = ({ serviceID, serviceName, businessName, price, image }) => {
    return (
        <div className="servicecard-container">
            <Link to={serviceID}>
                <img src={image} />
                <div className="servicecard-textbanner">
                    <p className="servicecard-title">{serviceName}</p>
                    <p className="servicecard-business">{businessName}</p>
                </div>
                <p className="servicecard-price">{price}</p>
            </Link>
        </div>
    )
}

export default ServiceCard;