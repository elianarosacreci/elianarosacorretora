import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './immobile.module.scss';

export default function Immobile() {

    return (
        <div>
            <Head>
                <title> Immobile | Eliana Rosa Corretora</title>
            </Head>

            {/* <div className={styles.carousel}>
            </div> */}

            <div className={styles.immobile}>
                <div className={styles.carouselImages}>

                </div>

                <header>
                </header>
            </div>
        </div>
    )
}