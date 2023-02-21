import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./styles/footer.css"

const Footer = () => {

    const navigate = useNavigate()


    const handleClickConfig = () => {
        navigate(`/config`)
    }



    return (
        <footer className='footer'>
            <h2><a href='https://github.com/Jlow240' target="__blank">Created by jlo</a></h2>
            <button onClick={handleClickConfig}>Configuration  <i className='bx bxs-cog' ></i></button>
        </footer>
    )
}

export default Footer