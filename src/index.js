import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import { ApolloProvider } from '@apollo/client/react'
import client from './client'
import { PokemonProvider } from './context/PokemonContext'

ReactDOM.render(
  <ApolloProvider client={client}>
    <PokemonProvider>
      <App/>
    </PokemonProvider>
  </ApolloProvider>,
  document.getElementById('App')
)
