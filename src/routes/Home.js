import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import PokemonCard from '../components/PokemonCard'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from '@material-ui/core/CircularProgress'
import FixedCenter from '../components/FixedCenter'
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Loading from '../components/Loading'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`

const Home = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, fetchMore } = useQuery(GET_POKEMONS, {
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
    return <Loading />
  }
  if (error) {
    return <FixedCenter>
      <p>Error :(</p>
    </FixedCenter>
  }
  if (data) {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<div css={css`text-align: center`}>
          <CircularProgress aria-label="progress" />
        </div>}
        initialLoad={false}
        threshold={400}
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
    )
  } else return ''
}

export default Home
