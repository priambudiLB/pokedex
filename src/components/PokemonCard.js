import React from 'react'
import { Link } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
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
  const classes = useStyles()
  return (
    <Link to={'/pokedex/' + name} style={{ textDecoration: 'none' }}>
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
    </Link>
  )
}

export default PokemonCard
