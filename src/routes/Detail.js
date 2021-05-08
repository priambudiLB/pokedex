import React, { useState, useRef, useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Avatar, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, makeStyles, Menu, MenuItem, Paper, Snackbar, TextField, Typography } from '@material-ui/core'
import capitalize from '../utilities/capitalize'
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import pokemonTypes from '../utilities/pokemonTypes'
import Loading from '../components/Loading'
import PokeBall from '../assets/images/pokeball.svg'
import debounce from '../utilities/debounce'
import { PokemonContext } from '../context/PokemonContext'

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    transition: 'transform .5s'
  }
}))

const ITEM_HEIGHT = 64

const Detail = (props) => {
  const classes = useStyles()
  const { myPokemons, addPokemon, handleSnackbarOpen } = useContext(PokemonContext)
  const [data, setData] = useState([])
  const [translate, setTranslate] = useState([0, 0])
  const [modalOpen, setModalOpen] = useState(false)
  const [nickname, setNickname] = useState('')
  const [nicknameError, setNicknameError] = useState(false)

  const pokeballRef = useRef()
  const pokemonRef = useRef()
  const pokemonID = props.match.params.pokemonID || 'ditto'
  const gqlVariables = {
    limit: 1,
    offset: 0,
    name: pokemonID
  }
  let caught = 0
  try {
    caught = Object.keys(JSON.parse(localStorage.getItem('pokemons'))[data.name]).length
  } catch (e) {

  }
  const { loading, error } = useQuery(GET_POKEMON, {
    variables: gqlVariables,
    notifyOnNetworkStatusChange: false,
    onCompleted: (data) => {
      setData(data.pokemon)
    }
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleRelease = () => {
    setModalOpen(false)
    setTranslate([0, 0])
  }

  const handleFinish = () => {
    addPokemon({
      pokemonName: data.name,
      nickname,
      data
    })
    handleRelease()
    handleSnackbarOpen({ severity: 'success', text: 'Saved to Pokémon List!' })
  }

  const handleNickname = (e) => {
    const newNickname = e.target.value
    if (myPokemons[data.name]) {
      if (myPokemons[data.name][newNickname]) { setNicknameError('Nickname Exist!') } else {
        setNicknameError(false)
        setNickname(newNickname)
      }
    } else {
      setNicknameError(false)
      setNickname(newNickname)
    }
  }

  const handleCatch = (event) => {
    const transformY = pokemonRef.current.offsetTop - pokeballRef.current.offsetTop + 24 + 4
    const transformX = pokemonRef.current.offsetLeft - pokeballRef.current.offsetLeft + 24 + 4
    setTranslate([transformX, transformY])
    setTimeout(() => {
      const probability = Math.random()
      if (probability >= 0.5) {
        handleModalOpen()
      } else {
        handleSnackbarOpen({ severity: 'error', text: 'Oh, no! The POKéMON broke free!' })
        setTranslate([0, 0])
      }
    }, 1000)
  }

  if (loading) {
    return <Loading />
  }
  if (error) return <p>Error :(</p>

  if (data.sprites) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.paper}>
            <Typography variant="h3" component="h1">
              {capitalize(data.name)}
            </Typography>
            <div css={css`display: flex;justify-content: center;align-items: baseline;`}>
              {data.types.map((data, index) => {
                return <Chip key={index} size="small" label={data.type.name} css={css`margin: 2px;background-color: ${pokemonTypes(data.type.name)}`} />
              })}
            </div>
            <img ref={pokemonRef} alt={`Sprite of ${data.name}`} src={data.sprites.front_default} />
            <Typography variant="h5">
                caught: {caught}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.paper}>
            <Button aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true" onClick={handleClick} variant="contained" color="default"
            >
              Moves
            </Button>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5
                }
              }}
            >
              {data.moves.map((item, index) => (
                <MenuItem key={item.move.name} onClick={handleClose}>
                  {`${index + 1}. ${item.move.name}`}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
        <Avatar css={css`transform: translate(${translate[0]}px,${translate[1]}px) rotate(${translate[0] === 0 ? 0 : 3}turn) scale(${translate[0] === 0 ? 1 : 2.2})`} onClick={handleCatch} ref={pokeballRef} className={classes.fab} alt="Catch" src={PokeBall} />
        <Dialog open={modalOpen} onClose={handleRelease} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Gotcha! {data.name.toUpperCase()} was caught!</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Give a nickname to the captured {data.name.toUpperCase()}.
            </DialogContentText>
            <TextField
              error={typeof nicknameError === 'string'}
              autoComplete='off'
              helperText={typeof nicknameError === 'string' ? nicknameError : ''}
              onChange={debounce(handleNickname, 500)}
              autoFocus
              margin="dense"
              id="nickname"
              label={typeof nicknameError === 'string' ? 'Error' : 'Nickname'}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRelease} color="default">
            Release
            </Button>
            <Button disabled={typeof nicknameError === 'string'} onClick={handleFinish} color="default">
            Finish
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    )
  } else return ''
}

export default Detail
