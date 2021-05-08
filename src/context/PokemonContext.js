import React, { createContext, useState } from 'react'

export const PokemonContext = createContext(null)

export const PokemonProvider = (props) => {
  let defaultMyPokemons = {}
  const local = typeof window !== 'undefined' && window.localStorage.getItem('pokemons')
  if (local) defaultMyPokemons = JSON.parse(local)
  const [myPokemons, setMyPokemons] = useState(defaultMyPokemons)
  const [snackbarOpen, setSnackbarOpen] = useState({
    isOpen: false,
    severity: 'error',
    text: ''
  })

  const setPokemonsOnStorage = (myPokemons) => {
    setMyPokemons(myPokemons)
    try {
      localStorage.setItem('pokemons', JSON.stringify(myPokemons))
      return true
    } catch (error) {
      return false
    }
  }

  const addPokemon = ({ pokemonName, nickname, data }) => {
    const newMyPokemons = { ...myPokemons }
    if (newMyPokemons[pokemonName]) {
      newMyPokemons[pokemonName][nickname] = data
    } else {
      newMyPokemons[pokemonName] = { [nickname]: data }
    }
    setPokemonsOnStorage(newMyPokemons)
  }

  const removePokemon = (name, deletedPokemonName) => {
    try {
      const newMyPokemons = { ...myPokemons }
      const pokemonNames = Object.keys(myPokemons)
      pokemonNames.forEach(pokemonName => {
        const item = newMyPokemons[pokemonName]
        if (item[name]) {
          if (item[name].name === deletedPokemonName) {
            delete item[name]
          }
        }
      })
      setPokemonsOnStorage(newMyPokemons)
      return true
    } catch (error) {
      return false
    }
  }

  const countPokemons = () => {
    return Object.values(myPokemons).reduce((acc, val) => {
      return acc + Object.keys(val).length
    }, 0)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(prev => {
      return {
        ...prev,
        isOpen: false
      }
    })
  }

  const handleSnackbarOpen = ({ severity, text }) => {
    setSnackbarOpen({ severity, text, isOpen: true })
  }

  return (
    <PokemonContext.Provider
      value={{ myPokemons, addPokemon, removePokemon, countPokemons, snackbarOpen, handleSnackbarOpen, handleSnackbarClose }}
    >
      {props.children}
    </PokemonContext.Provider>
  )
}
