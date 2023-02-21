import { current } from '@reduxjs/toolkit'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/layout/Header'
import PokemonCard from '../components/pokedex/PokemonCard'
import "./styles/Pokedex.css"

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
    //almacena la pagina actual
    const [currentPage, setCurrentPage] = useState()


    const nameTrainer = useSelector(store => store.nameTrainer)

    const handleChangeSelect = (e) => {
        setSelectType(e.target.value)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
        e.target.reset()
    } 

    const paginationLogic = () => {
        //cantidad de pokemons por pagina
        const pokemonPerPage = 12;

        //pokemons que se van a mostrar en la pagina actual
        const sliceStart = (currentPage - 1) * pokemonPerPage
        const sliceEnd = sliceStart + pokemonPerPage
        const pokemonInPage = pokemonsFilter.slice(sliceStart, sliceEnd)

        // encontrar la ultima pagina
        const lastPage = Math.ceil(pokemonsFilter.length / pokemonPerPage) || 1;

        //bloque de paginas actual
        const pagesPerBlock = 5
        const actualBlock = Math.ceil(currentPage / pagesPerBlock)

        //paginas que se van a mostrar en el bloque actual
        const pagesInBlock = [];
        const minPage = (actualBlock * pagesPerBlock - pagesPerBlock) + 1;
        const maxPage = actualBlock * pagesPerBlock;
        for(let i = minPage; i <= maxPage; i++){
            if( i <= lastPage){
                pagesInBlock.push(i)
            }
        }
        return {pagesInBlock, lastPage, pokemonInPage}
    }

    const {pagesInBlock, lastPage, pokemonInPage} = paginationLogic()

    //para ir a la siguiente pagina
    const handleNextPage = () => {
        const newPage = currentPage + 1
        if(newPage > lastPage){
        setCurrentPage(1)
        }else{
            setCurrentPage(newPage)
        }

    }

    // para ir a la pagina anterior
    const handlePreviousPage = () => {
        const newPage = currentPage - 1
        if(newPage < 1){
        setCurrentPage(lastPage)
        }else{
            setCurrentPage(newPage)
        }
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

    useEffect(() => {
        setCurrentPage(1)
    }, [pokemons])
    

    return (
        <main>
            <Header/>
            <p className='pokedex__title'><span className='pokedex__title-red'>Welcome {nameTrainer},</span> here you can find your favorite pokemon </p>
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
            <section className='pokedexList'>
                {
                    pokemonInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
                }

            </section>

            <section>
                <ul>
                    <li onClick={handlePreviousPage}>{"<<"}</li>
                    <li onClick={() =>setCurrentPage(1)}>...</li>
                {
                    pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} key={page}>{page}</li> )
                }
                <li onClick={() =>setCurrentPage(lastPage)}>...</li>
                <li onClick={handleNextPage}>{">>"}</li>
                </ul>
            </section>

        </main>
    )
}

export default Pokedex