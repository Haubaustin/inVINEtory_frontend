
const WelcomePage = () => {
    
    return (
    <div className="WelcomePage">
        <div className="welcomePageImage">
            <div className="welcomePageImage1"></div>
        </div>
        <div className="welcomePageText">
            <h3>
                Welcome to inVINEtory
            </h3>
            <p>
                inVINEtory is a wine tracking and visualization application designed to provide users with the ability to search and view all the wine they currently posses. 
            </p>
            <p>
                No longer will you have to continually pull bottles out of your fridge and check labels over and over again. Just check your app and see where you had put the bottle when you stored it
            </p>
            <p>
                Compare your cellar with other users and propose trades for bottles
            </p>
            <p>
                Begin by signing up or logging in below
            </p>
                <button className="welcomePageButton" onClick={(e) => {
                    e.preventDefault()
                    window.location.href="/register"
                }}>
                    Signup/Signin
                </button>
        </div>
    </div>
    )
}

export default WelcomePage