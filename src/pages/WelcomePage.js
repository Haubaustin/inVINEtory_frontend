
const WelcomePage = () => {
    
    return (
    <div className="WelcomePage">
        <div className="welcomePageImage">
            <div className="welcomePageText">
                <h2>
                    Welcome to inVINtory
                </h2>
                <p className="welcomePageParagraph">
                    inVINtory is a wine tracking and visualization application designed to provide users with the ability to search and view all the wine they currently posses. <br/>
                    No longer will you have to continually pull bottles out of your fridge and check labels over and over again. Just check your app and see where you had put the bottle when you stored it<br/>
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
    </div>
    )
}

export default WelcomePage