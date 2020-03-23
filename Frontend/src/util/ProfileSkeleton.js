import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI
import Paper from '@material-ui/core/Paper'

import NoImage from '../images/no-image.png'

const styles = theme => ({
  ...theme.cssStyles,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: '40%',
    margin: '0 0 7px 0',
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '80%',
    margin: '0 0 10px 0',
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '60%',
    margin: '0 0 10px 0',
  },
})

const ProfileSkeleton = props => {
  const { classes } = props
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="upper-background">
          <div className="image-wrapper">
            <img className="profile-image" src={NoImage} alt="Profile" />
          </div>
        </div>
        <div className="lower-content">
          <div className="profile-details">
            <div className="profile-details-top">
              <div>
                <div className={classes.handle} />
              </div>
              <div className={classes.halfLine} />
            </div>
            <span className={classes.visibleSeparator} />
            <div className="profile-details-main">
              <div className={classes.fullLine} />
              <div className="additional-info">
                <div className={classes.halfLine} />
                <div className={classes.halfLine} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileSkeleton)
