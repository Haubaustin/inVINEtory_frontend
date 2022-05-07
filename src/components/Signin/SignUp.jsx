

const SignUp = () => {
    
    return (
    <div className="SignUp">
        <h3 className="registerTitle">Create Account</h3>
        <form>
            <input placeholder="Email" type="text"></input> <br/>
            <input placeholder="Username" type="text"></input> <br/>
            <input placeholder="Password" type="password"></input> <br/>
            <input placeholder="Confirm Password" type="password"></input> <br/>
            <button className="loginButt loginSubmit">Submit</button>
        </form>
    </div>
    )
}

export default SignUp