import React, { useContext } from 'react'

import { useQuery } from '@apollo/client'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import getPokemon from '../graphql/queries/getPokemon.gql'
import getPokemons from '../graphql/queries/getPokemons.gql'
import capitalize from '../utilities/capitalize'
import { PokemonContext } from '../context/PokemonContext'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '0 auto'
  },
  media: {
    height: 250
  }
})

const PokemonCard = ({ idx, name, image }) => {
  const { client } = useQuery(getPokemons)
  const { myPokemons } = useContext(PokemonContext)
  const classes = useStyles()
  let caught = 0
  try {
    caught = Object.keys(myPokemons[name]).length
  } catch (e) {

  }

  return (
    <Link
      onMouseOver={() =>
        client.query({
          query: getPokemon,
          variables: { name: name }
        })
      }
      key={idx} to={'/pokedex/' + name} style={{ textDecoration: 'none' }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {capitalize(name)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Caught: {caught}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default PokemonCard
