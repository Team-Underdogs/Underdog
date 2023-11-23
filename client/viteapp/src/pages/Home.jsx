import BrowseCard from "../components/BrowseCard";
import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import BusinessExhibit from "../components/BusinessExhibit";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        setLoading(true);
        axios
        .get("http://localhost:3001/stores/getAllStores")
        .then((res) => {
            const sortedStores = res.data.data.sort((a, b) => {
            return new Date(b.dateAdded) - new Date(a.dateAdded);
            });
            setStores(sortedStores.slice(0, 4));
            setLoading(false);
        })
        .catch((err) => console.error(err));
    }, [])

    return (
        <div className="browse-container">
            <div className="browse-text">
                <h1>Shop With Purpose</h1>
                <h4>Start browsing for products or businesses that embody the values you want to support.</h4>
            </div>
            <div className="browse-options">
                <BrowseCard
                    image='../src/assets/business.jpeg'
                    title='Businesses'
                    link='/browse/business'
                />
                <BrowseCard
                     image='../src/assets/products.jpg'
                    title='Products & Services'
                    link='/browse/product' 
                />
            </div> 
            <div className="purpose">
                <h4>What sets you and your business apart? Is it your unique cultural identity, your LGBTQ+ pride, your gender, or your commitment to sustainability and charity? Join our marketplace of businesses, and let us help you connect with the audience you've been searching for.</h4>
            </div>
            <div className="suggested-businesses">
                {stores.slice(0, 4).map((store, index) => (
                    <BusinessExhibit
                        image="../src/assets/business.jpeg"
                        businessName={store.BusinessName}
                        tags={store.BusinessTags.slice(0, 2)}
                        key={index}
                    />
                ))}
            </div>
            <div className="test-buttons-home">
              <Link to={"/business/create"}>Create Business </Link>
              <Link to={"/product/create"}>Create Product </Link>
              <Link to={"/service/create"}>Create Service </Link>
              <Link to={"/business/update/654c3b948c52fbaf13e2be3b"}>test update </Link>
              <Link to={"/business/654c3b948c52fbaf13e2be3b"}>test browse </Link>
              <Link to={"/product/6551878a24021192cb5bc275"}>test browse product </Link>
            </div>
        </div>
    );
}

export default Home;