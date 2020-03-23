import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA, DELETE_POST, POST_POST, SET_POST, SUBMIT_COMMENT } from '../types'

const initialState = {
  posts: [],
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    case SET_POSTS:
      if (state.posts.length !== 0) {
        action.payload.forEach(post => {
          post.comments = []
          const currentPostIndex = state.posts.findIndex(p => p.postId === post.postId)
          post.comments = state.posts[currentPostIndex].comments
        })
      }
      return {
        ...state,
        posts: action.payload,
        loading: false,
      }
    case SET_POST: {
      // update posts
      const currentPostIndex = state.posts.findIndex(post => post.postId === action.payload.postId)
      state.posts[currentPostIndex] = action.payload
      return {
        ...state,
      }
    }
    case LIKE_POST:
    case UNLIKE_POST: {
      const index = state.posts.findIndex(post => post.postId === action.payload.postId)
      const temp = state.posts[index].comments
      state.posts[index] = action.payload
      state.posts[index].comments = temp

      return {
        ...state,
      }
    }
    case SUBMIT_COMMENT: {
      const currentPostIndex = state.posts.findIndex(post => post.postId === action.payload.postId)
      const updatedPost = {
        ...state.posts[currentPostIndex],
        commentCount: state.posts[currentPostIndex].commentCount + 1,
        comments: [action.payload, ...state.posts[currentPostIndex].comments],
      }
      state.posts[currentPostIndex] = updatedPost
      return {
        ...state,
      }
    }
    case DELETE_POST: {
      const index = state.posts.findIndex(post => post.postId === action.payload)
      state.posts.splice(index, 1)
      return {
        ...state,
      }
    }
    case POST_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    default:
      return state
  }
}
