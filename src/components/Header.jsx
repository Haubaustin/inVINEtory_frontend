import { Link } from "react-router-dom"

const Header = ({user, userId, setUser}) => {
    
    const handleLogout = () => {
        localStorage.clear()
        setUser(null)
    }

    return (user) ? (
    <div className="Header">
        <h1 className="headerTitle">in<span className="headerSpan">VIN</span>tory</h1>
        <div className="Nav">
            <h2>Hello, {user} </h2>
            <div className="links">
                <Link to={`/${userId}/home`} className="homeLink">
                    <h2>| Home |</h2>
                </Link>
                <Link to={"/"} className="homeLink" onClick={handleLogout}>
                    <h2>| Logout |</h2>
                </Link>
            </div>
        </div>
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