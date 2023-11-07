import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateBusiness = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [suburb, setSuburb] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [fb, setFb] = useState('');
    const [twitter, setTwitter] = useState('');
    const [insta, setInsta] = useState('');
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <div>
            <h1>Update Business</h1>
        </div>
    );
}

export default UpdateBusiness;