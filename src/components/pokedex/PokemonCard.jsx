import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./styles/PokemonCard.css"

//HACER UN BOTON EN LA CONFIGURACION PARA CAMBIAR A SHINY Y CAMBIE DE IMAGEN O HASTA DE TIPO DE IMAGEN NORMAL de front_default a front_shiny y despues hacer lo mismo de los types si no hay shiny {pokemon?.types[1] && `/${pokemon?.types[1].type.name}`}  

const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState()
    //hook para redireccionar al hacer click funcionalmente
    const navigate = useNavigate()

    const handleClickPokemon = () => {
        navigate(`/pokedex/${pokemon.id}`)
    }


    useEffect(() => {
        axios.get(pokemonUrl)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.log(err))
    }, [])
    
    return (
        <article className={`pokemonCard bg-lg-${pokemon?.types[0].type.name} border-${pokemon?.types[0].type.name}`} onClick={handleClickPokemon}>
            <section className={`pokemonCard__header `}></section>
            <section className='pokemonCard__body'>
                <div className='pokemonCard__img'>
                    <img src={pokemon?.sprites.other["official-artwork"].front_default } alt="" />
                </div>
                <h3 className='pokemonCard__name'>{pokemon?.name}</h3>
                <h4 className='pokemonCard__types'>{pokemon?.types[0].type.name}{pokemon?.types[1] && `/${pokemon?.types[1].type.name}`} </h4>
                <h6 className='pokemonCard__types-subtitle'>type</h6>
                <hr className='pokemonCard__line'/>
                <section className='pokemonCard__stats'>
                    {
                        pokemon?.stats.map(stat => (
                            <div className='pokemonCard__stat' key={stat.stat.url}>
                                <h5 className='pokemonCard__stat-name'>{stat.stat.name}</h5>
                                <h5 className='pokemonCard__stat-value'>{stat.base_stat}</h5>
                            </div>
                        ))
                    }
                </section>
            </section>
        </article>
    )
}

export default PokemonCard