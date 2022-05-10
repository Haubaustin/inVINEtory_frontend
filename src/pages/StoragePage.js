import NewBottle from "../components/NewBottle"
import { useEffect, useState } from "react";
import Client from "../services/api";
import { useParams } from "react-router-dom";

let divStyle = {}

const StoragePage = () => {
    const [data, setData] = useState([])
    const { userId } = useParams()
    const {storage_id} =useParams()

    const storageData = async () => {
        await Client.get(`/storage/${userId}/find/${storage_id}`)
        .then((res) => {
            divStyle = {
                gridTempalateColumns: res.data.columns,
                gridTemplateRows: res.data.rows
            }
                setData(twoDimensionArray(res.data.rows, res.data.columns))
        })
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
                arr[i][j] = [i,j]
            }
        }
        return arr;
    }

   useEffect(() => {
    storageData()
    console.log(divStyle)
    console.log(data)
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
            <div className="StoragePageAddBottle">
                <NewBottle />
            </div>
            <div className="StoragePageSearch">
                <h4>Search</h4>

            </div>
        </div>
    )
}

export default StoragePage