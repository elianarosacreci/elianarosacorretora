import styles from './immobile.module.scss';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { GetStaticProps } from 'next';
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

    return (
        <div>
            <Head>
                <title> Immobile | Eliana Rosa Corretora</title>
            </Head>

            <div className={styles.carousel}>
            </div>

            <div className={styles.immobileDetails}>
            </div>
        </div>
    )
}

// ----------------------------------------------------------------------------------------------------

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params

    const idSearch = slug.toString().substr(0, slug.indexOf("#slug#id#"))

    const { data } = await api.get(`/immobiles/${idSearch}`)

    const immobile = {
        id: data.id,
        title: data.title,
        code: data.code,
        images: data.images,
        footage: data.footage,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        suites: data.suites,
        vacancies: data.vacancies,
        features: data.features,
        descriptionTitle: data.descriptionTitle,
        description: data.description,
        address: data.address.fullAddress,
        price: data.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        nearbyTrainsAndSubways: data.nearbyTrainsAndSubways,
        status: data.status,
    };

    return {
        props: {
            immobile
        },
        revalidate: 60 * 60 * 24
    }
}