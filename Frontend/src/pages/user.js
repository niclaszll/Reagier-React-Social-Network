import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import Post from '../components/post/Post'
import StaticProfile from '../components/profile/StaticProfile'
import PostSkeleton from '../util/PostSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

// Redux
import { getUserData } from '../redux/actions/dataActions'

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
    const { posts, loading } = this.props.data
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
        <Grid item sm={8} xs={12}>
          {postsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
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
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getUserData })(user)
