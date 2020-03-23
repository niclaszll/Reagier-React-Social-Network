import React from 'react'
import PropTypes from 'prop-types'

// MUI
import { IconButton, Tooltip } from '@material-ui/core'

const CustomButton = ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} placement="top">
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
)

CustomButton.propTypes = {
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  tip: PropTypes.string,
  btnClassName: PropTypes.string,
  tipClassName: PropTypes.string,
}

export default CustomButton
