import BrowseCard from "../components/BrowseCard";
import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
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
            <div className="test-buttons-home">
              <LoginButton/>
              <LogoutButton/>
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