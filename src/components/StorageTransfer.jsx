import { useEffect, useState } from "react"
import Client from "../services/api"
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons"
import EmptySpace from "./EmptySpace";

let divStyle = {}

const StorageTransfer = ({ bottle }) => {
    const [storage, setStorage] =useState()
    const {userId} = useParams()
    const [data, setData] = useState()
    const [message, setMessage] = useState()
    const [sto, setSto] =useState({
        storage_id: "",
        row: 0,
        column: 0
    })
    
    useEffect(()=>{
        getOtherStorage()
    }, [])


    const handleChange = (e) => {
        setSto({
            ...sto,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        const res = await Client.put(`bottle/edit/${bottle.id}`, sto)
        setMessage(res.data.message)
        setTimeout(()=> {
            setMessage("")
            window.location.reload()
        }, 1500)
    }

    //Find the other storages under user
    const getOtherStorage = async () => {
        const res = await Client.get(`storage/${userId}/all`)
        setStorage(res.data)
    }
    //Call for the Visualization of Storage Area
    const storageVisual = async (e) => {
        e.preventDefault()
        setSto({
            ...sto,
            row: null,
            column: null
        })
        setData()
        await Client.get(`/storage/${userId}/find/${sto.storage_id}`)
        .then((res) => {
            divStyle = {
                gridTempalateColumns: res.data.columns,
                gridTemplateRows: res.data.rows
            }
                setData(twoDimensionArray(res.data.rows, res.data.columns, res.data.Bottles))
        })
    }

    //Visualize Storage Area
    function twoDimensionArray(a, b, c) {
        let arr = [];
        let x = 0
        
        // creating two dimensional array
        for (let i = 0; i< a; i++) {
            for(let j = 0; j< b; j++) {
                arr[i] = [];
            }
        }
    
        // inserting elements to array
        for (let i = 0; i< a; i++) {
            for(let j = 0; j< b; j++) {
                arr[i][j] = [i,j]
                if (c.length === 0) {
                    arr[i][j] = <EmptySpace row={i} column={j} setSto={setSto} sto={sto} key={[i,j]}/>
                } else {
                    if (JSON.stringify([i,j])===JSON.stringify([c[x].row, c[x].column])) { 
                        arr[i][j] = <FontAwesomeIcon  icon={faWineBottle} bottle={c[x]} size="2x" key={[i,j]}/>
                        if (x  < c.length-1) {
                                x++
                            }
                    }
                    else {
                        arr[i][j] = <EmptySpace row={i} column={j} setSto={setSto} sto={sto} key={[i,j]} />
                    }
                }
            }
        }
        return arr;
    }

    
    
    //Page Render
    return (
        <div>
            <h3>Move Bottle</h3>
            <label>Choose Storage</label>
            <form onSubmit={storageVisual}>
                <select onChange={handleChange} name="storage_id">
                    <option value={""}>-</option>
                    {storage && storage.map((sto) => (
                        <option key={sto.id}value={sto.id}>{sto.name}</option>
                    ))}
                </select>
                <br/>
                <button className="searchSubmit">Select</button>
            </form>
            <div style={{gridTemplateColumns: `repeat(${divStyle.gridTempalateColumns}, 1fr)`, gridTemplateRows: `repeat(${divStyle.gridTemplateRows}, 1fr}` }}>
                <p>Click one of the open squares below to select a spot in the storage area:</p>
                <br/>
                {data && data.map((wine) => (
                       <div>{wine}</div>
                    ))}
            </div>
            <br/>
            <div>
                <p>Move <span className="bottleData">{bottle.name}</span> to Row: <span className="bottleData">{parseInt(sto.row)+1}</span> Col: <span className="bottleData">{parseInt(sto.column+1)}</span>?  </p>
                <button onClick={handleEdit} className="searchSubmit">Move Bottle</button>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default StorageTransfer