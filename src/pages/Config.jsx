import React from 'react'
import { useDispatch } from 'react-redux'
import "./styles/config.css"

const Config = ({changeTheme}) => {



    return (
        <article className='config'>
            <section className='config__section'>
                <h2 className='config__title'>Customize your experience</h2>
                <div>
                <button className='config__theme-btn' onClick={changeTheme}><i className='bx bxs-sun'></i>Change Theme</button>
                </div>
                <div>

                </div>
            </section>
        </article>
    )
}

export default Config