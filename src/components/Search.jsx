import { useState } from "react"
import { useParams } from "react-router-dom"
import Client from "../services/api"

const Search = () => {
    const { storage_id } =useParams()
    const [data, setData] =useState({
        search_query: ""
    })
    const [bottle, setBottle] =useState()

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const findAny = async (e) => {
        e.preventDefault()
        await Client.get(`/bottle/findinstorage/${storage_id}/${data.search_query}`)
        .then((res)=> {
            setBottle(res.data)
        })
    }


    return (
        <div>
            <div>
                <h3>Search</h3>
                <p>Search current storage by any characteristic of the bottle</p>
                <form onSubmit={findAny}>
                    <input type ='text' name ="search_query" placeholder="eg: Red, Paso Robles, Cab" value={data.search_query} onChange={handleChange} />
                    <br/>
                    <br/>
                    <button className="searchSubmit">Search</button>
                </form>
            </div>
            <div className="storageSearchResults">
                    <table className="results">
                        <tr>
                            <th>Name:</th>
                            <th>Year:</th>
                            <th>Row/Col:</th>
                        </tr>
                {bottle && bottle.map((bot)=> (
                        <tr className="resultsRow">
                            <td>{bot.name}</td>
                            <td>{bot.vintage}</td>
                            <td>{parseInt(bot.row)+1}/{parseInt(bot.column)+1}</td>
                        </tr>
                ))}
                        </table>
            </div>
        </div>
    )
}

export default Search