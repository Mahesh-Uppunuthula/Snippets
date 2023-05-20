import React, {useState, useEffect} from 'react'
import Axios from 'axios'

// const urlPath = "http://localhost:5000/";

const App = () => {

    const [data, setData] = useState("");
    const getData = async ()=>{
        const response = await Axios.get("http://localhost:5000/getData");
        console.log(response);
        setData(response.data)
    }
    useEffect(()=>{
        getData();
    },[])

  return (
    <div><h1>{data}</h1></div>
  )
}

export default App