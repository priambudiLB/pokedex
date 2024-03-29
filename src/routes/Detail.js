import React, { useState, useRef, useContext, Fragment, useEffect } from 'react'

import { useQuery } from '@apollo/client'
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import { Helmet } from 'react-helmet'

import PokeBall from '../assets/images/pokeball.svg'
import Loading from '../components/Loading'
import { PokemonContext } from '../context/PokemonContext'
import getPokemon from '../graphql/queries/getPokemon.gql'
import capitalize from '../utilities/capitalize'
import debounce from '../utilities/debounce'
import pokemonTypes from '../utilities/pokemonTypes'

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
  const [tooltipOpen, setTooltipOpen] = useState(false)

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
    caught = Object.keys(myPokemons[data.name]).length
  } catch (e) {

  }
  const { loading, error } = useQuery(getPokemon, {
    variables: gqlVariables,
    notifyOnNetworkStatusChange: false,
    onCompleted: (data) => {
      setData(data.pokemon)
    }
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    setTimeout(() => {
      setTooltipOpen(true)
      setTimeout(() => {
        setTooltipOpen(false)
      }, 2000)
    }, 500)
  }, [])

  const handleTooltipClose = () => {
    setTooltipOpen(false)
  }

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

  const handleCatch = () => {
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
      <Fragment>
        <Helmet>
          <title>{data.name} | Pokédex</title>
          <meta name="description" content={data.name} />
          <link rel="apple-touch-icon" sizes="180x180" href={data.sprites.front_default} />
          <link rel="icon" type="image/png" sizes="32x32" href={data.sprites.front_default} />
          <link rel="icon" type="image/png" sizes="16x16" href={data.sprites.front_default} />
        </Helmet>
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
              <img width={96} height={96} ref={pokemonRef} alt={`Sprite of ${data.name}`} src={data.sprites.front_default} />
              <Typography variant="h5" component="h2">
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
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                placement="left-start"
                PopperProps={{
                  disablePortal: true
                }}
                onClose={handleTooltipClose}
                open={tooltipOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Click to catch!"
              >
                <Avatar css={css`cursor:pointer;transform: translate(${translate[0]}px,${translate[1]}px) rotate(${translate[0] === 0 ? 0 : 3}turn) scale(${translate[0] === 0 ? 1 : 2.2})`} onClick={handleCatch} ref={pokeballRef} className={classes.fab} alt="Catch" src={PokeBall} />
              </Tooltip>
            </div>
          </ClickAwayListener>
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
                onChange={debounce(handleNickname, 200)}
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
              <Button disabled={typeof nicknameError === 'string' || nickname.length === 0} onClick={handleFinish} color="default">
            Finish
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Fragment>
    )
  } else return ''
}

export default Detail
