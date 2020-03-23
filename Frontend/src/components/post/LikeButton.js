import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

// Redux
import { connect } from 'react-redux'
import CustomButton from '../../util/CustomButton'
import { likePost, unlikePost } from '../../redux/actions/dataActions'

const styles = theme => ({
  ...theme.cssStyles,
  likeButton: {
    color: '#EC357F',
  },
})

export class LikeButton extends Component {
  isPostLiked = () => {
    if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId)) {
      return true
    }
    return false
  }

  likePost = event => {
    this.props.likePost(this.props.postId)
    // stopPropagation, otherwise expansion panel opens on like
    event.stopPropagation()
  }

  unlikePost = event => {
    this.props.unlikePost(this.props.postId)
    event.stopPropagation()
  }

  render() {
    const {
      user: { authenticated },
      classes,
    } = this.props
    let likeButton

    if (!authenticated) {
      likeButton = (
        <Link to="/login">
          <CustomButton tip="Like" onClick={event => event.stopPropagation()} onFocus={event => event.stopPropagation()}>
            <FavoriteBorderIcon color="primary.light" />
          </CustomButton>
        </Link>
      )
    } else if (this.isPostLiked()) {
      likeButton = (
        <CustomButton tip="Unlike" onClick={this.unlikePost} onFocus={event => event.stopPropagation()}>
          <FavoriteIcon className={classes.likeButton} />
        </CustomButton>
      )
    } else {
      likeButton = (
        <CustomButton tip="Like" onClick={this.likePost} onFocus={event => event.stopPropagation()}>
          <FavoriteBorderIcon className={classes.likeButton} />
        </CustomButton>
      )
    }
    return likeButton
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapActionsToProps = {
  likePost,
  unlikePost,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton))
