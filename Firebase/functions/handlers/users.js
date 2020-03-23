const firebase = require('firebase')

const BusBoy = require('busboy')
const path = require('path')
const os = require('os')
const fs = require('fs')
const { admin, db } = require('../util/admin')

const config = require('../util/config')

firebase.initializeApp(config)

const { validateSignupData, validateLoginData, reduceUserDetails } = require('../util/validators')

// Sign user up
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  const { valid, errors } = validateSignupData(newUser)

  if (!valid) return res.status(400).json(errors)

  const noImg = 'no-img.png'

  let token
  let userId
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken' })
      }
      return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    })
    .then(data => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then(idToken => {
      token = idToken
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId,
      }
      return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => res.status(201).json({ token }))
    .catch(err => {
      console.error(err)
      return res.status(403).json({ general: 'Something went wrong, please try again' })
    })
}

// Log user in
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  const { valid, errors } = validateLoginData(user)
  if (!valid) return res.status(400).json(errors)

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => data.user.getIdToken())
    .then(token => res.json({ token }))
    .catch(err => {
      console.error(err)
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email') {
        return res.status(403).json({ general: 'Wrong credentials, please try again' })
      }
      return res.status(500).json({ error: err.code })
    })
}

// Add user details
exports.addUserDetails = (req, res) => {
  const userDetails = reduceUserDetails(req.body)

  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => res.json({ message: 'Details added successfully' }))
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// Get any user's details
exports.getUserDetails = (req, res) => {
  const userData = {}
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.user = doc.data()
        return db
          .collection('posts')
          .where('userHandle', '==', req.params.handle)
          .orderBy('createdAt', 'desc')
          .get()
      }
      return res.status(404).json({ error: 'User not found' })
    })
    .then(data => {
      userData.posts = []
      data.forEach(doc => {
        userData.posts.push({
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          userHandle: doc.data().userHandle,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          postId: doc.id,
        })
      })
      return res.json(userData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// Get own user details
exports.getAuthenticatedUser = (req, res) => {
  const userData = {}
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.credentials = doc.data()
        return db
          .collection('likes')
          .where('userHandle', '==', req.user.handle)
          .get()
      }
    })
    .then(data => {
      userData.likes = []
      data.forEach(doc => {
        userData.likes.push(doc.data())
      })
      return db
        .collection('notifications')
        .where('recipient', '==', req.user.handle)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get()
    })
    .then(data => {
      userData.notifications = []
      data.forEach(doc => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          postId: doc.data().postId,
          type: doc.data().type,
          read: doc.data().read,
          notificationId: doc.id,
        })
      })
      return res.json(userData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// Update profile image for user
exports.uploadImage = (req, res) => {
  const busboy = new BusBoy({ headers: req.headers })

  let imageFilename
  let imageToBeUploaded = {}

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' })
    }
    // my.image.png
    // get last after .
    const imageExtension = filename.split('.')[filename.split('.').length - 1]
    // 2349827349234234.png
    imageFilename = `${Math.round(Math.random() * 1000000000)}.${imageExtension}`
    const filepath = path.join(os.tmpdir(), imageFilename)
    imageToBeUploaded = { filepath, mimetype }
    file.pipe(fs.createWriteStream(filepath))
  })

  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFilename}?alt=media`
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl })
      })
      .then(() => res.json({ message: 'Image uploaded successfully' }))
      .catch(err => {
        console.error(err)
        return res.status(500).json({ error: err.code })
      })
  })

  busboy.end(req.rawBody)
}

exports.markNotificationsRead = (req, res) => {
  const batch = db.batch()
  req.body.forEach(notificationId => {
    const notification = db.doc(`/notifications/${notificationId}`)
    batch.update(notification, { read: true })
  })
  batch
    .commit()
    .then(() => res.json({ message: 'Notifications marked read' }))
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}
