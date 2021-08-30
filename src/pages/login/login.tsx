import styles from "./login.module.scss";

import React from "react";

import { FaGooglePlusSquare } from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function Login() {

    const router = useRouter();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom(e: React.FormEvent) {
        e.preventDefault();
        await signInWithGoogle();
        router.push("/researchAdmin/researchAdmin");
    }

    return (
        <div>
            <div className={styles.loginTitle}>
                <h1>LOGIN</h1>
            </div>

            <div className={styles.loginContainer}>
                <div className={styles.form}>
                    <form className={styles.loginForm}>
                        <button onClick={handleCreateRoom} className={styles.login}>
                            entrar com <FaGooglePlusSquare size={30} />
                        </button>
                        <a href="/" className={styles.returnToBrowse}>
                            voltar a navegar
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------------------------------------
