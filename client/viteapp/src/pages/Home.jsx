import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
    return (
        <div>
            <h1>Homepage</h1>
            <LoginButton/>
            <LogoutButton/>
            <Link to={"/business/create"}>Create Business</Link>
            <Link to={"/products/create"}>Create Product</Link>
            <Link to={"/services/create"}>Create Service</Link>
        </div>
    );
}

export default Home;