import { Link } from 'react-router-dom';

const BrowseCards = ({ image, title, link }) => {
    return (
        <div className="browsecard-container">
            <Link to={link}>
                <div className="browseCard">
                    <img src={image} />
                    <div className="bc-title">
                        <p>Browse {title}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BrowseCards;