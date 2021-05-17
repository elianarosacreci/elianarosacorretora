import styles from './styles.module.scss';


export function Footer() {

    return (
        <footer className={styles.footerContainer}>
            <section className={styles.infos}>
                <span>Social Media, About and Contacts</span>
            </section>
            <section className={styles.copyrigth}>
                <span>
                    2021 ©Copyright: <a href="https://github.com/gabrielfelipeio" target="_blank"> Gabriel Felipe</a>
                </span>
            </section>
        </footer>
    );
}