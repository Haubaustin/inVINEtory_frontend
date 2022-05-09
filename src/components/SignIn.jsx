import Client from "../services/api.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [data, setData] =useState({
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
    
    const SignIn = async (e) => {
        e.preventDefault()
        try {
            const res = await Client.post("/user/login", data)
            localStorage.setItem('JWT', res.data.token)
            localStorage.setItem('user', res.data.user.username)
            navigate('/home')
        }
        catch (error) {
            setError(error.response.data.message)
            setTimeout(() => {
                setError("")
            }, 2000);
            throw error
        }
    }

    return (
    <div className="SignIn">
        <h3 className="registerTitle">Login</h3>
        <form onSubmit={SignIn}>
            <input placeholder="Username" type="text" name="username" value={data.username} onChange={handleChange}></input> <br/>
            <input placeholder="Password" type="password" name="password" value={data.password} onChange={handleChange}></input> <br/>
            {error}<br/>
            <button className="loginButt loginSubmit" disabled={!data.username || !data.password}>Submit</button>
        </form>
    </div>
    )
}

export default SignIn