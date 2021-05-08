/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import loadingGif from '../assets/images/giphy.gif'
import FixedCenter from './FixedCenter'

const Loading = () => {
  return <FixedCenter>
    <img css={css`max-width:90vw`} src={loadingGif} />
  </FixedCenter>
}

export default Loading
