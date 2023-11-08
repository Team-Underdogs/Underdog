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
            <img src={underdogLogo} alt="Underdog Logo" />
            <div className="searchbar">
            <div className="search-dropdown">
                    <select 
                        className="dropbtn"
                        value={selectedOption}
                        onChange={handleSearchOptionChange}
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
                    <FaSearch size={20} />
                </button>
            </div>
            <div className="header-buttons">
                <a href="/">Sign in</a>
                <Link to='/cart/:id'>
                    <FaShoppingCart className="icon" size={30} />
                </Link>
                <Link to='/account/:id'> 
                    <FaUser className="icon" size={30} />
                </Link>
            </div>
        </div>
    )
}

export default Header;