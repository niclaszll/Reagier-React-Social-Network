import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// Redux
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'

import CustomButton from '../../util/CustomButton'

const styles = theme => ({
  ...theme.cssStyles,
  button: {
    float: 'right',
  },
})

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false,
  }

  componentDidMount() {
    const { credentials } = this.props
    this.mapUserDetailsToState(credentials)
  }

  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    })
  }

  handleOpen = () => {
    const { credentials } = this.props

    this.setState({
      open: true,
    })
    this.mapUserDetailsToState(credentials)
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = () => {
    const { bio, website, location } = this.state
    const { editUserDetails } = this.props

    const userDetails = {
      bio,
      website,
      location,
    }

    editUserDetails(userDetails)
    this.handleClose()
  }

  render() {
    const { classes } = this.props
    const { open, bio, website, location } = this.state
    return (
      <Fragment>
        <CustomButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
          <EditIcon color="primary" />
        </CustomButton>
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle>
          <span className={classes.visibleSeparator} />
          <DialogContent className={classes.dialogContent}>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={bio}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your website"
                className={classes.textField}
                value={website}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Your location"
                className={classes.textField}
                value={location}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
            </form>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={this.handleClose} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  credentials: state.user.credentials,
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
