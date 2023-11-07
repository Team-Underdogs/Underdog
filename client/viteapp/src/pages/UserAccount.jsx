import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UserAccount = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    
    return (
        <div>
            <h1>Public User Account</h1>
        </div>
    );
}

export default UserAccount;