import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons"
import Modal from 'react-modal';
import NewStorage from "../components/NewStorage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Client from "../services/api";
import HomeSearch from "../components/HomeSearch";
import HomeSearchCard from "../components/HomeSearchCard";



const Home = ({ user }) => {
    const navigate = useNavigate()
    const [storageArea, SetStorageArea] =useState([])
    const {userId} = useParams()
    const [storageModal, setStorageModal]=useState(false)
    const [results, setResults] = useState()


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
        SetStorageArea(res.data)
    }

    const handleSubmit = async (x) => {
        const res = await Client.get(`/bottle/findall/${userId}/${x}`)
        setResults(res.data)
        console.log(res.data)
    }

    const clearResults = () => {
        setResults()
    }


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
                {results && results.map((res, i) => (
                    <HomeSearchCard bottle={res} key={i} />
                ))}
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
                            <NewStorage />
                </Modal> 
        </div>
        <div className="homeSearch">
            <h2>Search All Wines</h2>
            <HomeSearch 
                handleSubmit={handleSubmit} 
                clearResults={clearResults}/>
        </div>
    </div>
    ) : (
    <div className="errorPage">
        <div className="errorDiv">
            <h3>Ope!</h3>
            <p>You need to be logged in to access this page don't you know</p>
            <button className="" onClick={()=> navigate('/register')}>Login</button>
        </div>
    </div>
    )
}

export default Home