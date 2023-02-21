import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles/Pokemon.css"

const Pokemon = () => {
    const [pokemon, setPokemon] = useState()


    const { id } = useParams()

    const getPercentBar = (stat) => {
        const percent = (stat * 100) / 255
        return `${percent}%`
    }

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
        axios.get(URL)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    }, [])


    return (
        <main>
            {/*parte superior*/}
            <section className='PokemonInfo'>
                <div>
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                </div>
            </section>


            {/*BODY    */}
            <section>
                <h2># {pokemon?.id}</h2>
                <h2>{pokemon?.name}</h2>

                <div>
                    <div>
                        <h5>Weight</h5>
                        <h4>{pokemon?.weight / 10} kg</h4>
                    </div>
                    <div>
                        <h5>height</h5>
                        <h4>{pokemon?.height / 10} m</h4>
                    </div>
                </div>

                <div>
                    <div>
                        <h3><b>type</b></h3>
                        <div >
                            {
                                pokemon?.types.map(type => <div className={`border-${type.type.name} bg-lg-${type.type.name}`} key={type.type.name}><span>{type.type.name}</span></div>)
                            }
                        </div>
                        <div>
                            <h3><b>abilities</b></h3>
                            <div>
                                {
                                    pokemon?.abilities.map(ability => <div key={ability.ability.name}><span>{ability.ability.name}</span></div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/*STATS */}
                <section className='pokemon__stats'>
                    <h2 className='pokemon__stats-title'>stats</h2>
                    <section className='pokemon__stats-info'>

                        {
                            pokemon?.stats.map(stat => (
                                <article className='pokemon__stat' key={stat.stat.name}>
                                    <div className='pokemon__stat-header'>
                                        <h4>{stat.stat.name}</h4>
                                        <h5>{stat.base_stat}/255</h5>
                                    </div>
                                    <div className='pokemon__stat-bar'>
                                        <div className='pokemon__stat-barGray'>
                                            <div
                                            className='pokemon__stat-barProgress'
                                            style={{width: getPercentBar(stat.base_stat)}}></div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        }
                    </section>
                </section>
            </section>

        </main>
    )
}

export default Pokemon