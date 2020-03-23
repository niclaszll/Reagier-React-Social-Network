import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// Redux
import { connect } from 'react-redux'

// MUI
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import AddIcon from '@material-ui/icons/Add'
import { postPost, clearErrors } from '../../redux/actions/dataActions'
import CustomButton from '../../util/CustomButton'

const styles = theme => ({
  ...theme.cssStyles,
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    position: 'absolute',
  },
})

class PostPost extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  }

  componentDidUpdate(prevProps) {
    if (this.props.ui.errors !== prevProps.ui.errors) {
      this.setState({
        errors: this.props.ui.errors,
      })
    }
    if (this.props.ui.errors !== prevProps.ui.errors || this.props.ui.loading !== prevProps.ui.loading) {
      if (!this.props.ui.errors && !this.props.ui.loading) {
        this.setState({
          body: '',
          open: false,
          errors: {},
        })
      }
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.props.clearErrors()
    this.setState({
      open: false,
      errors: {},
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.postPost({ body: this.state.body })
  }

  render() {
    const { errors } = this.state
    const { open } = this.state
    const {
      classes,
      ui: { loading },
    } = this.props
    return (
      <div>
        <CustomButton onClick={this.handleOpen} tip="Create a new post!">
          <AddIcon />
        </CustomButton>
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Create a new post</DialogTitle>
          <span className={classes.visibleSeparator} />
          <DialogContent className={classes.dialogContent}>
            <form>
              <TextField
                name="body"
                type="text"
                label="Create Post"
                multiline
                rows="2"
                fullWidth
                variant="outlined"
                placeholder="Post something..."
                error={!!errors.body}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button type="submit" variant="outlined" color="primary" onClick={this.handleClose} disabled={loading}>
              Cancel
              {loading && <CircularProgress size={30} className={classes.progressSpinner} />}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={this.handleSubmit}
              disabled={loading}
            >
              Submit
              {loading && <CircularProgress size={30} className={classes.progressSpinner} />}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

PostPost.propTypes = {
  postPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  ui: state.ui,
})

export default connect(mapStateToProps, { postPost, clearErrors })(withStyles(styles)(PostPost))
