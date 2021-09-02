import React from 'react'
import Link from 'next/link'

import styles from './login.module.scss'


export default function Login() {

    return (
        <div>
            <div className={styles.loginTitle}>
                <h1>LOGIN</h1>
            </div>

            <div className={styles.loginContainer}>
                <div className={styles.form}>
                    <form className={styles.loginForm}>
                        <Link href="/researchAdmin/researchAdmin">
                            <button className={styles.login}>entrar</button>
                        </Link>
                        <a href="/" className={styles.returnToBrowse}>voltar a navegar</a>
                    </form>
                </div>
            </div>
        </div >
    )
}