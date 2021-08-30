import { createContext, useState, useEffect, ReactNode, useRef } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

type User = {
  id: string;
  name: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  auth: firebase.auth.Auth;
  database: firebase.database.Database;
  firebase: typeof firebase;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const auth = useRef<firebase.auth.Auth>(null);
  const database = useRef<firebase.database.Database>(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyB2ZdSarj7pzn0Qq1BL4naSCESqqAOMbtM",
      authDomain: "site-eliana-corretora.firebaseapp.com",
      databaseURL: "https://site-eliana-corretora-default-rtdb.firebaseio.com",
      projectId: "site-eliana-corretora",
      storageBucket: "site-eliana-corretora.appspot.com",
      messagingSenderId: "703512763810",
      appId: "1:703512763810:web:d0e991288d95cb6ae766fb",
      measurementId: "G-M0KPP9HDBM",
    };

    console.log(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    if (auth.current) {
      const unsubscribe = auth.current.onAuthStateChanged((user) => {
        if (user) {
          if (user) {
            const { displayName, uid } = user;

            if (!displayName) {
              throw new Error("Missing information from Google Account.");
            }

            setUser({
              id: uid,
              name: displayName,
            });
          }
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.current = firebase.auth();
    database.current = firebase.database();

    const result = await firebase.auth().signInWithPopup(provider);

    if (result.user) {
      const { displayName, uid } = result.user;

      if (!displayName) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        database: database.current,
        auth: auth.current,
        firebase,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
