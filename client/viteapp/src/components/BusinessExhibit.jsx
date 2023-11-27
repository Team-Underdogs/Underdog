const BusinessExhibit = ({ image, businessName, tags }) => {
    return (
        <div className="store-card">
            <img src={image} />
            <div className="store-card-text">
                <p className="storeTitle">{businessName}</p>
                <div className="tags-collection">
                    <div className="singular-tag-exhibit">
                        {tags.map((tag, index)=>(
                            <p key={index}>{tag}</p>
                        ))}
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default BusinessExhibit;