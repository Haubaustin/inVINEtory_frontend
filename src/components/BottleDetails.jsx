import { faEdit, faRotateLeft, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Client from "../services/api"
import StorageTransfer from "./StorageTransfer";

const BottleDetails = ({ bottle, setViewBottle }) => {
    const [edit, setEdit] =useState(false)
    const { userId } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: bottle.name,
        winery: bottle.winery,
        region: bottle.region,
        vintage: bottle.vintage,
        varietal: bottle.varietal,
        still: bottle.still,
        row: bottle.row,
        column: bottle.column,
        color: bottle.color,
        notes: bottle.notes
    })
    const [message, setMessage] =useState("")

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    //Edit Bottle
    const handleEdit = async (e) => {
        e.preventDefault()
        const res = await Client.put(`bottle/edit/${bottle.id}`, data)
        setMessage(res.data.message)
        setTimeout(()=> {
            setMessage("")
            setEdit(false)
        }, 2000)
    }

    //Delete Bottle
    const handleDelete = async () => {
        const con = prompt(`Are you sure you want to delete Storage Area "${bottle.name}". This cannot be undone\n Type delete to continue`)
        if (con.toLowerCase() === "delete") {
            await Client.delete(`/bottle/delete/${bottle.id}`)
            navigate(`/${userId}/home`)
        }
    }

  
    //Conditional Render for Bottle Edit
    const editMode = () => {
        if (edit) {
            return  <div>
                <FontAwesomeIcon icon={faRotateLeft} size="2x" onClick={()=> {setEdit(false)}} style={{cursor: "pointer"}}/>
                        <form onSubmit={handleEdit}>
                            <label>Name:</label> <br/>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="eg: Screaming Eagle" 
                                    value={data.name} 
                                    onChange={handleChange}/>
                            <br/>
                            <label> Vintage:    <br/>
                                <input 
                                    type="text" 
                                    name="vintage" 
                                    placeholder="eg: 2015" 
                                    value={data.vintage} 
                                    onChange={handleChange}/>
                            </label>
                            <br/>
                            <label>Varietal:     <br/>
                                <input 
                                    type="text" 
                                    name="varietal" 
                                    placeholder="eg: Cabernet Sauvignon" 
                                    value={data.varietal} 
                                    onChange={handleChange}/>
                            </label>
                            <br/>
                            <label>Winery:     <br/>
                                <input 
                                    type="text" 
                                    name="winery" 
                                    placeholder="eg: Screaming Eagle" 
                                    value={data.winery} 
                                    onChange={handleChange}/>
                            </label>
                            <br/>
                            <label>Region:     <br/>
                                <input 
                                    type="text" 
                                    name="region" 
                                    placeholder="eg: Napa Valley" 
                                    value={data.region} 
                                    onChange={handleChange}/>
                            </label>
                            <br/>
                            <label> Tasting Notes:    <br/>
                                <input 
                                    type="text" 
                                    name="notes" 
                                    placeholder="eg: earthy, medium to full body, black and red fruit layers " 
                                    value={data.notes} onChange={handleChange}/>
                            </label>
                            <br/>
                            <label>Color:     <br/>
                                <select onChange={handleChange} value={data.color} name="color">
                                    <option value={""} >Choose One</option>
                                    <option value={"red"} >Red</option>
                                    <option value={"white"} >White</option>
                                    <option value={"rose"} >Rose</option>
                                </select>
                            </label>
                            <br/>
                            <label>Still(Not Sparkling):     <br/>
                                <select onChange={handleChange} value={data.still} name="still">
                                    <option value={""} >Choose One</option>
                                    <option value={true} >True</option>
                                    <option value={false} >False</option>
                                </select>
                            </label>
                            <br/>
                            <button className="storageSubmit">Submit</button>
                        </form>
                        {message}
                    </div>
        }
        else {
            
        return <div className="bottleDet">
                <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={()=> {setViewBottle(false)}} style={{cursor: "pointer"}}/>
                <h2>{bottle.name}</h2>
                <p className="bottlePara">... A <span className="bottleData">{bottle.vintage}</span> Vintage, of <span className="bottleData">{bottle.varietal}</span> produced by <span className="bottleData">{bottle.winery}</span> from the <span className="bottleData">{bottle.region}</span> region.</p>
                <br/>
                <p className="bottlePara">This bottle is currently located at <br/>Row: <span className="bottleData">{parseInt(bottle.row)+1}</span> Column: <span className="bottleData">{parseInt(bottle.column)+1}</span></p>
                <br/>
                <p className="bottlePara">Additional Notes: <span className="bottleData">{bottle.notes}</span></p>
                <br/>
                <FontAwesomeIcon icon={faEdit} size="2x" style={{cursor: "pointer"}} onClick={()=>{setEdit(true)}}/>
                <FontAwesomeIcon icon={faTrashCan} size="2x" style={{cursor: "pointer"}} onClick={()=> {handleDelete()}}/>
               </div>
        }
    }
//Page Render
    return (
        <div className="BottleDetails">
            {editMode()}
            <div className="bottleEdit">
                <StorageTransfer bottle={bottle} />
            </div>
        </div>
    )
}

export default BottleDetails