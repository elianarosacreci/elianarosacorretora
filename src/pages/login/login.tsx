import React, { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import styles from './login.module.scss'
import { Form, Row } from 'react-bootstrap'


export default function Login() {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        router.push('/researchAdmin/researchAdmin')
    }

    return (
        <div>
            <div className={styles.loginTitle}>
                <h1>LOGIN</h1>
            </div>

            <div className={styles.loginContainer}>
                <div className={styles.form}>
                    <form className={styles.loginForm}>
                        <Form>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Control value={email} type="text" placeholder="E-mail" onChange={event => setEmail(event.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control value={pass} type="password" placeholder="Senha" onChange={event => setPass(event.target.value)} />
                                </Form.Group>
                            </Row>
                        </Form>
                        <button className={styles.login} onClick={handleLogin}>entrar</button>
                        <a href='/' className={styles.returnToBrowse}>voltar a navegar</a>
                    </form>
                </div>
            </div>
        </div >
    )
}