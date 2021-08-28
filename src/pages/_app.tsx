import '../styles/globals.scss'

import { Header } from '../components/Header';

import styles from '../styles/app.module.scss';
import { AuthContextProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <AuthContextProvider>
          <Header />
          <Component {...pageProps} />
        </AuthContextProvider>
      </main>
    </div>
  )
}

export default MyApp
