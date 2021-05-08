import React, { useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import MyPokemonCard from '../components/MyPokemonCard'
import Typography from '@material-ui/core/Typography'
import { PokemonContext } from '../context/PokemonContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))

const MyPokemons = () => {
  const classes = useStyles()
  const { myPokemons, countPokemons } = useContext(PokemonContext)
  if (countPokemons() > 0) {
    const pokemons = Object.values(myPokemons)
    return (
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            {pokemons.map((item, index) => {
              return Object.keys(item).map(key => {
                const nickname = key
                const data = item[key]
                const pokemonName = data.name
                return (
                  <Grid key={`${nickname}-${index}`} item xs={12} sm={6} md={4} lg={3}>
                    <MyPokemonCard pokemonName={pokemonName} name={nickname} image={data.sprites.front_default} />
                  </Grid>
                )
              })
            })}
          </Grid>
        </div>
      </Container>
    )
  } else {
    return (
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Typography gutterBottom variant="h5" component="h2">
            No Pokémons yet!
          </Typography>
        </div>
      </Container>
    )
  }
}

export default MyPokemons
