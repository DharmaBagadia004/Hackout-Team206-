import React, { useState } from 'react'
import PastApi from "../API/PastApi"

const Past_Event = () => {
    const[data,setData]=useState(PastApi)
  return (
    <>
    {
        data.map((cueEle)=>{
            return(
              <tr key={cueEle.event}>
              <td>{cueEle.event}</td>
              <td>{cueEle.date}</td>
              <td>{cueEle.vanue}</td>
              <td><a href={cueEle.more}>Details</a></td>
            </tr>
            )
        })
    }
    </>
  )
}

export default Past_Event
