import { useState } from 'react';

const CategoriesBanner = ({ onCategorySelect }) => {

    const [selectedCategory, setSelectedCategory] = useState('');
    
    const categoryChosen = (category) => {
        onCategorySelect(category);
        setSelectedCategory(category);
    };

    const categories = ['Clothing', 'Accessories', 'Homeware', 'Technology', 'Cosmetic', 'Food', 'Sport', 'Pet', 'Other']

    return (
        <div className="category-container">
            <ul className="category-list">
                {categories.map((category, index) => (
                    <li key={index} onClick={()=>categoryChosen(category)} style={{backgroundColor: category === selectedCategory ? '#ededed' : '#ffffff'}}>
                        <h3>{category}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesBanner;