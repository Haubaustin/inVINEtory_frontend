import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons"
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
let divStyle = {}

const HomeSearchCard = ({bottle}) => {
    if (bottle.color.toLowerCase() === "red") {
        divStyle = {
            color: "#923a45"
        }
    }
    else if (bottle.color.toLowerCase() === "white"){
        divStyle = {
            color: "#EEEDC4"
        }
    } else {
        divStyle = {
            color: "#E4A598"
        } 
    }



    
    return  (
        <div className="HomeSearchCard">
            <span className="homeSearchIcon">
                <FontAwesomeIcon 
                    icon={faWineBottle} size="2x" 
                    style={{color: `${divStyle.color}`}} 
                    className="storageBottle"/>
                <span hidden={bottle.still}> 
                    <BubbleChartIcon sx={{ color: "#F7E7CE", stroke: 'black' }} /> 
                </span>
            </span>
            <h3 className="homeSearchWine">{bottle.name}</h3>
            <p className="homeSearchDetails">{bottle.vintage} | {bottle.varietal} | {bottle.winery} | {bottle.region}</p>
            <p className="homeSearchLoc">Located in Row: {parseInt(bottle.row+1)} Column: {parseInt(bottle.column+1)} of "{bottle.Storage.name}" </p>
        </div>
    )
}

export default HomeSearchCard