import '@babel/polyfill'
import React from 'react'

import { ApolloProvider } from '@apollo/client/react'

import { App } from './app'
import { PokemonProvider } from './context/PokemonContext'
import client from './graphql/client'
import { render } from 'react-dom'

const Index = () => {
  return <ApolloProvider client={client}>
    <PokemonProvider>
      <App/>
    </PokemonProvider>
  </ApolloProvider>
}

const rootElement = document.getElementById('App')
render(<Index />, rootElement)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
