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
        <main className='pokemon'>
            {/*parte superior*/}
            <article className='pokemon__card'>
                <section className={`pokemonInfo bg-lg-${pokemon?.types[0].type.name}`}>
                    <div className='pokemonInfo__img'>
                        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                    </div>
                </section>

                {/*BODY    */}
                <section className={`pokemon__body bg-lg-${pokemon?.types[0].type.name}`}>
                    <div className='pokemon__body-1'>
                        <h2>#{pokemon?.id}</h2>
                        <h2>{pokemon?.name}</h2>
                    </div>
                    <div className='pokemon__body-2'>
                        <div >
                            <h5>Weight</h5>
                            <h4>{pokemon?.weight / 10} kg</h4>
                        </div>
                        <div>
                            <h5>Height</h5>
                            <h4>{pokemon?.height / 10} m</h4>
                        </div>
                    </div>

                    <div className='pokemon__body-3'>
                        <div className='pokemon__body-3-div'>
                            <div>
                                <h3>Type</h3>
                                {
                                    pokemon?.types.map(type => <div className={`item border-${type.type.name}-pokemon bg-lg-${type.type.name}`} key={type.type.name}><span>{type.type.name}</span></div>)
                                }
                            </div>
                            <div>
                                <h3>Abilities</h3>
                                <div>
                                    {
                                        pokemon?.abilities.map(ability => <div className="item"  key={ability.ability.name}><span>{ability.ability.name}</span></div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*STATS */}
                <section className={`pokemon__stats bg-lg-${pokemon?.types[0].type.name}`}>
                    <h2 className='pokemon__stats-title'>Stats</h2>
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
                                                style={{ width: getPercentBar(stat.base_stat) }}></div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        }
                    </section>
                </section>

                <section>

                </section>
            </article>
        </main >
    )
}

export default Pokemon