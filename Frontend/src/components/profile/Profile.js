import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'

// MUI
import { Button, Typography, Paper } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import { KeyboardReturn } from '@material-ui/icons'
import LanguageIcon from '@material-ui/icons/Language'
import EditIcon from '@material-ui/icons/Edit'
import ScheduleIcon from '@material-ui/icons/Schedule'

// Redux
import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'

import ProfileSkeleton from '../../util/ProfileSkeleton'
import CustomButton from '../../util/CustomButton'
import EditDetails from './EditDetails'

const styles = theme => ({
  ...theme.cssStyles,
})

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadImage(formData)
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props

    let profileMarkup

    if (!loading) {
      if (authenticated) {
        profileMarkup = (
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className="upper-background pattern-background">
                <div className="image-wrapper">
                  <img className="profile-image" src={imageUrl} alt="Profile" />
                  <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                  <CustomButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button">
                    <EditIcon />
                  </CustomButton>
                </div>
              </div>
              <div className="lower-content">
                <div className="profile-details">
                  <div className="profile-details-top">
                    <div>
                      <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5" underline="none">
                        {handle}
                      </MuiLink>
                    </div>
                    {location && (
                      <Typography variant="body2" color="textSecondary" className="location">
                        {location}
                      </Typography>
                    )}
                  </div>
                  <span className={classes.visibleSeparator} />
                  <div className="profile-details-main">
                    <div>{bio && <Typography variant="body">{bio}</Typography>}</div>
                    <div className="additional-info">
                      {website && (
                        <div>
                          <LanguageIcon fontSize="small" color="primary" />
                          <Typography component="a" variant="body2" href={website} target="_blank" rel="noopener noreferrer">
                            {website}
                          </Typography>
                        </div>
                      )}
                      <div>
                        <ScheduleIcon fontSize="small" color="primary" />
                        <Typography component="span" variant="body2">{`Joined ${dayjs(createdAt).format('MMM YYYY')}`}</Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <CustomButton tip="Logout" onClick={this.handleLogout}>
                  <KeyboardReturn color="primary" />
                </CustomButton>
                <EditDetails />
              </div>
            </div>
          </Paper>
        )
      } else {
        profileMarkup = (
          <Paper className={classes.paper}>
            <div className={classes.noUserProfile}>
              <Typography variant="body2" align="center">
                No profile found, please login or create a new account
              </Typography>
              <div className={classes.buttons}>
                <Button variant="contained" color="primary" component={Link} to="/login">
                  Login
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/signup">
                  Signup
                </Button>
              </div>
            </div>
          </Paper>
        )
      }
    } else {
      profileMarkup = <ProfileSkeleton />
    }
    return profileMarkup
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapActionsToProps = { logoutUser, uploadImage }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
