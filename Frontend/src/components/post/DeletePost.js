import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

// MUI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import { connect } from 'react-redux'
import CustomButton from '../../util/CustomButton'
import { deletePost } from '../../redux/actions/dataActions'

const styles = theme => ({
  deleteButton: {
    color: theme.palette.primary.light,
  },
  deleteConfirmButton: {
    color: '#cc4039',
  },
})

class DeletePost extends Component {
  state = {
    open: false,
  }

  handleOpen = event => {
    this.setState({ open: true })
    event.stopPropagation()
  }

  handleClose = event => {
    this.setState({ open: false })
    event.stopPropagation()
  }

  deletePost = () => {
    this.props.deletePost(this.props.postId)
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    const { open } = this.state
    return (
      <Fragment>
        <CustomButton tip="Delete Post" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
          <DeleteOutline />
        </CustomButton>
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Really delete?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deletePost} className={classes.deleteConfirmButton}>
              Delete Post
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
}

export default connect(null, { deletePost })(withStyles(styles)(DeletePost))
