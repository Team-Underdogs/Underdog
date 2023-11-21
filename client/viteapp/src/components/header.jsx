import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import underdogLogo from '../assets/underdog.png';
import { useState } from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const [searchField, setSearchField] = useState('');
    const [selectedOption, setSelectedOption] = useState('all');

    const { user, isAuthenticated } = useAuth0();

    const handleSearch = (e) => {
        e.preventDefault();
        if(searchField.trim() === ''){
            alert('Search field cannot be empty!');
            return
        }
        const queryParams = `?category=${selectedOption}&keyword=${encodeURIComponent(searchField)}`
        window.location.href = `/search${queryParams}`;
    }

    return (
        <div className="header">
            <Link to="/" className="logo">
                <img src={underdogLogo} alt="Underdog Logo" />
            </Link>
            <div className="searchbar">
                <div className="search-dropdown">
                    <select 
                        className="dropbtn"
                        value={selectedOption}
                        onChange={(e)=>setSelectedOption(e.target.value)}
                        >
                        <option value="all">All</option>
                        <option value="businesses">Businesses</option>
                        <option value="products">Products</option>
                        <option value="services">Services</option>
                    </select>
                </div>
                <input 
                    className="search-input"
                    type="text"
                    value={searchField}
                    onChange={(e)=>setSearchField(e.target.value)}
                    placeholder="Search businesses, products, services..."
                />
                <button onClick={handleSearch} className="search-button">
                    <FaSearch size={18} color='black' />
                </button> 
            </div>
            <div className="header-buttons">
                {isAuthenticated ? (
                    <LogoutButton/>
                ) : (
                    <LoginButton/>
                )}
                <Link to='/cart/:id'>
                    <FaShoppingCart className="icon" />
                </Link>
                <Link to='/account/:id'> 
                    <FaUser className="icon" />
                </Link>
            </div>
        </div>
    )
}

export default Header;