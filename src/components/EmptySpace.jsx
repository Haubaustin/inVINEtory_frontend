import { faSquareFull } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const EmptySpace = ({ setSto, row, column, sto }) => {

const handleClick = () => {
    setSto({
        ...sto,
        row: row,
        column: column
    })
}

    return (
        <span onClick={handleClick}>
            <FontAwesomeIcon icon={faSquareFull}  className="emptySpace" size="2x" />
        </span>
    )
}


export default EmptySpace