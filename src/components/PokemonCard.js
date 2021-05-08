import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Fade from '@material-ui/core/Fade'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import getPokemon from '../graphql/queries/getPokemon.gql'
import getPokemons from '../graphql/queries/getPokemons.gql'
import capitalize from '../utilities/capitalize'

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

  const classes = useStyles()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(true)
  }, [])

  return (
    <Link
      onMouseOver={() =>
        client.query({
          query: getPokemon,
          variables: { name: name }
        })
      }
      key={idx} to={'/pokedex/' + name} style={{ textDecoration: 'none' }}>
      <Fade timeout={500} direction="up" in={checked} mountOnEnter unmountOnExit>
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
            </CardContent>
          </CardActionArea>
        </Card>
      </Fade>
    </Link>
  )
}

export default PokemonCard
