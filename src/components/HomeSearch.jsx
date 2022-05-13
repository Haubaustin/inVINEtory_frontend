import { useEffect, useState } from "react"


const HomeSearch = ({handleSubmit, clearResults}) => {
const [data, setData]=useState("")
const [debounced, setDebounced]=useState(data)

 const handleChange = (e) => {
        setDebounced(e.target.value)
    }

    useEffect(()=> {
        const time = setTimeout(()=> setData(debounced), 700)
            return () => clearTimeout(time)
    }, [debounced])


    useEffect(()=> {
        if(data!== ''){
            handleSubmit(data)
        }
        else {
            clearResults()
        }
    }, [data])
    
    return (
        <div>
        <p>Search all of your storage by any characteristics of the bottles. <br/>Results will be displayed on the left</p>
                    <input 
                        type ='text' 
                        name ="search_query" 
                        placeholder="eg: Red, Paso Robles, Cab" 
                        value={debounced} 
                        onChange={handleChange} />
                        <br/>
        </div>
    )
}

export default HomeSearch