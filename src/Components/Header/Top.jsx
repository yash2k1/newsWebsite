import React from 'react'
import { useNavigate } from 'react-router-dom'

const Top = () => {
  const navigate=useNavigate();
  const ToHome=()=>{
    navigate('/')
  }
  return (
  
     <div onClick={ToHome} className='header'>
    <div className="the">The</div>
    <div className="siren">siren</div>
    <p className="news">news</p>
    </div> 
   
  )
}

export default Top
