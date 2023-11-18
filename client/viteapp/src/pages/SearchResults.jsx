import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

const SearchResults = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const keyword = params.get('keyword');
    console.log("Category:", category);
    console.log("Keyword:", keyword);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
          .get(`http://localhost:3001?category=${category}&keyword=${keyword}`)
          .then((res) => {
            setLoading(false);
          })
          .catch((err) => {
            console.log("Axios Error:", err.response ? err.response.data : err.message);
            setLoading(false);
          });
      }, [category, keyword]);
    
    return(
        <div className='searchResults-container'>
            <div className="browse-text">
                <h1>Search Results</h1>
                {category === 'all' ? (
                  <h4>All items associated with '{keyword}'</h4>
                ) : (
                  <h4>{category} associated with '{keyword}'</h4>
                )}
            </div>
        </div>
    )
}

export default SearchResults;