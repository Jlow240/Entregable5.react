import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {
    //almacena todos los pokemons en la API
    const [pokemons, setPokemons] = useState([])
    //almacena los pokemons filtrados por el nombre del form
    const [pokemonsFilter, setPokemonsFilter] = useState([])
    //almacena la lista de tipos a mostrar en el select
    const [types, setTypes] = useState([])
    //almancena el nombre que selecionamos en el select
    const [selectType, setSelectType] = useState("")
    //almacena el submit del form para buscar por nombre
    const [pokemonName, setPokemonName] = useState("")


    const nameTrainer = useSelector(store => store.nameTrainer)

    const handleChangeSelect = (e) => {
        setSelectType(e.target.value)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)

    } 

    //efecto para obtener los pokemones por tipo o de todos los tipos
    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=20"}`
        axios.get(URL)
            .then((res) => {
                if(selectType){
                    const pokemonByType = (res.data.pokemon.map(pokemon => {
                        return{
                            name: pokemon.pokemon.name,
                            url: pokemon.pokemon.url
                        }
                    }))
                    setPokemons(pokemonByType)
                }else {
                    setPokemons(res.data.results)
                }
            })
            .catch((err) => console.log(err))
    }, [selectType])


    useEffect(() => {
        const pokemonByName = pokemons.filter( pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
        setPokemonsFilter(pokemonByName)

    }, [pokemonName, pokemons])
    
    //efecto para obtener lo selecionado en el select
    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type/"
        axios.get(URL)
        .then((res) => setTypes(res.data.results))
        .catch((err) => console.log(err))
    }, [])





    return (
        <main>
            <p><span>Welcome {nameTrainer},</span> here you can find your favorite pokemon </p>
            <form onSubmit={handleSumbit}>
                <div>
                    <input id="pokemonName" placeholder='Search pokemon' />
                    <button>Catch!</button>
                </div>
                <select onChange={handleChangeSelect}>
                    <option value="">All Types</option>
                    {
                        types.map(type => <option key={type.url}>{type.name}</option>)
                    }
                </select>
            </form>
            <section>
                {
                    pokemonsFilter.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
                }

            </section>
        </main>
    )
}

export default Pokedex