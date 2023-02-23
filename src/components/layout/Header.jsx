import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/slice/nameTrainer.slice'
import "./styles/Header.css"

const Header = () => {

    const dispatch = useDispatch()

    const handleClickLogOut = () => {
        dispatch(logOut())
    }

    return (
        <header className='header'>
            <div className='header__img-conteiner'>
                <img className='header__img' src="/images/pokedex.png" alt="" />
            </div>
            <div className='header__btn-conteiner'>
                <button className='header__btn' onClick={handleClickLogOut}>
                    <i className='bx bx-log-out'></i>
                </button>
                <label htmlFor="">LogOut</label>
            </div>
        </header>
    )
}

export default Header