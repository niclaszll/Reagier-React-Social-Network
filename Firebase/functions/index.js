const functions = require('firebase-functions')
const app = require('express')()

const cors = require('cors')({ origin: true })
const FBAuth = require('./util/fbAuth')

app.use(cors)

const { db } = require('./util/admin')

const { getAllPosts, postOnePost, getPost, deletePost, commentOnPost, likePost, unlikePost } = require('./handlers/posts')
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require('./handlers/users')

// Post routes
app.get('/posts', getAllPosts)
app.post('/post', FBAuth, postOnePost)
app.get('/post/:postId', getPost)
app.delete('/post/:postId', FBAuth, deletePost)
app.post('/post/:postId/comment', FBAuth, commentOnPost)
app.get('/post/:postId/like', FBAuth, likePost)
app.get('/post/:postId/unlike', FBAuth, unlikePost)

// Users routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)
app.get('/user/:handle', getUserDetails)
app.post('/notifications', FBAuth, markNotificationsRead)

exports.api = functions.region('europe-west1').https.onRequest(app)

exports.createNotificationOnLike = functions
  .region('europe-west1')
  .firestore.document('likes/{id}')
  .onCreate(snapshot =>
    db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            postId: doc.id,
            notificationId: snapshot.id,
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  )

exports.deleteNotificationOnUnlike = functions
  .region('europe-west1')
  .firestore.document('likes/{id}')
  .onDelete(snapshot =>
    db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err)
      })
  )

exports.createNotificationOnComment = functions
  .region('europe-west1')
  .firestore.document('comments/{id}')
  .onCreate(snapshot =>
    db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            postId: doc.id,
            notificationId: snapshot.id,
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  )

exports.onUserImageChange = functions
  .region('europe-west1')
  .firestore.document('users/{userId}')
  .onUpdate(change => {
    console.log(change.before.data())
    console.log(change.after.data())
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log('image has changed')
      const batch = db.batch()
      return db
        .collection('posts')
        .where('userHandle', '==', change.before.data().handle)
        .get()
        .then(data => {
          data.forEach(doc => {
            const post = db.doc(`/posts/${doc.id}`)
            batch.update(post, { userImage: change.after.data().imageUrl })
          })
          return batch.commit()
        })
    }
    return true
  })

exports.onPostDelete = functions
  .region('europe-west1')
  .firestore.document('posts/{postId}')
  .onDelete((snapshot, context) => {
    const postId = context.params.postId
    const batch = db.batch()
    return db
      .collection('comments')
      .where('postId', '==', postId)
      .get()
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/comments/${doc.id}`))
        })
        return db
          .collection('likes')
          .where('postId', '==', postId)
          .get()
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/likes/${doc.id}`))
        })
        return db
          .collection('notifications')
          .where('postId', '==', postId)
          .get()
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/notifications/${doc.id}`))
        })
        return batch.commit()
      })
      .catch(err => {
        console.error(err)
      })
  })
