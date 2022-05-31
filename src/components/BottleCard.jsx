import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons"
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { useDrag } from 'react-dnd'

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

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "card",
        item: { itemID: bottle.id},
        collect: (monitor) => ({
            item: monitor.getItem(),
            isDragging: monitor.isDragging()
        }),
    }));

    return (
        <div className="BottleCard"  style={{backgroundColor: isDragging ? "#EEE8AA" : "#fff"}} ref={dragRef} onClick={function() {
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