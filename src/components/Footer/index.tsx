import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './styles.module.scss';


export function Footer() {

    const currentYear = format(new Date(), 'yyyy', {
        locale: ptBR
    });

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.infos}>
                <span>Midias Sociais e Contatos</span>
            </div>
            <div className={styles.copyrigth}>
                <span>
                    <a href="https://github.com/gabrielfelipeio" target="_blank">Copyright © {currentYear} - Gabriel Felipe - Todos os direitos reservados.</a>
                </span>
            </div>
        </footer>
    );
}