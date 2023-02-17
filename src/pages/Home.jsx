import React from 'react'
import { useDispatch } from 'react-redux';
import { setNameTrainerGlobal } from '../store/slice/nameTrainer.slice';

const Home = () => {

    const dispatch = useDispatch()

    const handleSumbit = (e) => {
        e.preventDefault();
        const nameTrainer = e.target.nameTrainer.value;
        dispatch(setNameTrainerGlobal(nameTrainer));
    }

    return (
        <main>
            <section>
                <div>
                    <img src="/images/pokedex.png" alt="" />
                </div>
                <h2>Hello Trainer!</h2>
                <p>Give me your name to star!</p>
                <form onSubmit={handleSumbit}>
                    <input id="nameTrainer" type="text"  placeholder='your name...'/>
                    <button>START</button>
                </form>

            </section>
        </main>
    )
}

export default Home