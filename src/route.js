
import { lazy } from 'react'
const Home = lazy(() => import('./routes/Home'))
const Detail = lazy(() => import('./routes/Detail'))
const MyPokemons = lazy(() => import('./routes/MyPokemons'))

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/my-pokemons',
    component: MyPokemons
  },
  {
    path: '/pokedex/:pokemonID',
    component: Detail
  }
]

export default routes
