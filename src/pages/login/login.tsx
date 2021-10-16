import React, { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import styles from './login.module.scss'
import { Form, Row } from 'react-bootstrap'

import firebaseController from '../../services/firebaseController'


export default function Login() {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        let logged = await firebaseController.login(email, pass)
        if (logged) {
            router.push(`/researchAdmin/administratorManagement`)
        } else {
            alert('E-mail e Senha incorretos!')
        }
    }

    return (
        <div>
            <div className={styles.loginTitle}>
                <h1>LOGIN</h1>
            </div>
            <div className={styles.loginContainer}>
                <div className={styles.form}>
                    <div className={styles.loginForm}>
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
                    </div>
                </div>
            </div>
        </div >
    )
}