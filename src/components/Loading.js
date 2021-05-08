/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import FixedCenter from './FixedCenter'
import loadingGif from '../assets/images/giphy.gif'

const Loading = () => {
  return <FixedCenter>
    <img css={css`max-width:90vw`} src={loadingGif} />
  </FixedCenter>
}

export default Loading
