import styles from './immobile.module.scss';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from '../../services/api';

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
    address: Address,
    price: string,
    nearbyTrainsAndSubways: NearbyTrainsAndSubways[],
    status: string
}

type Address = {
    street: string,
    number: string,
    district: string,
    city: string,
    state: string,
    fullAddress: string,
    lat: string,
    long: string
}

type NearbyTrainsAndSubways = {
    name: string,
    distance: string
}

type ImmobileProps = {
    immobile: Immobile
}


export default function Immobile({ immobile }: ImmobileProps) {

    return (
        <div>
            <Head>
                <title>{immobile.title}</title>
            </Head>

            <div className={styles.carousel}>
            </div>

            <div className={styles.immobileDetails}>

                <div className={styles.infoContent}>
                    <h1>{immobile.title}</h1>

                    <span className={styles.immobileCode}>{immobile.code}</span>

                    <span className={styles.immobileAddress}>{immobile.address}</span>

                    <div className={styles.immobileOptions}>
                        <span className={styles.immobileFootage}>{immobile.footage}</span>
                        <span className={styles.immobileBedrooms}>{immobile.bedrooms}</span>
                        <span className={styles.immobileBathrooms}>{immobile.bathrooms}</span>
                        <span className={styles.immobileVacancies}>{immobile.vacancies}</span>
                    </div>

                    <div className={styles.features}>
                        {immobile.features}
                    </div>

                    <p className={styles.descriptionTitle}>{immobile.descriptionTitle}</p>
                    <p className={styles.description}>{immobile.description}</p>

                    <div className={styles.nearbyTrainsAndSubways}>
                        <h3>Trens e Metrôs na Vizinhança</h3>
                        {/* {immobile.nearbyTrainsAndSubways} */}
                    </div>
                </div>

                <div className={styles.priceContent}>
                    <div className={styles.price}>
                        <span>{immobile.price}</span>
                    </div>

                    <div className={styles.status}>
                        <span>{immobile.status}</span>
                    </div>

                    <div className={styles.managerContacts}>
                        <span>Contatos Eliana</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ----------------------------------------------------------------------------------------------------

export const getStaticPaths: GetStaticPaths = async () => {

    const { data } = await api.get('immobiles', {
        params: {
            _limit: 3,
            _sort: 'price',
            _order: 'asc'
        }
    })

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