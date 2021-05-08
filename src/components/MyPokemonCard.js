import React, { Fragment, useContext, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { PokemonContext } from '../context/PokemonContext'
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const removeDuration = 3
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '0 auto',
    transition: `transform ${removeDuration}s`
  },
  media: {
    height: 250
  }
})

const MyPokemonCard = ({ pokemonName, name, image }) => {
  const { removePokemon, handleSnackbarOpen } = useContext(PokemonContext)

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [scale, setScale] = useState(1)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRelease = () => {
    setScale(0.01)
    handleClose()
    handleSnackbarOpen({ severity: 'info', text: `Goodbye ${name}!` })
    setTimeout(() => {
      removePokemon(name, pokemonName)
    }, removeDuration * 1000)
  }

  return (
    <Fragment>
      <Card className={classes.root} css={css`transform: scale(${scale})`}>
        <CardMedia
          className={classes.media}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleClickOpen} aria-label={`delete ${name}`}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Release ${name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will release {name} into the wild and not having {name} in your pokemon list anymore.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleRelease} color="default">
            Release
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default MyPokemonCard
