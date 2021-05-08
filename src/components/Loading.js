/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: '0 auto'
  },
  media: {
    height: 250
  }
}))

function Media (props) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Skeleton animation="wave" variant="rect" className={classes.media} />
      <CardContent>
        <Skeleton animation="wave" height={30} width="40%" style={{ marginBottom: 6 }} />
      </CardContent>
    </Card>
  )
}
const Loading = () => {
  return <Media loading />
}

export default Loading
