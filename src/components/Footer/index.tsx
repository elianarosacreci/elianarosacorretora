import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './styles.module.scss';

import { FaInstagramSquare, FaFacebookSquare } from 'react-icons/fa'


export function Footer() {

    const currentYear = format(new Date(), 'yyyy', {
        locale: ptBR
    });

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.infos}>
                <div className={styles.contacts}>
                    <h1>Eliana Rosa</h1>
                    <h4>Corretora de imóveis - CRECI 212053F</h4>
                </div>
                <div>
                    <h1>Encontre o seu próximo imóvel!</h1>
                </div>
                <div className={styles.socialMedia}>
                    <a href="https://www.facebook.com/anaellynegociosimobiliario" target="_blank"><FaFacebookSquare size={45} /></a>
                    <a href="https://www.instagram.com/anaely_corretora/" target="_blank"><FaInstagramSquare size={45} /></a>
                </div>
            </div>
            <div className={styles.copyrigth}>
                <span>
                    <a href="https://github.com/gabrielfelipeio" target="_blank">Copyright © {currentYear} - Gabriel Felipe - Todos os direitos reservados.</a>
                </span>
            </div>
        </footer>
    );
}