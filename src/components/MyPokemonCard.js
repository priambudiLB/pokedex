import React, { Fragment, useContext, useState } from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Delete from '@material-ui/icons/Delete'

import { PokemonContext } from '../context/PokemonContext'

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
