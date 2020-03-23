import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import Post from '../components/post/Post'
import Profile from '../components/profile/Profile'
import PostSkeleton from '../util/PostSkeleton'

import { getPosts } from '../redux/actions/dataActions'

export class home extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts, loading } = this.props.data
    const recentPostsMarkup =
      !loading && posts !== null ? posts.map((post, index) => <Post key={post.postId} post={post} index={index} />) : <PostSkeleton />
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getPosts })(home)
