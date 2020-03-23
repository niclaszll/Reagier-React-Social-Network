import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'

// MUI
import { Typography } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

// Redux
import { connect } from 'react-redux'
import { getPost, clearErrors } from '../../redux/actions/dataActions'

import LikeButton from './LikeButton'
import PostDialog from './PostDialog'
import DeletePost from './DeletePost'
import CustomButton from '../../util/CustomButton'

const styles = {
  expansionPanel: {
    marginBottom: 16,
    borderRadius: 5,
    boxShadow: 'none',
    '&::before': {
      display: 'none',
    },
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  imageWrapper: {
    minWidth: '120px',
    overflow: 'hidden',
    height: '120px',
    position: 'relative',
    flex: '0 0 auto',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  mainContent: {
    padding: '20px 0',
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  textContent: {
    padding: '0 30px 0 40px',
  },
  controlsContent: {
    marginLeft: 148,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '& .main-controls': {
      display: 'flex',
      width: '100%',
      '& div': {
        marginRight: 15,
      },
    },
  },
  visibleSeparator: {
    width: '100%',
    height: 2,
    backgroundColor: '#E9ECF0',
    display: 'block',
    margin: '0 0 8px 160px',
  },
}

class Post extends Component {
  state = {
    oldPath: '',
    expanded: false,
  }

  handleChange = panel => (event, isExpanded) => {
    if (isExpanded) {
      // open
      let oldPath = window.location.pathname
      const { userHandle, postId } = this.props.post
      const newPath = `/users/${userHandle}/post/${postId}`

      window.history.pushState(null, null, newPath)
      if (oldPath === newPath) oldPath = `/users/${userHandle}`
      this.setState({
        expanded: isExpanded ? panel : false,
        oldPath,
      })
      this.props.getPost(this.props.post.postId)
    } else {
      // close
      window.history.pushState(null, null, this.state.oldPath)
      this.setState({
        expanded: isExpanded ? panel : false,
      })
      this.props.clearErrors()
    }
  }

  render() {
    dayjs.extend(relativeTime)
    const {
      classes,
      post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount },
      user: {
        authenticated,
        credentials: { handle },
      },
      index,
    } = this.props

    const { expanded } = this.state

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} onClick={event => event.stopPropagation()} onFocus={event => event.stopPropagation()} />
      ) : null
    return (
      <ExpansionPanel
        className={classes.expansionPanel}
        TransitionProps={{ unmountOnExit: true }}
        expanded={expanded === `panel-${index}`}
        onChange={this.handleChange(`panel-${index}`)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${index}-content`} id={`panel-${index}-header`}>
          <div className={classes.contentContainer}>
            <div className={classes.mainContent}>
              <div className={classes.imageWrapper}>
                <img className={classes.image} src={userImage} alt="Profile" title="Profile image" />
              </div>
              <div className={classes.textContent}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                  {userHandle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {body}
                </Typography>
              </div>
            </div>
            <span className={classes.visibleSeparator} />
            <div className={classes.controlsContent}>
              <div className="main-controls">
                <div>
                  <LikeButton postId={postId} />
                  <span className={classes.controlLabel}>{`${likeCount} Likes`}</span>
                </div>
                <div>
                  <CustomButton tip="Comments">
                    <ChatIcon color="primary" />
                  </CustomButton>
                  <span className={classes.controlLabel}>{`${commentCount} Comments`}</span>
                </div>
              </div>
              <div className="delete-control">{deleteButton}</div>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.dialogContent}>
          <PostDialog post={this.props.post} userHandle={userHandle} index={index} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, { getPost, clearErrors })(withStyles(styles)(Post))
