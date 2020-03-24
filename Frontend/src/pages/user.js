import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Post from '../components/post/Post'
import StaticProfile from '../components/profile/StaticProfile'
import PostSkeleton from '../util/PostSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

// Redux
import { getUserData } from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.cssStyles,
})

class user extends Component {
  state = {
    profile: null,
    postIdParam: null,
  }

  componentDidMount() {
    // TODO: change getUserData to fetch all information instead of making 2 calls
    const { handle, postId } = this.props.match.params

    if (postId) {
      this.setState({
        postIdParam: postId,
      })
    }

    this.props.getUserData(handle)

    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user,
        })
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps) {
    if (this.props.match !== prevProps.match) {
      const { postId } = this.props.match.params
      if (postId) this.setState({ postIdParam: postId })
    }
  }

  render() {
    const {
      classes,
      data: { posts, loading },
    } = this.props
    const { postIdParam } = this.state

    let postsMarkup

    if (loading) {
      postsMarkup = <PostSkeleton />
    } else if (posts === null) {
      postsMarkup = <p>No posts from this user</p>
    } else if (!postIdParam) {
      postsMarkup = posts.map((post, index) => <Post key={post.postId} post={post} index={index} />)
    } else {
      postsMarkup = posts.map((post, index) => {
        if (post.postId !== postIdParam) {
          return <Post key={post.postId} post={post} index={index} />
        }
        return <Post key={post.postId} post={post} index={index} />
      })
    }

    return (
      <Grid container spacing={3}>
        <Grid item className={classes.postContainer}>
          {postsMarkup}
        </Grid>
        <Grid item className={classes.userProfileContainer}>
          {this.state.profile === null ? <ProfileSkeleton /> : <StaticProfile profile={this.state.profile} />}
        </Grid>
      </Grid>
    )
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getUserData })(withStyles(styles)(user))
