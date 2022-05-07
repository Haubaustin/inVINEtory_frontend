

const SignUp = () => {
    
    return (
    <div className="SignUp">
        <h3 className="registerTitle">Create Account</h3>
        <form>
            <input placeholder="email" type="text"></input> <br/>
            <input placeholder="username" type="text"></input> <br/>
            <input placeholder="password" type="password"></input> <br/>
            <button className="loginButt">Submit</button>
        </form>
    </div>
    )
}

export default SignUp