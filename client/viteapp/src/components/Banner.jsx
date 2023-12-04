const Banner = ({ image, children }) => {
    return(
        <div className="banner-container">
            <img src={image} alt="Banner Image" className="bannerImg" />
            <div className="gradient-overlay">
            {children}
            </div>
            
        </div>
    )
}

export default Banner;