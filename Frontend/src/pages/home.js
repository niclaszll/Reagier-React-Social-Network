import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import Post from '../components/post/Post'
import Profile from '../components/profile/Profile'
import PostSkeleton from '../util/PostSkeleton'

import { getPosts } from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.cssStyles,
})

export class home extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const {
      classes,
      data: { posts, loading },
    } = this.props
    const recentPostsMarkup =
      !loading && posts !== null ? posts.map((post, index) => <Post key={post.postId} post={post} index={index} />) : <PostSkeleton />
    return (
      <Grid container spacing={3} className={classes.mainContainer}>
        <Grid item className={classes.postContainer}>
          {recentPostsMarkup}
        </Grid>
        <Grid item className={classes.userProfileContainer}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(home))
