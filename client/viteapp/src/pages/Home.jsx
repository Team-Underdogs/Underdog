import BrowseCards from "../components/BrowseCards";

const Home = () => {
    return (
        <div className="browse-container">
            <div className="browse-text">
                <h1>Shop With Purpose</h1>
                <h4>Start browsing for products or businesses that embody the values you want to support.</h4>
            </div>
            <div className="browse-options">
                <BrowseCards
                    image='../src/assets/business.jpeg'
                    title='Businesses'
                    link='/browse/business'
                />
                <BrowseCards
                     image='../src/assets/products.jpg'
                    title='Products & Services'
                    link='/browse/product'
                />
            </div> 
        </div>
    );
}

export default Home;