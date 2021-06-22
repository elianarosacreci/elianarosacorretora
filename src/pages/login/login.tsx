import styles from './login.module.scss'

import React from 'react'

export default function Login() {


    return (
        <div>
            <div className={styles.loginTitle}>
                <h1>LOGIN</h1>
            </div>

            <div className={styles.loginContainer}>
                <div className={styles.form}>
                    <form className={styles.loginForm}>
                        <input type="text" placeholder="e-mail" />
                        <input type="password" placeholder="senha" />
                        <button className={styles.login}>entrar</button>
                        <a href="/" className={styles.returnToBrowse}>voltar a navegar</a>
                    </form>
                </div>
            </div>
        </div >
    )
}

// ----------------------------------------------------------------------------------------------------