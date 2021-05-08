import React, { useContext } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'

import { PokemonContext } from '../context/PokemonContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    bottom: 'auto',
    top: 0
  }
}))

const Navigation = () => {
  const classes = useStyles()
  const { countPokemons } = useContext(PokemonContext)
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" color='default' elevation={2}>
        <Toolbar>
          <Button component={Link} to="/" edge="start">
            <Typography variant="h5" component="h1">
              Pokédex
            </Typography>
          </Button>
          <Typography className={classes.title}>
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              color="inherit"
              component={Link}
              to="/my-pokemons"
            >
              <Badge color="primary" badgeContent={countPokemons()} max={9}>
                <AccountCircle />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ height: 88 }} />
    </div>
  )
}

export default Navigation
