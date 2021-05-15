import Link from 'next/link';
import styles from './styles.module.scss';


export function Header() {

    return (
        <header className={styles.headerContainer}>
            <Link href="/">
            </Link>
        </header>
    );
}