import React, { useContext, useEffect, useState } from 'react';
import { getUserRoutes } from '../core/services/userFetch.js';
import LoginPage from './LoginPage.jsx';
import context from '../core/context/Context'
import RouteDetailPage from './RouteDetailPage.jsx';



const UserRoutesPage = async () => {
    const {currrentUserName,
        routesCreated,
        setRoutesCreated,
        routesJoined,
        setRoutesJoined} = useContext(context)
    const [option, setOption] = useState("ROUTES")
    useEffect(() =>{
        const fetchUserRoutes = async () => {
            try {
                const result = await getUserRoutes(currrentUserName)
                return result
            } catch (error) {
                console.error('Error al obtener productos:', error)
            }
        }
        const routes = fetchUserRoutes(currrentUserName)
        setRoutesCreated(routes.filter(route => route.createdBy === currentUserName))
        setRoutesJoined(routes.filter(route => route.createdBy !== currentUserName))

    }, [])
    
    return (
        <div>
          <Header title="USER ROUTES"/>
          <div>
            <button onClick={()=>setOption("LOGOUT")}>Logout</button><button onClick={()=>setOption("SEARCH")}>SEARCH</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {routesCreated.length > 0 ? (
              routesCreated.map(route => (
                <div key={route._id} style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>
                  <p>ID: {route._id}</p>
                  <p>DISTANCE: {product.distance}</p>
                  <button onClick={() => setSelectedRouteDetails(product._id)}>Details</button>
                </div>
              ))
            ) : (
              <p>You haven't created any route</p>
            )}
          </div>
          <div>
            {routesCreated.length > 0 ? (
              routesJoined.map(route => (
                <div key={route._id} style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>
                  <p>ID: {product._id}</p>
                  <p>Name: {product.nombre}</p>
                  <button onClick={() => setSelectedRouteDetails(product._id)}>Details</button>
                </div>
              ))
            ) : (
              <p>You haven't joined any route</p>
            )}
          </div>
    
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button  onClick={() => setBackFlag(true)}>Back</button>
          </div>
        </div>
      );
}

export default UserRoutesPage