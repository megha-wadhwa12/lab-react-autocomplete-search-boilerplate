import React, { useEffect, useState } from 'react'
import './App.css'
import Data from './resources/countryData.json'

function App() {

  const [suggestion,setSuggestion] = useState([])
  const [input,setInput] = useState("")
  const [escapePress,setEscapePress] = useState(false)

  const submitHandler = (e)=>{
    e.preventDefault()
    // showSuggestion()
  }

  
  useEffect(()=>{
    const handleEscapeKey=(e)=>{
      if(e.key=='Escape'){
        setSuggestion([])
        setEscapePress(true);
      }
    }
    window.addEventListener('keydown',handleEscapeKey);
    return ()=>{
      window.removeEventListener('keydown',handleEscapeKey)
    }

  },[])
  
  useEffect(()=>{
    if(escapePress){
      console.log('EscapeKey Pressed')
      setEscapePress(false);

    }
  },[escapePress])
  

  let arr = [];
  const showSuggestion = (e)=>{
    let value = e.target.value;
    setInput(value)
    // console.log('arr', arr)
    {Data.map((country)=>{
      arr.push(country.name)
    })}
    
    
    const filteredSuggestions = arr.filter((country)=>country.toLowerCase().startsWith(value.toLowerCase()));
    console.log('input:', input)
    setSuggestion(filteredSuggestions)
    console.log('filteredSuggestions', filteredSuggestions)
  }
  
  return (
    <form onSubmit={submitHandler}>
    <input  onChange={(e)=>{
      // setInput(e.target.value)
      showSuggestion(e)}} type="text" placeholder='Enter your country name' />
    <input type="submit" />
    <ul className="suggestions" style={{display: `${input.length==0? "none": "block"}`}}>
      {suggestion.map((e,i)=>(
        <li key={i}>{e}</li>
      ))}
      </ul>
    </form>
  ) 
}

export default App
