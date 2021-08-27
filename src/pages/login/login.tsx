import styles from './login.module.scss'

import React, { useState } from 'react'

import { FaGooglePlusSquare } from 'react-icons/fa'

import Link from 'next/link'
import { useHistory } from 'react-router-dom';
import { auth, firebase } from '../../services/firebase';


export default function Login() {

    const history = useHistory()
    const [user, setUser] = useState({})

    async function handleCreateRoom() {

        try {
            const provider = new firebase.auth.GoogleAuthProvider()

            const result = await auth.signInWithPopup(provider)

            if (result.user) {
                console.log('USER: ', result.user);
                const { displayName, uid } = result.user

                if (!displayName) {
                    console.log('Missing information from Google Account.')
                    return
                }

                setUser({
                    id: uid,
                    name: displayName
                })
            }

            history.push('/researchAdmin/researchAdmin')
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <div className={styles.loginTitle}>
                <h1>LOGIN</h1>
            </div>

            <div className={styles.loginContainer}>
                <div className={styles.form}>
                    <form className={styles.loginForm}>
                        {/* <Link href="/researchAdmin/researchAdmin"> */}
                        <button onClick={handleCreateRoom} className={styles.login}>entrar com <FaGooglePlusSquare size={30} /></button>
                        {/* </Link> */}
                        <a href="/" className={styles.returnToBrowse}>voltar a navegar</a>
                    </form>
                </div>
            </div>
        </div >
    )
}

// ----------------------------------------------------------------------------------------------------