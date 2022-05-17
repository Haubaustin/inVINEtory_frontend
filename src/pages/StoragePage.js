import NewBottle from "../components/NewBottle"
import { useEffect, useState } from "react";
import Client from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import BottleCard from '../components/BottleCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle, faEdit, faRotateLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import Search from "../components/Search";
import BottleDetails from "../components/BottleDetails";

let divStyle = {}

const StoragePage = () => {
    const [data, setData] = useState([])
    const [storage, setStorage]=useState({})
    const [edit, setEdit]=useState(false)
    const [viewBottle, setViewBottle] = useState(false)
    const [detBottle, setDetBottle] =useState()
    
    const { userId } = useParams()
    const {storage_id} = useParams()
  
    const navigate = useNavigate()

    useEffect(() => {
        storageData()
       }, [])

//##### Create Storage Area, 2d Array
    const storageData = async () => {
        await Client.get(`/storage/${userId}/find/${storage_id}`)
        .then((res) => {
            divStyle = {
                gridTempalateColumns: res.data.columns,
                gridTemplateRows: res.data.rows
            }
                setData(twoDimensionArray(res.data.rows, res.data.columns, res.data.Bottles))
                setStorage(res.data)
        })
    }

    function twoDimensionArray(a, b, c) {
        let arr = [];
        let bottle = 0
        
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
                    arr[i][j] = <NewBottle rowN={i} columnN={j} storageData={storageData} key={[i,j]}/>
                } else {
                    if (JSON.stringify([i,j])===JSON.stringify([c[bottle].row, c[bottle].column])) { 
                        arr[i][j] = <BottleCard bottle={c[bottle]}  setViewBottle={() => {setViewBottle(true)}} setDetBottle={setDetBottle} key={[i,j]}/>
                        if (bottle  < c.length-1) {
                                bottle++
                            }
                    }
                    else {
                        arr[i][j] = <NewBottle rowN={i} columnN={j} storageData={storageData} key={[i,j]}/>
                    }
                }
            }
        }
        return arr;
    }

   //######   Edit Storage
   //Edit Storage
   const handleChange = (e) => {
    setStorage({
        ...storage,
        [e.target.name]: e.target.value
    })
}
    const handleSubmit = async (e) => {
        e.preventDefault()
        await Client.put(`/storage/edit/${storage_id}`, storage)
        storageData()
        setEdit(false)
    }

    //Delete Storage
    const handleDelete = async () => {
        const con = prompt(`Are you sure you want to delete Storage Area "${storage.name}". This cannot be undone\n Type delete to continue`)
        if (con.toLowerCase() === "delete") {
            await Client.delete(`/storage/delete/${storage_id}`)
            navigate(`/${userId}/home`)
        }
    }

    //Toggle Edit Mode
   const editMode = () => {
       if (!edit) {
            return <div className="StoragePageTitle">
                        <h1 className="SPTTitle">
                            {storage && storage.name}
                        </h1>
                            <FontAwesomeIcon icon={faEdit} size="2x" className="SPTEdit" onClick={()=> {setEdit(true)}} />
                    </div>
       } else {
            return  <div className="StoragePageTitleEdit">
                        <form onSubmit={handleSubmit} className="editForm">
                                <label>Rows: <br/>
                                <input 
                                    type="number" 
                                    placeholder="Rows" 
                                    name="rows" 
                                    min="1" 
                                    onChange={handleChange} 
                                    value={storage.rows}/>  
                                </label>
                                <label>Columns: <br/>
                                <input 
                                    type="number" 
                                    placeholder="Columns" 
                                    name="columns" 
                                    min="1" 
                                    onChange={handleChange} 
                                    value={storage.columns}/> 
                                </label>
                                <label>Name of Storage: <br/>
                                <input 
                                    type="text" 
                                    placeholder="eg: Cellar Fridge" 
                                    name="name" 
                                    onChange={handleChange} 
                                    value={storage.name}/> 
                                </label>
                            <button 
                                className="editButton" 
                                disabled={!storage.rows || !storage.columns || !storage.name}>
                                    Submit Change(s)
                            </button>
                        </form>
                        <FontAwesomeIcon 
                            icon={faRotateLeft} 
                            size="2x" 
                            className="SPTEdit"
                            onClick={()=> {setEdit(false)}}/>
                        <FontAwesomeIcon 
                            icon={faTrashCan} 
                            size="2x" 
                            className="SPTEdit"
                            onClick={handleDelete}/>
                    </div>
       }
   }

   //#### Storage Display/Bottle Expanded Display
   const displayBottleDetails = () => {
       if (!viewBottle) {
        return  <div className="StoragePageDisplay" style={{gridTemplateColumns: `repeat(${divStyle.gridTempalateColumns}, 1fr)`, gridTemplateRows: `repeat(${divStyle.gridTemplateRows}, 1fr}` }}>
                    {data && data.map((wine) => (
                        wine.map((column) => (
                            <div className="storageSpace">{column}</div>
                        ))
                    ))}
                </div>
       }
       else {
        return <BottleDetails bottle={detBottle} setViewBottle={setViewBottle} storageData={storageData}/>
        }
   }


   //Page Render
    return (
        <div className="StoragePage">
                {editMode()}
                {displayBottleDetails()}
            <div className="StoragePageLegend">
                <h3>Legend</h3>
                <FontAwesomeIcon 
                    icon={faWineBottle} 
                    size="2x" 
                    style={{color: `#923a45`, stroke: 'black', strokeWidth: "20px"}}/> = Red<br/>
                <FontAwesomeIcon 
                    icon={faWineBottle} 
                    size="2x" style={{color: `#EEEDC4`, stroke: 'black', strokeWidth: "20px"}}/> = White<br/>
                <FontAwesomeIcon 
                    icon={faWineBottle} 
                    size="2x" style={{color: `#E4A598`, stroke: 'black', strokeWidth: "20px"}}/> = Rosé<br/>
                <BubbleChartIcon 
                    sx={{ color: "#F7E7CE", stroke: 'black' }}/> = Champagne/Sparkling
            </div>
            <div className="StoragePageSearch">
                <Search />
            </div>
        </div>
    )
}

export default StoragePage