import React, { useState } from 'react'
import SignIn from '../components/Signin/SignIn'
import SignUp from '../components/Signin/SignUp'



const Register = () => {
    //True: Returning User
    const [data, setData] = useState(true)



    
    return (data) ? (
        <div className='Register'>
            <div>
                <button onClick={()=>{setData(false)}} className="loginButt newUser" disabled={!data}>Create Account</button>
                <button onClick={()=>{setData(true)}} className="loginButt returnUser" disabled={data}>Returning User</button>
                <SignIn />
            </div>
        </div>
    ) : (
        <div className='Register'>
            <div>
                <button onClick={()=>{setData(false)}} className="loginButt newUser" disabled={!data}>Create Account</button>
                <button onClick={()=>{setData(true)}} className="loginButt returnUser" disabled={data}>Returning User</button>
                <SignUp />
            </div>
        </div>
    )
}

export default Register