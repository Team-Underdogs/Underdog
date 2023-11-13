const Background = ({ children }) => {
    return(
        <div className="background-container">
            <div className="gradient-background" />
            {children}
        </div>
    )
}

export default Background