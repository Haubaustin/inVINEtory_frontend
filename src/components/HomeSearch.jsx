import { useEffect, useState } from "react"


const HomeSearch = ({handleSubmit, clearResults, description}) => {
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
            <p>{description}</p>
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