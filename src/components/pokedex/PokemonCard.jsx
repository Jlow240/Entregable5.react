import axios from 'axios'
import React, { useEffect, useState } from 'react'

//HACER UN BOTON EN LA CONFIGURACION PARA CAMBIAR A SHINY Y CAMBIE DE IMAGEN O HASTA DE TIPO DE IMAGEN NORMAL de front_default a front_shiny y despues hacer lo mismo de los types si no hay shiny {pokemon?.types[1] && `/${pokemon?.types[1].type.name}`}  

const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        axios.get(pokemonUrl)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.log(err))
    }, [])



    return (
        <article >
            <section></section>
            <section>
                <div>
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                </div>
                <h3>{pokemon?.name}</h3>
                <h4>{pokemon?.types[0].type.name}{pokemon?.types[1] && `/${pokemon?.types[1].type.name}`} </h4>
                <h6>type</h6>
                <hr />
                <section>
                    {
                        pokemon?.stats.map(stat => (
                            <div key={stat.stat.url}>
                                <h5>{stat.stat.name}</h5>
                                <h5>{stat.base_stat}</h5>
                            </div>
                        ))
                    }
                </section>
            </section>
        </article>
    )
}

export default PokemonCard