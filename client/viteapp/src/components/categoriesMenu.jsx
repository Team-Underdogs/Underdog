const CategoriesBanner = () => {
    return (
        <div className="category-container">
            <ul className="category-list">
                {['Clothing', 'Accessories', 'Homeware', 'Technology', 'Cosmetic', 'Food', 'Sport', 'Pet', 'Other'].map((category, index) => (
                    <li key={index}>
                        <h3>{category}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesBanner;
