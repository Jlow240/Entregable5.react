import React from 'react'
import "./styles/config.css"

const Config = ({changeTheme}) => {
    return (
        <article className='config'>
            <section className='config__section'>
                <button className='config__theme-btn' onClick={changeTheme}><i className='bx bxs-sun'></i>Change Theme</button>
            </section>
        </article>
    )
}

export default Config