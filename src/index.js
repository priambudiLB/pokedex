import '@babel/polyfill'
import React from 'react'

import { ApolloProvider } from '@apollo/client/react'
import ReactDOM from 'react-dom'

import { App } from './app'
import { PokemonProvider } from './context/PokemonContext'
import client from './graphql/client'

ReactDOM.render(
  <ApolloProvider client={client}>
    <PokemonProvider>
      <App/>
    </PokemonProvider>
  </ApolloProvider>,
  document.getElementById('App')
)
