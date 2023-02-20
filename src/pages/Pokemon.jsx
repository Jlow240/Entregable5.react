import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Pokemon = () => {
    const [pokemon, setPokemon] = useState()


    const { id } = useParams()


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
                        <h4>{pokemon?.weight}</h4>
                    </div>
                    <div>
                        <h5>height</h5>
                        <h4>{pokemon?.height}</h4>
                    </div>
                </div>

                <div>
                    <div>
                        <h3>type</h3>
                        <div>
                            {
                                pokemon?.types.map(type => <div key={type.type.name}><span>{type.type.name}</span></div>)
                            }
                        </div>
                        <div>
                            <h3>abilities</h3>
                            <div>
                                {
                                    pokemon?.abilities.map(ability => <div key={ability.ability.name}><span>{ability.ability.name}</span></div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/*STATS */}
                <section>
                    <h2>stats</h2>
                    <section>

                        {
                            pokemon?.stats.map(stat => (
                                <article key={stat.stat.name}>
                                    <div>
                                        <h4>{stat.stat.name}</h4>
                                        <h5>{stat.base_state}/150</h5>
                                    </div>
                                    <div>
                                        <div>
                                            <div></div>
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