import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons"
import Modal from 'react-modal';
import { useState } from "react";
import Client from '../services/api'
import { useParams } from "react-router-dom";
import { useDrop } from "react-dnd";

const NewBottle =({ rowN, columnN, storageData}) => {
    const { userId } = useParams()
    const { storage_id } =useParams()
    const [message, setMessage] =useState("")
    const [bottleModal, setBottleModal]=useState(false)
    const [data, setData] = useState({
        name: "",
        winery: "",
        region: "",
        vintage: "",
        varietal: "",
        still: "",
        row: rowN,
        column: columnN,
        color: "",
        notes: ""
    })

    const move = {
        row: rowN,
        column: columnN
    }

    //Drag Drop
    const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
        accept: "card",
        collect: (mon) => ({
            isOver: mon.isOver(),
            canDrop: mon.canDrop()
        }),
        drop: monitor => {handleEdit(monitor.itemID)}
        }));

    const handleEdit = async (id) => {
        await Client.put(`bottle/edit/${id}`, move)
        storageData()
    }

    //Modal to Create Bottle
    const handleCloseBottleModal = () => {
        setBottleModal(false)
    }

    const handleOpenBottleModal = () => {
        setBottleModal(true)
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await Client.post(`bottle/create/${storage_id}/${userId}`, data)
        setMessage(res.data.message)
        setTimeout(() => {
            setData({
                name: "",
                winery: "",
                region: "",
                vintage: "",
                varietal: "",
                still: "",
                row: rowN,
                column: columnN,
                color: "",
                notes: ""
            })
            setMessage("")
            storageData()
        }, 2000);
    }

    let isActive = isOver && canDrop
    return (
        <div className="NewBottle" 
            ref={dropRef} 
            style={{ backgroundColor: isActive ? "#90EE90" : "#fff" }}>
            <h4>Add Bottle</h4>
            <FontAwesomeIcon 
                    icon={faPlusSquare} 
                    size="3x" 
                    onClick={handleOpenBottleModal} /> 
                <Modal 
                    isOpen={bottleModal} 
                    onRequestClose={handleCloseBottleModal}
                    ariaHideApp={false}
                    >
                    <div className="addBottle">
                        <h2>Add New Bottle</h2>
                        <form onSubmit={handleSubmit}>
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
                        <br/>
                        <p>{message}</p>
                    </div>
                </Modal>
        </div>
    )
}

export default NewBottle