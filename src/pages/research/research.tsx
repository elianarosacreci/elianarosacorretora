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

                    <div className={styles.research}>
                        <button className={styles.researchButton} type="button">Buscar</button>
                    </div>

                    <div className={styles.address}>
                        <div className={styles.addressLocation}>
                            <label>Localização do Imóvel</label>
                            <input
                                type="text"
                                placeholder="Digite"
                            />
                        </div>
                    </div>

                    <div className={styles.price}>
                        <div className={styles.priceMin}>
                            <label>Preço Mínimo</label>
                            <input
                                type="text"
                                placeholder="R$"
                            />
                        </div>
                        <div className={styles.priceMax}>
                            <label>Preço Máximo</label>
                            <input
                                type="text"
                                placeholder="R$"
                            />
                        </div>
                    </div>

                    <div className={styles.footage}>
                        <div className={styles.footageMin}>
                            <label>Área Mínima</label>
                            <input
                                type="text"
                                placeholder="m²"
                            />
                        </div>
                        <div className={styles.footageMax}>
                            <label>Área Máxima</label>
                            <input
                                type="text"
                                placeholder="m²"
                            />
                        </div>
                    </div>

                    <div className={styles.bedrooms}>
                        <div className={styles.bedroomsNumbers}>
                            <label>Número de Quartos</label>
                            <div className={styles.buttons}>
                                <button>1+</button>
                                <button>2+</button>
                                <button>3+</button>
                                <button>4+</button>
                                <button>5+</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bathrooms}>
                        <div className={styles.bathroomsNumbers}>
                            <label>Número de Banheiros</label>
                            <div className={styles.buttons}>
                                <button>1+</button>
                                <button>2+</button>
                                <button>3+</button>
                                <button>4+</button>
                                <button>5+</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.vacancies}>
                        <div className={styles.vacanciesNumbers}>
                            <label>Número de Vagas de Garagem</label>
                            <div className={styles.buttons}>
                                <button>1+</button>
                                <button>2+</button>
                                <button>3+</button>
                                <button>4+</button>
                                <button>5+</button>
                            </div>
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