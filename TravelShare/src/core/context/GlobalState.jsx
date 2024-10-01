import React, { useState } from 'react'
import Context from './Context'

const GlobalState = ({children}) => {

  const [currrentUserName, setCurrrentUserName] = useState('')
  const [routesJoined, setRoutesJoined] = useState([])
  const [routesCreated, setRoutesCreated] = useState([])
  
  return (
    <Context.Provider value={{
      currrentUserName,
      routesJoined,
      routesCreated,
      setCurrrentUserName,
      setRoutesJoined,
      setRoutesCreated
    }}>
        {children}
    </Context.Provider>
  )
}

export default GlobalState