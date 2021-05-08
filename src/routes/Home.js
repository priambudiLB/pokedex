import React, { Fragment, useState } from 'react'

import { useQuery } from '@apollo/client'
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroller'

import FixedCenter from '../components/FixedCenter'
import Loading from '../components/Loading'
import PokemonCard from '../components/PokemonCard'
import getPokemons from '../graphql/queries/getPokemons.gql'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))

const Home = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, fetchMore } = useQuery(getPokemons, {
    variables: {
      limit: 12,
      offset: 0
    },
    notifyOnNetworkStatusChange: false,
    onCompleted: (data) => {
      setData(data.pokemons.results)
      setHasMore(typeof data.pokemons.next === 'string')
    }
  })

  const loadMore = () => {
    fetchMore({
      variables: {
        limit: 12,
        offset: data.length
      }
    }).then((newData) => {
      setData(prevState => [...prevState, ...newData.data.pokemons.results])
    })
  }

  if (loading) {
    return <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((props) => {
            return (
              <Grid key={props} item xs={12} sm={6} md={4} lg={3}>
                <Loading />
              </Grid>
            )
          }
          )}
        </Grid>
      </div>
    </Container>
  }
  if (error) {
    return <FixedCenter>
      <p>Error :(</p>
    </FixedCenter>
  }
  if (data) {
    return (
      <Fragment>
        <Helmet>
          <title>Pokédex</title>
          <meta name="description" content="Pokédex and catch Pokémon!" data-react-helmet="true" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" data-react-helmet="true" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" data-react-helmet="true" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" data-react-helmet="true" />
        </Helmet>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<div css={css`text-align: center`}>
            <CircularProgress aria-label="progress" />
          </div>}
          initialLoad={false}
          threshold={500}
        >
          <Container maxWidth="lg">
            <div className={classes.root}>
              <Grid container spacing={3}>
                {data.map((props, idx) => {
                  return (
                    <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                      <PokemonCard {...props} />
                    </Grid>
                  )
                }
                )}
              </Grid>
            </div>
          </Container>
        </InfiniteScroll>
      </Fragment>
    )
  } else return ''
}

export default Home
