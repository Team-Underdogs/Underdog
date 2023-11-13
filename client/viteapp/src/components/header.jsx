import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import underdogLogo from '../assets/underdog.png';
import { useState } from 'react';

const Header = ({ enterSearch, pickOption }) => {
    const [searchField, setSearchField] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSearch = () => {
        enterSearch(searchField, selectedOption);
    };

    const handleSearchOptionChange = () => {
        pickOption(selectedOption);
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
                    <Link to="/search">
                        <FaSearch size={18} color='black' />
                    </Link>
                </button>
            </div>
            <div className="header-buttons">
                <a href="/">Sign in</a>
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