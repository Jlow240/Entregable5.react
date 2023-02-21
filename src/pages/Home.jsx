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
                <div className='home__img pokeball'>
                    <img src="/images/Poke_Ball_icon.png" alt="" />
                </div>
                <h2 className='home__title'>Hello Trainer!</h2>
                <p className='home__p'>Type your name and push start!</p>
                <form className='home__form' onSubmit={handleSumbit}>
                    <input className='home__input' id="nameTrainer" type="text"  placeholder='your name here...'/>
                    <button className='home__btn'>START</button>
                </form>
            </section>
        </main>
        <footer className='home__footer'>
            <h2>Created by jlo</h2>
        </footer></>
    )
}

export default Home