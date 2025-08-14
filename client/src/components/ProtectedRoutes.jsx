import {Navigate} from 'react-router-dom'
import React from 'react'

export default function ProtectedRoutes({children}) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/"/>
}

