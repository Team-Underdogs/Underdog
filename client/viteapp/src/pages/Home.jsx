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
            <Link to={"/business/update/654c3b948c52fbaf13e2be3b"}>test update</Link>
        </div>
    );
}

export default Home;