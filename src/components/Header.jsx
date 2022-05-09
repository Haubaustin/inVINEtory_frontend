
const Header = ({user}) => {
    
    return (user) ? (
    <div className="Header">
        <h1 className="headerTitle">in<span className="headerSpan">VIN</span>tory</h1>
    </div>
    ) : (
    <div>
        <div className="Header">
            <h1 className="headerTitle">in<span className="headerSpan">VIN</span>tory</h1>
        </div>
    </div>
    )
}

export default Header