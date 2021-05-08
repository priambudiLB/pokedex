import React, { Fragment, useContext } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { Helmet } from 'react-helmet'

import MyPokemonCard from '../components/MyPokemonCard'
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
      <Fragment>
        <Helmet>
          <title>My Pokémons | Pokédex</title>
          <meta name="description" content="Pokédex and catch Pokémon!" data-react-helmet="true" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" data-react-helmet="true" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" data-react-helmet="true" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" data-react-helmet="true" />
        </Helmet>
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
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <Helmet>
          <title>My Pokémons | Pokédex</title>
          <meta name="description" content="Pokédex and catch Pokémon!" data-react-helmet="true" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" data-react-helmet="true" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" data-react-helmet="true" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" data-react-helmet="true" />
        </Helmet>
        <Container maxWidth="lg">
          <div className={classes.root}>
            <Typography gutterBottom variant="h5" component="h2">
            No Pokémons yet!
            </Typography>
          </div>
        </Container>
      </Fragment>
    )
  }
}

export default MyPokemons
