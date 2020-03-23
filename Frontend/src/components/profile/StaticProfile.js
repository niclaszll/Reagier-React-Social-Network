import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// MUI
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import LanguageIcon from '@material-ui/icons/Language'
import ScheduleIcon from '@material-ui/icons/Schedule'

const styles = theme => ({
  ...theme.cssStyles,
})

const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="upper-background pattern-background">
          <div className="image-wrapper">
            <img className="profile-image" src={imageUrl} alt="Profile" />
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
        </div>
      </div>
    </Paper>
  )
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StaticProfile)
