import styles from './immobile.module.scss';
import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

import { BiArea } from 'react-icons/bi'
import { IoIosBed } from 'react-icons/io'
import { FaCar } from 'react-icons/fa'
import { BiBath } from 'react-icons/bi'
import { IoSubway } from 'react-icons/io5'
import { RiArrowRightSFill } from 'react-icons/ri'
import { GoChecklist } from 'react-icons/go'
import { GrStatusDisabled, GrStatusInfo, GrStatusGood } from 'react-icons/gr'

import { api } from '../../services/api';
import { Footer } from '../../components/Footer'


type Immobile = {
    id: string,
    title: string,
    code: string,
    images: Array<string>,
    footage: string,
    bedrooms: string,
    bathrooms: string,
    suites: string,
    vacancies: string,
    features: Array<string>,
    descriptionTitle: string,
    description: string,
    address: string,
    price: string,
    nearbyTrainsAndSubways: NearbyTrainsAndSubways[],
    status: string
}

type NearbyTrainsAndSubways = {
    name: string,
    distance: string
}

type ImmobileProps = {
    immobile: Immobile
}


export default function Immobile({ immobile }: ImmobileProps) {

    function getImmobileStatus() {
        if (immobile.status == 'Pronto pra Morar') {
            return (<>
                <GrStatusGood size={25} />
                <p>{immobile.status}</p>
            </>)
        } else if (immobile.status == 'Em Construção') {
            return (<>
                <GrStatusInfo size={25} />
                <p>{immobile.status}</p>
            </>)
        } else if (immobile.status == 'Na Planta') {
            return (<>
                <GrStatusDisabled size={25} />
                <p>{immobile.status}</p>
            </>)
        }
    }


    return (
        <div>
            <Head>
                <title>{immobile.title}</title>
            </Head>

            <div className={styles.carousel}>
            </div>

            <div className={styles.immobileDetails}>

                <div className={styles.infoContent}>

                    <div className={styles.title}>
                        <h1>{immobile.title}</h1>
                        <span className={styles.immobileCode}>{immobile.code.toUpperCase()}</span>
                    </div>

                    <p className={styles.immobileAddress}>{immobile.address}</p>
                    <a href={`https://www.google.com.br/maps/place/${immobile.address.replace(/\s/g, '+')}`} target="_blank">
                        <span className={styles.goToMap}>VER NO MAPA</span>
                    </a>

                    <div className={styles.immobileOptions}>
                        <ul>
                            <li>
                                <span><BiArea size={30} /></span>
                                <span> {immobile.footage}m²</span>
                            </li>
                            <li>
                                <span><IoIosBed size={30} /></span>
                                <span> {immobile.bedrooms} {parseInt(immobile.bedrooms) > 1 ? "quartos" : "quarto"}</span>
                            </li>
                            <li>
                                <span><BiBath size={30} /></span>
                                <span> {immobile.bathrooms} {parseInt(immobile.bathrooms) > 1 ? "banheiros" : "banheiro"}</span>
                            </li>
                            <li>
                                <span><FaCar size={30} /></span>
                                <span> {immobile.vacancies} {parseInt(immobile.vacancies) > 1 ? "vagas" : "vaga"}</span>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.title}>
                            <GoChecklist size={35} />
                            <h3>Itens & Características</h3>
                        </div>
                        <div className={styles.itens}>
                            <ul>
                                {immobile.features.map(item => {
                                    return (
                                        <li key={item}><span><RiArrowRightSFill />{item}</span></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <h4 className={styles.descriptionTitle}>{immobile.descriptionTitle}</h4>
                    <p className={styles.description}>{immobile.description}</p>

                    <div className={styles.nearbyTrainsAndSubways}>
                        <div className={styles.title}>
                            <IoSubway size={35} />
                            <h3>Trens e Metrôs na Vizinhança</h3>
                        </div>
                        <div className={styles.itens}>
                            <ul>
                                {immobile.nearbyTrainsAndSubways.map(item => {
                                    return (
                                        <li key={item.name}><span><RiArrowRightSFill />{`${item.name} - ${item.distance}`}</span></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.priceContent}>
                    <div className={styles.price}>
                        <h2>____</h2>
                        <h1>{immobile.price}</h1>
                    </div>

                    <div className={styles.status}>
                        {getImmobileStatus()}
                    </div>

                    <div className={styles.managerContacts}>
                        <span>Contatos Eliana</span>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

// ----------------------------------------------------------------------------------------------------

export const getStaticPaths: GetStaticPaths = async () => {

    const { data } = await api.get('immobiles')

    const paths = data.map(immobiles => {
        return { params: { slug: immobiles.id } }
    });

    return {
        paths,
        fallback: 'blocking'
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params

    const { data } = await api.get('immobiles', {
        params: {
            _limit: 1,
            slug: slug
        }
    })

    const immobile = {
        id: data[0].id,
        title: data[0].title,
        code: data[0].code,
        images: data[0].images,
        footage: data[0].footage,
        bedrooms: data[0].bedrooms,
        bathrooms: data[0].bathrooms,
        suites: data[0].suites,
        vacancies: data[0].vacancies,
        features: data[0].features,
        descriptionTitle: data[0].descriptionTitle,
        description: data[0].description,
        address: data[0].address.fullAddress,
        price: data[0].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        nearbyTrainsAndSubways: data[0].nearbyTrainsAndSubways,
        status: data[0].status,
    };

    return {
        props: {
            immobile
        },
        revalidate: 60 * 60 * 24
    }
}