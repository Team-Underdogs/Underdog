import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Homepage</h1>
            <LoginButton/>
            <LogoutButton/>
            <Link to={'/user/profile'}>profile</Link>
            <Link to={'/user/createProduct'}>create product</Link>
        </div>
    );
}

export default Home;