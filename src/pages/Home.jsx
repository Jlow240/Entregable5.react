import React from 'react'
import { useDispatch } from 'react-redux';
import { setNameTrainerGlobal } from '../store/slice/nameTrainer.slice';
import "./styles/Home.css"

const Home = () => {

    const dispatch = useDispatch()

    const handleSumbit = (e) => {
        e.preventDefault();
        const nameTrainer = e.target.nameTrainer.value;
        dispatch(setNameTrainerGlobal(nameTrainer));
    }

    return (
        <>
        <main className='home'>
            <section className='home__section'>
                <div className='home__img'>
                    <img src="/images/pokedex.png" alt="" />
                </div>
                <h2 className='home__title'>Hello Trainer!</h2>
                <p className='home__p'>Give me your name to star!</p>
                <form className='home__form' onSubmit={handleSumbit}>
                    <input id="nameTrainer" type="text"  placeholder='your name...'/>
                    <button className='home__btn'>START</button>
                </form>
            </section>
        </main>
        <footer className='home__footer'>

        </footer></>
    )
}

export default Home