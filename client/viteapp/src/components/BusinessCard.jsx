import { Link } from 'react-router-dom';

const BusinessCard = ({ businessID, businessName, city, suburb, image }) => {
    return (
        <div className="businesscard-container">
            <Link to={businessID}>
                <img src={image} />
                <div className="businesscard-textbanner">
                    <p className="businesscard-title">{businessName}</p>
                    <p className="businesscard-location">{suburb}, {city}</p>
                </div>
            </Link>
        </div>
    )
}

export default BusinessCard;