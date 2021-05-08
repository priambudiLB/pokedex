import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './routes/Home'
import Detail from './routes/Detail'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import MyPokemons from './routes/MyPokemons'
import Alert from './components/Alert'
import { Snackbar } from '@material-ui/core'
import { PokemonContext } from './context/PokemonContext'

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const { snackbarOpen, handleSnackbarClose } = useContext(PokemonContext)
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  )

  useEffect(() => {
    const myPokemons = localStorage.getItem('pokemons')
    if (myPokemons === null) {
      localStorage.setItem('pokemons', JSON.stringify({}))
    }
  }, [])
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/my-pokemons" component={MyPokemons}/>
          <Route path="/pokedex/:pokemonID" component={Detail}/>
        </Switch>
      </BrowserRouter>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbarOpen.isOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarOpen.severity}>
          {snackbarOpen.text}
        </Alert>
      </Snackbar>
    </MuiThemeProvider>
  )
}
