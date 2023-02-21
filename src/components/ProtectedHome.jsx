import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from './Footer'

const ProtectedHome = () => {

    const nameTrainer=  useSelector(store => store.nameTrainer)

    if(nameTrainer) {
    return <Navigate to= "/pokedex"/>
    }else{
    return (
        <>
    <Outlet/>
    <Footer/>
    </>
    )

    }
}

export default ProtectedHome