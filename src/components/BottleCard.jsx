import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons"
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

let divStyle ={}

const BottleCard = ({ bottle, setDetBottle, setViewBottle }) => {
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

    return (
        <div className="BottleCard" onClick={function() {
                setViewBottle(true)
            return  setDetBottle(bottle)

        }}>
            <span >
                <FontAwesomeIcon 
                    icon={faWineBottle} size="2x" 
                    style={{color: `${divStyle.color}`}} 
                    className="storageBottle"/>
                <span hidden={bottle.still}> 
                    <BubbleChartIcon sx={{ color: "#F7E7CE", stroke: 'black' }} /> 
                </span>
            </span>
            <h3>{bottle.name}</h3>
                {bottle.winery}<br/>
                {bottle.vintage}
        </div>
    )
}

export default BottleCard