import styles from './immobile.module.scss';
import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { BiArea } from 'react-icons/bi'
import { IoIosBed } from 'react-icons/io'
import { FaCar } from 'react-icons/fa'
import { BiBath } from 'react-icons/bi'
import { IoSubway } from 'react-icons/io5'
import { RiArrowRightSFill } from 'react-icons/ri'
import { GoChecklist } from 'react-icons/go'
import { GrStatusDisabled, GrStatusInfo, GrStatusGood } from 'react-icons/gr'
import { MdContentCopy } from 'react-icons/md'
import { SiGooglemaps } from 'react-icons/si'

import { api } from '../../services/api';
import { Carousel } from 'react-bootstrap'
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
    status: string,
    imageCard: string,
    slug: string
}

type NearbyTrainsAndSubways = {
    name: string,
    distance: string
}

type ImmobileProps = {
    immobile: Immobile
    attractivePricesList: Immobile[]
}


export default function Immobile({ immobile, attractivePricesList }: ImmobileProps) {

    const MAX_DESCRIPTION_TITLE_LENGTH = 30;

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
                <Carousel prevLabel="" nextLabel="">
                    {immobile.images.map((image) => {
                        return (
                            <Carousel.Item style={{ height: "400px" }}>
                                <img
                                    style={{ height: "400px", objectFit: "cover" }}
                                    className="d-block w-100"
                                    src={image}
                                />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>

            <div className={styles.immobileDetails}>

                <div className={styles.infoContent}>

                    <div className={styles.title}>
                        <h1>{immobile.title}</h1>
                        <span className={styles.immobileCode}>{immobile.code.toUpperCase()}</span>
                    </div>

                    <p className={styles.immobileAddress}>{immobile.address}</p>
                    <a href={`https://www.google.com.br/maps/place/${immobile.address.replace(/\s/g, '+')}`} target="_blank">
                        <span className={styles.goToMap}>VER NO MAPA <SiGooglemaps size={25} /></span>
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
                        <div className={styles.buttons}>
                            <a href={`https://www.google.com.br/maps/place/${immobile.address.replace(/\s/g, '+')}`} target="_blank">
                                <span className={styles.goToMap}>Ver no Mapa <SiGooglemaps size={25} /></span>
                            </a>
                        </div>
                        <div className={styles.buttons}>
                            <span className={styles.goToWhatsApp} onClick={() => { navigator.clipboard.writeText("(11) 97990-2343") }}>Copiar Telefone <MdContentCopy size={25} /></span>
                        </div>
                        <div className={styles.buttons}>
                            <span className={styles.goToEmail} onClick={() => { navigator.clipboard.writeText("e-mail pendente") }}>Copiar Email <MdContentCopy size={25} /></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.immobileList}>
                <h1>Você Vai Gostar Também</h1>
                <div>
                    <ul>
                        {attractivePricesList.map((attractivePrices) => {
                            return (
                                <li key={attractivePrices.id}>
                                    <a href={`/immobiles/${attractivePrices.slug}#slug#id#${attractivePrices.id}`} target="_blank">
                                        <div className={styles.immobileCards}>
                                            <Image
                                                width={500}
                                                height={500}
                                                src={attractivePrices.imageCard}
                                                objectFit="cover"
                                            />
                                            <div className={styles.container}>
                                                <h2>{attractivePrices.price}</h2>
                                                <p><b>{attractivePrices.footage}</b>m² <b>{attractivePrices.bedrooms}</b> Quartos <b>{attractivePrices.bathrooms}</b> Banheiros <b>{attractivePrices.vacancies}</b> Vaga</p>
                                                {attractivePrices.descriptionTitle.length > MAX_DESCRIPTION_TITLE_LENGTH ?
                                                    <p>{`${attractivePrices.descriptionTitle.substring(0, MAX_DESCRIPTION_TITLE_LENGTH)}...`}</p> :
                                                    <p>{attractivePrices.descriptionTitle}</p>}
                                                <span>VER OS DETALHES →</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
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
    }

    const dataAttractivePrices = await api.get('immobiles', {
        params: {
            _limit: 3,
            _sort: 'price',
            _order: 'asc'
        }
    })
    const attractivePricesList = dataAttractivePrices.data.map(attractivePrice => {
        return {
            id: attractivePrice.id,
            slug: attractivePrice.slug,
            price: attractivePrice.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            footage: attractivePrice.footage,
            bedrooms: attractivePrice.bedrooms,
            bathrooms: attractivePrice.bathrooms,
            vacancies: attractivePrice.vacancies,
            descriptionTitle: attractivePrice.descriptionTitle,
            imageCard: attractivePrice.images[0],
        }
    })

    return {
        props: {
            immobile,
            attractivePricesList
        },
        revalidate: 60 * 60 * 24
    }
}