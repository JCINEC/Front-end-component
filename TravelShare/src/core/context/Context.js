import {createContext} from 'react'

const context = createContext(
    {
        currrentUserId: '',
        joinedRoutesId: []
    }
)

export default context