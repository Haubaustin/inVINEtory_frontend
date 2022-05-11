import NewBottle from "../components/NewBottle"
import { useEffect, useState } from "react";
import Client from "../services/api";
import { useParams } from "react-router-dom";

let divStyle = {}

const StoragePage = () => {
    const [data, setData] = useState([])
    const { userId } = useParams()
    const {storage_id} =useParams()
    const [bottles, setBottle] =useState()

    const storageData = async () => {
        await Client.get(`/storage/${userId}/find/${storage_id}`)
        .then((res) => {
            console.log(res.data.Bottles)
            setBottle(res.data.Bottles)
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
        let bo =[
            {
            "id": 24,
            "name": "Calc GSM 11",
            "winery": "Calcareous",
            "region": "Paso",
            "vintage": "2017",
            "varietal": "GSM",
            "still": true,
            "row": 1,
            "column": 1,
            "color": "red",
            "notes": "Is pretty Good",
            "user_id": 30,
            "storage_id": 20,
            "createdAt": "2022-05-11T04:58:18.634Z",
            "updatedAt": "2022-05-11T04:58:18.634Z"
        },
        {
            "id": 23,
            "name": "Calc GSM",
            "winery": "Calcareous",
            "region": "Paso",
            "vintage": "2017",
            "varietal": "GSM",
            "still": true,
            "row": 2,
            "column": 2,
            "color": "red",
            "notes": "Is pretty Good",
            "user_id": 30,
            "storage_id": 20,
            "createdAt": "2022-05-11T04:57:35.591Z",
            "updatedAt": "2022-05-11T04:57:35.591Z"
        } 
    ]
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
                // console.log([c[0].row, c[0].column])
                // console.log(JSON.stringify([i,j])===JSON.stringify([c[0].row, c[0].column]))
                // if (JSON.stringify([i,j])===JSON.stringify([c[0].row, c[0].column])) {
                // if (JSON.stringify([i,j])===JSON.stringify([c[i].row, c[j].column])) {
                // if (JSON.stringify([i,j])===JSON.stringify([c[j].row, c[j].column])) {
                // if (JSON.stringify([i,j])===JSON.stringify([c[i].row, c[j].column])) {
                if (JSON.stringify([i,j])===JSON.stringify([c[bottle].row, c[bottle].column])) { 
                    arr[i][j] = c[bottle].name
                    if (bottle  < c.length-1) {
                            bottle++
                            console.log(bottle)
                        }
                }
                else {
                    arr[i][j] = <NewBottle row={arr[i]} column={arr[j]} />
                }
            //   arr[i][j] = console.log([i,j])
            //     if (arr[i][j] === [i,j]) {
            //     console.log("Yes")
            //   }
                // if (arr[i] == c[0].row && arr[j] == c[0].column) {
                //     console.log("match at " + [i][j])
                // }
        }
        }
        return arr;
    }

   useEffect(() => {
    storageData()
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
            {/* <div className="StoragePageAddBottle">
                <NewBottle />
            </div> */}
            <div className="StoragePageSearch">
                <h4>Search</h4>

            </div>
        </div>
    )
}

export default StoragePage