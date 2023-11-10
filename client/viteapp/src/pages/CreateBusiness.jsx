import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const CreateBusiness = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [suburb, setSuburb] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [fb, setFb] = useState('');
    const [twitter, setTwitter] = useState('');
    const [insta, setInsta] = useState('');
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth0();

    const handleCreateStore = () => {
        if (!name || !address || !suburb || !city || !description || !phone || !categories || !tags) {
            alert("Please fill in all fields that have a *");
            return;
        }

        if (!isAuthenticated) {
            alert("User not authenticated");
            return;
        }

        const data = {
            BusinessName: name,
            Address: address,
            Suburb: suburb,
            City: city,
            Phone: phone,
            BusinessDescription: description,
            BusinessTags: tags,
            BusinessCategories: categories,
            LinkWebsite: website,
            LinkFB: fb,
            LinkTwitter: twitter,
            LinkInstagram: insta
        }

        axios
            .post("http://localhost:3001/stores/createStore", data, {params: { UserId: user.sub, Email: user.email}})
            .then(response => {
                console.log(response.data);
                alert("Store created successfully");
            })
            .catch(error => {
                alert("Failed to create store. CHECK CONSOLE FOR DETAILS")
                console.error("Create store error:", error);
            });
    };

    return (
        <div>
            <h1>Create Business</h1>
            <div>
                <label>Business Name *</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Address *</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div>
                <label>City *</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                <label>Suburb *</label>
                <input
                    type="text"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                />
            </div>
            <div>
                <label>Business Description *</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Phone *</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div>
                <label>Website</label>
                <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
            <div>
                <label>Facebook</label>
                <input
                    type="text"
                    value={fb}
                    onChange={(e) => setFb(e.target.value)}
                />
            </div>
            <div>
                <label>Twitter</label>
                <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                />
            </div>
            <div>
                <label>Instagram</label>
                <input
                    type="text"
                    value={insta}
                    onChange={(e) => setInsta(e.target.value)}
                />
            </div>
            <div>
                <label>Business Tags</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <div>
                <label>Business Categories</label>
                <input
                    type="text"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleCreateStore}>Create Store</button>
            </div>
        </div>
    );
}

export default CreateBusiness;