import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

// Redux
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import Comments from './Comments'

const styles = theme => ({
  ...theme.cssStyles,
  profileImage: {
    maxWidth: 200,
    height: 200,
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '2%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerContainer: {
    textAlign: 'center',
    margin: '50px auto',
  },
})

class PostDialog extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.post.comments !== prevProps.post.comments) {
      console.log(this.props.post.comments)
    }
  }

  render() {
    const {
      classes,
      post: { comments, postId },
      ui: { loading },
    } = this.props
    let dialogMarkup

    if (loading || comments === undefined) {
      dialogMarkup = (
        <div className={classes.spinnerContainer}>
          <CircularProgress size={150} thickness={2} />
        </div>
      )
    } else if (comments.length === 0) {
      dialogMarkup = (
        <Grid container>
          <CommentForm postId={postId} />
          <span>No comments yet. Be the first one!</span>
        </Grid>
      )
    } else {
      dialogMarkup = (
        <Grid container>
          <CommentForm postId={postId} />
          {comments !== undefined ? <Comments comments={comments} /> : null}
        </Grid>
      )
    }
    return <Fragment>{dialogMarkup}</Fragment>
  }
}

PostDialog.propTypes = {
  post: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  ui: state.ui,
})

export default connect(mapStateToProps)(withStyles(styles)(PostDialog))
