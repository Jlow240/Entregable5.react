import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './layout/Header'


const ProteectedRoutes = () => {

    const nameTrainer = useSelector(store => store.nameTrainer)

    if (nameTrainer) {
        return (
            <>
            <Outlet />
            <Footer/>
            </>
        )
    } else {
        return <Navigate to="/" />
    }
}

export default ProteectedRoutes