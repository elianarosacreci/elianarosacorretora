import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import styles from './styles.module.scss';


export function Header() {

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    });

    return (
        <header className={styles.headerContainer}>
            <Link href="/">
                <a><h1>Eliana Rosa Corretora</h1></a>
            </Link>

            {/* <h3>Encontre o seu próximo imóvel!</h3> */}

            <span>
                <Link href="/">
                    <a>{currentDate}</a>
                </Link>
            </span>
        </header>
    );
}