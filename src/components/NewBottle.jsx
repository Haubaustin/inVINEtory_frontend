import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons"
import Modal from 'react-modal';
import { useState } from "react";


const NewBottle =() => {
    const [bottleModal, setBottleModal]=useState(false)


    const handleCloseBottleModal = () => {
        setBottleModal(false)
    }

    const handleOpenBottleModal = () => {
        setBottleModal(true)
    }


    return (
        <div className="NewBottle">
            <h4>Add Bottle to Storage</h4>
            <FontAwesomeIcon 
                    icon={faPlusSquare} 
                    size="4x" 
                    onClick={handleOpenBottleModal} />
                <Modal 
                    isOpen={bottleModal} 
                    onRequestClose={handleCloseBottleModal}
                    ariaHideApp={false}
                    >
                </Modal>
        </div>
    )
}

export default NewBottle