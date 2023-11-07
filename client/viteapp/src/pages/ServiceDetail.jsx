import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceDetail = () => {
    const [service, setService] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    return (
        <div>
            <h1>Single Service Page</h1>
        </div>
    );
}

export default ServiceDetail;