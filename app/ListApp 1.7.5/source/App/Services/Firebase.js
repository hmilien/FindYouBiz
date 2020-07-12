/** @format */

import * as firebase from 'firebase'

import Config from '@common/Config'

const firebaseApp = firebase.initializeApp(Config.Local.general.Firebase)
firebaseApp.getCurrentUser = function() {
  return firebaseApp.auth().currentUser
}

// firebaseApp.observeAuth = () =>
//   firebase.auth().onAuthStateChanged(firebaseApp.onAuthStateChanged)

// firebaseApp.onAuthStateChanged = (user) => {
//   if (!user) {
//     try {
//       firebase.auth().signInAnonymously()
//     } catch ({ message }) {
//       console.log(message)
//     }
//   }
// }

// firebaseApp.uid = () => {
//   return (firebaseApp.auth().currentUser || {}).uid
// }

firebaseApp.ref = () => {
  return firebaseApp.database().ref()
}

// firebaseApp.parse = (snapshot) => {
//   const { timestamp: numberStamp, text, user } = snapshot.val()
//   const { key: _id } = snapshot
//   const timestamp = new Date(numberStamp)
//   const message = {
//     _id,
//     timestamp,
//     text,
//     user,
//   }
//   return message
// }

firebaseApp.on = (callback) => {
  return firebaseApp
    .ref()
    .child('chat')
    .limitToLast(1)
    .on('child_added', (snapshot) => {
      // console.log('snapshot', snapshot)
      callback(snapshot)
    })
}


// send the message to the Backend
// firebaseApp.send = (messages) => {
//   for (let i = 0; i < messages.length; i++) {
//     // console.log(messages)
//     const { text, user } = messages[i]
//     const message = {
//       text,
//       user,
//       timestamp: Date.now(),
//     }
//     const author = messages[i].user.author
//     firebaseApp.append(author + '-' + user.guest, message)
//   }
// }

// firebaseApp.append = (author, guest, message) => {
//   try {
//     firebaseApp
//       .ref()
//       .child(author + '-' + guest)
//       .push(message)
//   } catch (err) {
//     console.log('err', err)
//   }
// }

firebaseApp.fetch = (author, callback) => {
  return firebaseApp
    .ref()
    .child('users')
    .child(author)
    .once(
      'value',
      (snapshot) => callback(snapshot.val()),
      (errObj) => {}
    )
}

// close the connection to the Backend
firebaseApp.off = () => firebaseApp.ref().off()
export default firebaseApp
