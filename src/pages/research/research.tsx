import styles from './research.module.scss';
import React from 'react';
import Head from 'next/head';

import { Footer } from '../../components/Footer'


export default function Research() {


    return (
        <div>
            <Head>
                <title></title>
            </Head>

            <div className={styles.immobileDetails}>

                <div className={styles.researchContent}>
                    <div className={styles.price}>
                        <div className={styles.priceMin}>
                            <p>Preço Mínimo</p>
                            <input
                                type="text"
                                placeholder="R$"
                            />
                        </div>
                        <div className={styles.priceMax}>
                            <p>Preço Máximo</p>
                            <input
                                type="text"
                                placeholder="R$"
                            />
                        </div>
                    </div>

                </div>

                <div className={styles.immobilesContent}>

                    <div className={styles.title}>
                        <h1>title</h1>
                        <span className={styles.immobileCode}>immobileCode</span>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.title}>
                            <h3>Itens & Características</h3>
                        </div>
                        <div className={styles.itens}>
                        </div>
                    </div>

                    <h4 className={styles.descriptionTitle}>descriptionTitle</h4>
                    <p className={styles.description}>description</p>

                    <div className={styles.nearbyTrainsAndSubways}>
                        <div className={styles.title}>
                            <h3>Trens e Metrôs na Vizinhança</h3>
                        </div>
                        <div className={styles.itens}>
                        </div>
                    </div>
                </div>


            </div>

            <Footer />
        </div>
    )
}

// ----------------------------------------------------------------------------------------------------