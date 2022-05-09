import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons"

const NewStorage =() => {
    // let storage 
    const [storage, setStorage] =useState()

    const [data, setData ]=useState({
        name: "",
        rows: 0,
        columns: 0
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        setStorage(twoDimensionArray(data.rows, data.columns))
        console.log(storage)
        console.log(data)   
    }
    
    const handleSubmit= () => {

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
                <input type="number" placeholder="Rows" name="rows" min="0" onChange={handleChange} value={data.rows}/>  <br/>
                <input type="number" placeholder="Columns" name="columns" min="0" onChange={handleChange} value={data.columns}/> <br/>
                <input type="text" placeholder="Name" name="name" onChange={handleChange} value={data.name}/> <br/>
                <button className="storageSubmit">Submit</button>
            </form>
            <h3>{data.name}</h3>
            {storage && storage.map((row) => (
                  <p className="storageDisplay">{row}</p>
            ))}
            <p>Total Bottles: {data.rows*data.columns}</p>
        </div>
    )
}

export default NewStorage