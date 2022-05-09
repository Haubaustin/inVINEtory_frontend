import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons"
import Modal from 'react-modal';
import NewStorage from "../components/NewStorage";
import { useState } from "react";



const Home = ({ user }) => {
    const navigate = useNavigate()
    const [storageModal, setStorageModal]=useState(false)
    const [bottleModal, setBottleModal]=useState(false)

    const handleOpenStorageModal = () => {
        setStorageModal(true)
    }

    const handleOpenBottleModal = () => {
        setBottleModal(true)
    }

    const handleCloseStorageModal = () => {
        setStorageModal(false)
    }

    const handleCloseBottleModal = () => {
        setBottleModal(false)
    }


    return (user) ? (
    <div className="Home">
        <div className="homeStorage">
            <div className="homeStorageDisplay">
                <h2>{user}'s Storage</h2>
                {/* API  call to list/display user's storage */}
            </div>
            <div className="homeAdd">
                <h2 className="homeAddTitle">Add New Storage</h2>
                <FontAwesomeIcon 
                    icon={faPlusSquare} 
                    size="7x" 
                    onClick={handleOpenStorageModal}/>
                <Modal 
                    isOpen={storageModal} 
                    onRequestClose={handleCloseStorageModal}
                    ariaHideApp={false}
                    >
                        <div>
                            <NewStorage />
                        </div>
                </Modal> 
                
            </div>
        </div>
        <div className="homeBottle">
            <div className="homeBottleDisplay">
                <h2>{user}'s Bottles</h2>
                {/* API  call to list/display user's bottles */}

            </div>
            <div className="homeAdd">
                <h2 className="homeAddTitle">Add More Bottles</h2>
                <FontAwesomeIcon 
                    icon={faPlusSquare} 
                    size="7x" 
                    onClick={handleOpenBottleModal} />
                <Modal 
                    isOpen={bottleModal} 
                    onRequestClose={handleCloseBottleModal}
                    ariaHideApp={false}
                    >
                    
                </Modal>
            </div>
        </div>        
    </div>
    ) : (
    <div className="errorPage">
        <div className="errorDiv">
            <h3>Ope!</h3>
            <p>You need to be logged in to access this page don't you know</p>
            <button classname="" onClick={()=> navigate('/register')}>Login</button>
        </div>
    </div>
    )
}

export default Home