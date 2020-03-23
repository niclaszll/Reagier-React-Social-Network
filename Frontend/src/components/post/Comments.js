import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...theme.cssStyles,
  containerLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  imageWrapper: {
    width: '75px',
    overflow: 'hidden',
    height: '75px',
    position: 'relative',
  },
  commentImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
  commentCreator: {
    fontWeight: 400,
  },
  comment: {
    borderTop: '2px solid #e9ecf0',
    padding: 20,
    margin: '0 20px 0 20px',
  },
})

class Comments extends Component {
  render() {
    const { comments, classes } = this.props
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment
          return (
            <Grid className={classes.comment} key={index} item sm={12}>
              <Grid container>
                <Grid item className={classes.containerLeft} sm={2}>
                  <div className={classes.imageWrapper}>
                    <img src={userImage} alt="comment" className={classes.commentImage} />
                  </div>
                </Grid>
                <Grid item className={classes.containerRight} sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h6"
                      className={classes.commentCreator}
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1" color="textPrimary">
                      {body}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Comments)
