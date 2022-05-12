import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons"
import Modal from 'react-modal';
import NewStorage from "../components/NewStorage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Client from "../services/api";



const Home = ({ user }) => {
    const navigate = useNavigate()
    const [storageArea, SetStorageArea] =useState([])
    const {userId} = useParams()
    const [storageModal, setStorageModal]=useState(false)

    useEffect(() => {
        getStorageAreas()
    }, [])

    const handleOpenStorageModal = () => {
        setStorageModal(true)
    }

    

    const handleCloseStorageModal = () => {
        setStorageModal(false)
    }

    
    const getStorageAreas = async () => {
        const res = await Client.get(`storage/${userId}/all`)
        console.log(res)
        SetStorageArea(res.data)
    }

    // const getWineBottles = async () => {
    //     const res = await Client.get(`storage/${user}`)
    // }


    return (user) ? (
    <div className="Home">
        <div className="homeStorage">
            <div className="homeStorageComp">
                <h2>{user}'s Storage</h2>
                <div className="storageDisplayCont">
                {storageArea && storageArea.map((sto) => (
                    <div key={sto.id} className="homeStorageDisplay">
                    <Link to={`/${userId}/storage/${sto.id}`}>
                        <h4>{sto.name}</h4>
                    </Link>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <div className="homeBottle">
            <div className="homeBottleDisplay">
                <h2>{user}'s Bottles</h2>
                {/* API  call to list/display user's bottles */}

            </div>
        </div>        
        <div className="homeAddDiv">
                <h2 className="homeAddTitle">Add New Storage</h2>
                <FontAwesomeIcon 
                    icon={faPlusSquare} 
                    size="7x" 
                    onClick={handleOpenStorageModal}
                    className="faNewStorage"/>
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
        <div className="homeSearch">

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