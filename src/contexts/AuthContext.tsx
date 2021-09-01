import { createContext, useState, useEffect, ReactNode, useRef } from "react"

import firebase from "firebase"
import "firebase/auth"
// import "firebase/database"

type User = {
  id: string
  name: string
  mail: string
}

type AuthContextType = {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
  auth: firebase.auth.Auth
  // database: firebase.database.Database
  firebase: typeof firebase
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>()
  const auth = useRef<firebase.auth.Auth>(null)
  // const database = useRef<firebase.database.Database>(null)

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyB2ZdSarj7pzn0Qq1BL4naSCESqqAOMbtM",
      authDomain: "site-eliana-corretora.firebaseapp.com",
      databaseURL: "https://site-eliana-corretora-default-rtdb.firebaseio.com",
      projectId: "site-eliana-corretora",
      appId: "1:703512763810:web:d0e991288d95cb6ae766fb",
    }
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig)
    } else {
      firebase.app()
    }
  }, [])

  useEffect(() => {
    if (auth.current) {
      const unsubscribe = auth.current.onAuthStateChanged((user) => {
        if (user) {
          const { displayName, email, uid } = user
          // if (email == 'elianarosa.creci@gmail.com') {
          setUser({
            id: uid,
            name: displayName,
            mail: email,
          })
          // } else {
          //   setUser({
          //     id: '',
          //     name: '',
          //     mail: '',
          //   })
          // }
        }
      })
      return () => {
        unsubscribe()
      }
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.current = firebase.auth()
    // database.current = firebase.database()
    const result = await firebase.auth().signInWithPopup(provider)

    if (result.user) {
      const { displayName, email, uid } = result.user

      // if (email == 'elianarosa.creci@gmail.com') {
      setUser({
        id: uid,
        name: displayName,
        mail: email,
      });
      // } else {
      //   setUser({
      //     id: '',
      //     name: '',
      //     mail: '',
      //   });
      // }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        // database: database.current,
        auth: auth.current,
        firebase,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
