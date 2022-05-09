


const Home = ({ user, auth }) => {
    
    return (user & auth) ? (
    <div className="Home">

    </div>
    ) : (
    <div>

    </div>
    )
}

export default Home