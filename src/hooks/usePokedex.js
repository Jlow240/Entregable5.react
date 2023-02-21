import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { paginationLogic } from "../utils/pagination"


const usePokedex = () => {
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


    const handleChangeSelect = (e) => {
        setSelectType(e.target.value)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
        e.target.reset()
    }


    //para ir a la siguiente pagina
    const handleNextPage = () => {
        const newPage = currentPage + 1
        if (newPage > lastPage) {
            setCurrentPage(1)
        } else {
            setCurrentPage(newPage)
        }

    }

    // para ir a la pagina anterior
    const handlePreviousPage = () => {
        const newPage = currentPage - 1
        if (newPage < 1) {
            setCurrentPage(lastPage)
        } else {
            setCurrentPage(newPage)
        }
    }


    const { pagesInBlock, lastPage, pokemonInPage } = useMemo(() => {
    return  paginationLogic(pokemonsFilter, currentPage) 
    }, [pokemonsFilter, currentPage])



    //efecto para obtener los pokemones por tipo o de todos los tipos
    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=20"}`
        axios.get(URL)
            .then((res) => {
                if (selectType) {
                    const pokemonByType = (res.data.pokemon.map(pokemon => {
                        return {
                            name: pokemon.pokemon.name,
                            url: pokemon.pokemon.url
                        }
                    }))
                    setPokemons(pokemonByType)
                } else {
                    setPokemons(res.data.results)
                }
            })
            .catch((err) => console.log(err))
    }, [selectType])


    useEffect(() => {
        const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
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



    return {
        handleSumbit,
        handleChangeSelect,
        types,
        pokemonInPage,
        handlePreviousPage,
        handleNextPage,
        pagesInBlock
    }
}

export default usePokedex

/*const {
    handleSumbit,
    handleChangeSelect,
    types,
    pokemonInPage,
    handlePreviousPage,
    handleNextPage,
    pagesInBlock
} = usePokedex() */