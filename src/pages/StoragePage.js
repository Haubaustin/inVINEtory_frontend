import NewBottle from "../components/NewBottle"
import { useEffect, useState } from "react";
import Client from "../services/api";
import { useParams } from "react-router-dom";
import BottleCard from '../components/BottleCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons"
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import Search from "../components/Search";

let divStyle = {}

const StoragePage = () => {
    const [data, setData] = useState([])
    const { userId } = useParams()
    const {storage_id} =useParams()

    const storageData = async () => {
        await Client.get(`/storage/${userId}/find/${storage_id}`)
        .then((res) => {
            console.log(res)
            divStyle = {
                gridTempalateColumns: res.data.columns,
                gridTemplateRows: res.data.rows
            }
                setData(twoDimensionArray(res.data.rows, res.data.columns, res.data.Bottles))
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
                    arr[i][j] = <NewBottle rowN={i} columnN={j} storageData={storageData} />
                } else {
                    if (JSON.stringify([i,j])===JSON.stringify([c[bottle].row, c[bottle].column])) { 
                        arr[i][j] = <BottleCard bottle={c[bottle]} />
                        if (bottle  < c.length-1) {
                                bottle++
                            }
                    }
                    else {
                        arr[i][j] = <NewBottle rowN={i} columnN={j} storageData={storageData} />
                    }
                }
            }
        }
        return arr;
    }

   useEffect(() => {
    storageData()
   }, [])


  

    return (
        <div className="StoragePage">
            <div className="StoragePageDisplay" style={{gridTemplateColumns: `repeat(${divStyle.gridTempalateColumns}, 1fr)`, gridTemplateRows: `repeat(${divStyle.gridTemplateRows}, 1fr}` }}>
            {data && data.map((wine) => (
                    wine.map((column) => (
                    <div className="storageSpace">{column}</div>
                ))
                 ))}
            </div>
            <div className="StoragePageLegend">
                <h3>Legend</h3>
                <FontAwesomeIcon icon={faWineBottle} size="2x" style={{color: `#923a45`, stroke: 'black', strokeWidth: "20px"}}/> = Red<br/>
                <FontAwesomeIcon icon={faWineBottle} size="2x" style={{color: `#EEEDC4`, stroke: 'black', strokeWidth: "20px"}}/> = White<br/>
                <FontAwesomeIcon icon={faWineBottle} size="2x" style={{color: `#E4A598`, stroke: 'black', strokeWidth: "20px"}}/> = Rosé<br/>
                <BubbleChartIcon sx={{ color: "#F7E7CE", stroke: 'black' }}/> = Champagne/Sparkling
            </div>
            <div className="StoragePageSearch">
                <Search />
            </div>
        </div>
    )
}

export default StoragePage