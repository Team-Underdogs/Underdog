import { Link } from 'react-dom';

const BusinessExhibit = ({ image, name, tags, link }) => {
    return (
        <Link to={link}>
            <div className="store-card">
                <img src={image} />
                <div className="store-card-text">
                    <p className="storeTitle">{name}</p>
                    <div className="tags-collection">
                        <div className="singular-tag-exhibit">
                            {tags.map((tag, index)=>(
                                <p key={index}>{tag}</p>
                            ))}
                        </div>
                    </div> 
                </div>
            </div>
        </Link>
    )
}

export default BusinessExhibit;