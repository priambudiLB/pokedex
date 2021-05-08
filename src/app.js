import React, { Suspense, useContext, useEffect } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Snackbar from '@material-ui/core/Snackbar'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Alert from './components/Alert'
import Navigation from './components/Navigation'
import { PokemonContext } from './context/PokemonContext'
import routes from './route'

export const App = () => {
  const { snackbarOpen, handleSnackbarClose } = useContext(PokemonContext)
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  })

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
          <Suspense fallback={'.'}>
            {routes.map(route => {
              return <Route key={route.path} {...route} />
            })}
          </Suspense>
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
