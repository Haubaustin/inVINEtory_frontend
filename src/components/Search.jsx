import { useState } from "react"
import Client from "../services/api"

const Search = () => {
    const [data, setData] =useState({
        search_query: ""
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const findAny = async (e) => {
        e.preventDefault()
        const query = await Client.get(`/bottle/`)
    }


    return (
        <div>
            <div>
                <h3>Search</h3>
                <form>
                    <input type ='text' name ="query" placeholder="Search name, region, varietal..." value={data.search_query} onChange={handleChange} />
                    <br/>
                    <br/>
                    <button className="searchSubmit">Search</button>
                </form>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Search