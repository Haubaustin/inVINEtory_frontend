import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons"
import Client from "../services/api"
import { useParams } from "react-router-dom";

const NewStorage =() => {
    const [storage, setStorage] =useState()
    const [message, setMessage] =useState("")
    const { userId } = useParams()


    const [data, setData ]=useState({
        name: "",
        rows: 0,
        columns: 0,
        user_id: parseInt(userId)
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        setStorage(twoDimensionArray(data.rows, data.columns))
    }
    
    const handleSubmit= async (e) => {
        try {
            e.preventDefault()
            const res = await Client.post(`/storage/${userId}/create`, data)
            setMessage(res.data.message)
            setTimeout(() => {
                setMessage("")
                setData({
                    name: "",
                    rows: 0,
                    columns: 0,
                })
                setStorage()
            }, 2000);
            }
        catch (error) {
            throw error
        }
    }

    function twoDimensionArray(a, b) {
        let arr = [];
    
        // creating two dimensional array
        for (let i = 0; i< a; i++) {
            for(let j = 0; j< b; j++) {
                arr[i] = [];
            }
        }
    
        // inserting elements to array
        for (let i = 0; i< a; i++) {
            for(let j = 0; j< b; j++) {
                arr[i][j] = <FontAwesomeIcon icon={faWineBottle} size="4x" />
            }
        }
        return arr;
    }
    
    return (
        <div className="NewStorage">
            <h2>Create a New Storage Space</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    placeholder="Rows" 
                    name="rows" 
                    min="0" 
                    onChange={handleChange} 
                    value={data.rows}/>  
                <br/>
                <input 
                    type="number" 
                    placeholder="Columns" 
                    name="columns" 
                    min="0" 
                    onChange={handleChange} 
                    value={data.columns}/> 
                <br/>
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    onChange={handleChange} 
                    value={data.name}/> 
                <br/>
                <button 
                    className="storageSubmit" 
                    disabled={!data.rows || !data.columns || !data.name}>
                        Submit
                </button>
            </form>
            {message}
            <h3>{data.name}: {data.rows*data.columns} Total Bottles</h3>
            {storage && storage.map((row) => (
                  <p className="storageDisplay">{row}</p>
            ))}
        </div>
    )
}

export default NewStorage