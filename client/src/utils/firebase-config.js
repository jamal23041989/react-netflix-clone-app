import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCAbjsokb-tlcJ8f1PDxf5yZu15keox29I',
  authDomain: 'react-netflix-clone-app-25275.firebaseapp.com',
  projectId: 'react-netflix-clone-app-25275',
  storageBucket: 'react-netflix-clone-app-25275.appspot.com',
  messagingSenderId: '476772066358',
  appId: '1:476772066358:web:6acf80543caa70d7512497',
  measurementId: 'G-8Q2NDJWXKX',
}

const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)
