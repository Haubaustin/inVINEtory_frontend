import { useNavigate } from "react-router-dom"


const Home = ({ user }) => {
    const navigate = useNavigate()


    return (user) ? (
    <div className="Home">
        <div className="homeStorage">
            <div className="homeStorageDisplay">
                <h2>{user}'s Storage</h2>
            </div>
            <div>
                <h2>Add New Storage</h2>
            </div>
        </div>
        <div className="homeBottle">
            <div className="homeBottleDisplay">
                <h2>{user}'s Bottles</h2>
            </div>
            <div>
                <h2>Add More Bottles</h2>
            </div>
        </div>        
    </div>
    ) : (
    <div className="errorPage">
        <div className="errorDiv">
            <h3>Ope!</h3>
            <p>You need to be logged in to access this page don't you know</p>
            <button classname="" onClick={()=> navigate('/register')}>Login</button>
        </div>
    </div>
    )
}

export default Home