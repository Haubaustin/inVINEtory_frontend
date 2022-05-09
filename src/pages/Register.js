import React, { useState } from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'



const Register = () => {
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
                <SignUp setData={setData}/>
            </div>
        </div>
    )
}

export default Register