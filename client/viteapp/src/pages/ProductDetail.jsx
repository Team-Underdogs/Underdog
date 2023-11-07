import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    return (
        <div>
            <h1>Single Product Page</h1>
        </div>
    );
}

export default ProductDetail;