const BusinessCard = ({ businessName, city, suburb, image }) => {
    return (
        <div className="businesscard-container">
            <img src={image} />
            <div className="businesscard-textbanner">
                <p className="businesscard-title">{businessName}</p>
                <p className="businesscard-location">{suburb}, {city}</p>
            </div> 
        </div>
    )
}

export default BusinessCard;