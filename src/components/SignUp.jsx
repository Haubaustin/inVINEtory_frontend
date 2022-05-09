import { useState } from "react"
import Client from "../services/api.js"


const SignUp = (props) => {
    const [message, setMessage] = useState("")
    const [data, setData] =useState({
        email: '',
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })
    }

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            const res = await Client.post('/user/register', data)
            console.log(res)
            if (res.data.message) {
                setMessage(res.data.message)
                setTimeout(() => {
                    setMessage("")
                }, 2000);
            }
            else {
            setTimeout(() => {
                props.setData(true)
            }, 2000);
        }
        }    
        catch (error) {
            setMessage(error.message)
            throw error
        }
    }
    
    return (
    <div className="SignUp">
        <h3 className="registerTitle">Create Account</h3>
        <form onSubmit={registerUser}>
            <input placeholder="Email" type="text" name="email" value={data.email} onChange={handleChange}></input> <br/>
            <input placeholder="Username" type="text" name ="username" value={data.username} onChange={handleChange}></input> <br/>
            <input placeholder="Password" type="password" name="password" value={data.password} onChange={handleChange}></input> <br/>
            {message} <br/>
            <button className="loginButt loginSubmit" disabled={!data.email || !data.username || !data.password}>Submit</button>
        </form>
    </div>
    )
}

export default SignUp