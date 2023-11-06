import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BusinessDetail = () => {
    const [business, setBusiness] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    return (
        <div>
            <h1>Single Business Page</h1>
        </div>
    );
}

export default BusinessDetail;