import { faWineBottle, faEdit, faRotateLeft, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const BottleDetails = ({ bottle, setViewBottle }) => {

    console.log(bottle)


    return (
        <div className="BottleDetails">
            <div className="bottleDet">
                <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={()=> {setViewBottle(false)}} style={{cursor: "pointer"}}/>
                <h2>{bottle.name}</h2>
                <p className="bottlePara">... A <span className="bottleData">{bottle.vintage}</span> Vintage, of <span className="bottleData">{bottle.varietal}</span> produced by <span className="bottleData">{bottle.winery}</span> from the <span className="bottleData">{bottle.region}</span> region.</p>
                <br/>
                <p className="bottlePara">This bottle is currently located in Row: <span className="bottleData">{parseInt(bottle.row)+1}</span> Column: <span className="bottleData">{parseInt(bottle.column)+1}</span></p>
                <br/>
                <p className="bottlePara">Additional Notes: <span className="bottleData">{bottle.notes}</span></p>
                <br/>
                <FontAwesomeIcon icon={faEdit} size="2x" style={{cursor: "pointer"}}/>
                <FontAwesomeIcon icon={faTrashCan} size="2x" style={{cursor: "pointer"}}/>
            </div>
            <div className="bottleEdit">

            </div>
        </div>
    )
}

export default BottleDetails