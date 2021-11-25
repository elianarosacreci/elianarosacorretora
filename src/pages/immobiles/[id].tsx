import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import styles from './immobile.module.scss'
import { Carousel } from 'react-bootstrap'
import Image from 'next/image'
import { Footer } from '../../components/Footer'

import { BiArea } from 'react-icons/bi'
import { GiResize } from 'react-icons/gi'
import { IoIosBed } from 'react-icons/io'
import { FaCar, FaToilet } from 'react-icons/fa'
import { BiBath } from 'react-icons/bi'
import { IoSubway } from 'react-icons/io5'
import { RiArrowRightSFill } from 'react-icons/ri'
import { GoChecklist } from 'react-icons/go'
import { GrStatusDisabled, GrStatusInfo, GrStatusGood, GrMultiple } from 'react-icons/gr'
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri'
import { MdContentCopy } from 'react-icons/md'
import { ImWhatsapp } from 'react-icons/im'
import { SiGooglemaps } from 'react-icons/si'

import firebaseController from '../../services/firebaseController'


type Immobile = {
    id: string
    title: string
    code: string
    images: Array<string>
    footage: string
    footageUseful: string
    bedrooms: string
    bathrooms: string
    vacancies: string
    suites: string
    features: Array<string>
    descriptionTitle: string
    description: string
    address: string
    price: string
    nearbyTrainsAndSubways: NearbyTrainsAndSubways[]
    status: string
    kind: string
    imageCard: string
    slug: string
}

type NearbyTrainsAndSubways = {
    name: string
    distance: string
}

type ImmobileProps = {
    immobile: Immobile
    attractivePricesList: Immobile[]
}


export default function Immobile({ immobile, attractivePricesList }: ImmobileProps) {

    const MAX_DESCRIPTION_TITLE_LENGTH = 30

    function getImmobileStatus() {
        if (immobile.status == 'Pronto pra Morar') {
            return (<>
                <GrStatusGood size={25} className={styles.icon} />
                <p>{immobile.status}</p>
            </>)
        } else if (immobile.status == 'Em Construção') {
            return (<>
                <GrStatusInfo size={25} className={styles.icon} />
                <p>{immobile.status}</p>
            </>)
        } else if (immobile.status == 'Na Planta') {
            return (<>
                <GrStatusDisabled size={25} className={styles.icon} />
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
                            <Carousel.Item key={image} >
                                <img
                                    style={{ height: "500px", objectFit: "contain" }}
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
                        <span className={styles.goToMap}>VER NO MAPA <SiGooglemaps size={25} className={styles.icon} /></span>
                    </a>
                    <div className={styles.immobileOptions}>
                        <ul>
                            <li>
                                <span><BiArea size={30} className={styles.icon} /></span>
                                <span> {immobile.footage}m²</span>
                            </li>
                            <li>
                                <span><GiResize size={30} className={styles.icon} /></span>
                                <span> {immobile.footageUseful}m² construídos</span>
                            </li>
                            <li>
                                <span><FaCar size={30} className={styles.icon} /></span>
                                <span> {immobile.vacancies} {parseInt(immobile.vacancies) > 1 ? "vagas" : "vaga"}</span>
                            </li>
                            <li>
                                <span><IoIosBed size={30} className={styles.icon} /></span>
                                <span> {immobile.bedrooms} {parseInt(immobile.bedrooms) > 1 ? "quartos" : "quarto"}</span>
                            </li>
                            <li>
                                <span><BiBath size={30} className={styles.icon} /></span>
                                <span> {immobile.suites} {parseInt(immobile.suites) > 1 ? "suítes" : "suíte"}</span>
                            </li>
                            <li>
                                <span><FaToilet size={28} className={styles.icon} /></span>
                                <span> {immobile.bathrooms} {parseInt(immobile.bathrooms) > 1 ? "banheiros" : "banheiro"}</span>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.features}>
                        <div className={styles.title}>
                            <GoChecklist size={35} className={styles.icon} />
                            <h3>Lazer & Características</h3>
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
                            <IoSubway size={35} className={styles.icon} />
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
                    <div className={styles.kind}>
                        <p>{immobile.kind}</p>
                    </div>
                    <div className={styles.status}>
                        {getImmobileStatus()}
                    </div>
                    <div className={styles.managerContacts}>
                        <div className={styles.buttons}>
                            <a href={`https://www.google.com.br/maps/place/${immobile.address.replace(/\s/g, '+')}`} target="_blank">
                                <span className={styles.goToMap}>Ver no Mapa <SiGooglemaps size={25} className={styles.icon} /></span>
                            </a>
                        </div>
                        <div className={styles.buttons}>
                            <a href="https://api.whatsapp.com/send?phone=5511979902343" target="_blank">
                                <span className={styles.goToWhatsApp} >WhatsApp <ImWhatsapp size={25} className={styles.icon} /></span>
                            </a>
                        </div>
                        <div className={styles.buttons}>
                            <span className={styles.goToEmail} onClick={() => { navigator.clipboard.writeText("e-mail pendente") }}>Copiar Email <MdContentCopy size={25} className={styles.icon} /></span>
                        </div>
                    </div>
                </div>
            </div>
            <section className={styles.immobileList}>
                <h1>Preços Atraentes</h1>
                <div>
                    <ul>
                        {attractivePricesList.map((attractivePrices) => {
                            return (
                                <li key={attractivePrices.id}>
                                    <a href={`/immobiles/${attractivePrices.slug}----${attractivePrices.id}`} target="_blank">
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
            </section>
            <Footer />
        </div>
    )
}

// ----------------------------------------------------------------------------------------------------

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params
    let idx = id.toString()
    idx = idx.split('----')[1]
    const immobile = await firebaseController.getImmobileById(idx)
    const attractivePricesList = await firebaseController.getAttractivePrices()
    return {
        props: {
            immobile,
            attractivePricesList
        },
    }
}