import {createContext} from 'react'

const context = createContext(
    {
        currrentUserName: '',
        joinedUserRoutes: []
    }
)

export default context