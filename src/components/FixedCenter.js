/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const FixedCenter = ({ children }) => {
  return (
    <div css={css`position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);`}>
      {children}
    </div>
  )
}

export default FixedCenter
