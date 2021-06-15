import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import styles from './styles.module.scss';

import { FaInstagramSquare, FaFacebookSquare } from 'react-icons/fa'


export function Header() {

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    });

    return (
        <header className={styles.headerContainer}>
            <Link href="/">
                <a><h1>Eliana Rosa</h1></a>
            </Link>

            <h4>Corretora de imóveis</h4>

            <div className={styles.socialMedia}>
                <a href="https://www.facebook.com/anaellynegociosimobiliario" target="_blank"><FaFacebookSquare size={35} /></a>
                <a href="https://www.instagram.com/anaely_corretora/" target="_blank"><FaInstagramSquare size={35} /></a>
            </div>

            <span>
                <Link href="/login/login">
                    <a>{currentDate}</a>
                </Link>
            </span>
        </header>
    );
}