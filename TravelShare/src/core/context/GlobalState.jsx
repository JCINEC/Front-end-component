import React, { useState } from 'react'
import Context from './Context'

const GlobalState = ({children}) => {

  const [currentUserId, setCurrentUserId] = useState('')
  const [joinedRoutesId, setJoinedRoutesId] = useState([])

  return (
    <Context.Provider value={{
        currentUserId,
        joinedRoutesId,
        setCurrentUserId,
        setJoinedRoutesId
    }}>
        {children}
    </Context.Provider>
  )
}

export default GlobalState