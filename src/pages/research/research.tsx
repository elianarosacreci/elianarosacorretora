import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import styles from './research.module.scss'
import Image from 'next/image'
import { Footer } from '../../components/Footer'

import firebaseController from '../../services/firebaseController'
import { Col, Form, Row } from 'react-bootstrap'
var _ = require('lodash');


type Immobile = {
    id: string,
    slug: string,
    priceFormatted: string,
    footage: number,
    bedrooms: string,
    bathrooms: string,
    vacancies: string,
    descriptionTitle: string,
    imageCard: string,
    price: number,
    uf: string,
    city: string,
    features: Array<string>,
    status: string,
    kind: string
}

type ImmobileProps = {
    allImobiles: Immobile[]
}


export default function Research({ allImobiles }: ImmobileProps) {

    const MAX_DESCRIPTION_TITLE_LENGTH = 30;

    const [immobileStatusNaPlanta, setImmobileStatusNaPlanta] = useState(false)
    const [immobileStatusEmConstrucao, setImmobileStatusEmConstrucao] = useState(false)
    const [immobileStatusProntoPraMorar, setImmobileStatusProntoPraMorar] = useState(false)

    const [immobileKindApartamento, setImmobileKindApartamento] = useState(false)
    const [immobileKindCobertura, setImmobileKindCobertura] = useState(false)
    const [immobileKindCasa, setImmobileKindCasa] = useState(false)
    const [immobileKindCasaCondominio, setImmobileKindCasaCondominio] = useState(false)
    const [immobileKindTerreno, setImmobileKindTerreno] = useState(false)
    const [immobileKindConjuntoComercial, setImmobileKindConjuntoComercial] = useState(false)
    const [immobileKindGalpao, setImmobileKindGalpao] = useState(false)
    const [immobileKindSitioFazenda, setImmobileKindSitioFazenda] = useState(false)
    const [immobileKindPredioInteiro, setImmobileKindPredioInteiro] = useState(false)
    const [immobileKindLoja, setImmobileKindLoja] = useState(false)
    const [immobileKindImovelComercial, setImmobileKindImovelComercial] = useState(false)

    const [immobilePriceMin, setImmobilePriceMin] = useState('')
    const [immobilePriceMax, setImmobilePriceMax] = useState('')
    const [immobileFootageMin, setImmobileFootageMin] = useState('')
    const [immobileFootageMax, setImmobileFootageMax] = useState('')
    const [immobileBedrooms, setImmobileBedrooms] = useState('')
    const [immobileBathrooms, setImmobileBathrooms] = useState('')
    const [immobileVacancies, setImmobileVacancies] = useState('')
    const [immobileState, setImmobileState] = useState('')
    const [immobileCity, setImmobileCity] = useState('')
    const [immobileFeatures, setImmobileFeatures] = useState('')

    // ADVANCED FILTER
    const [immobiles, setImmobiles] = useState(allImobiles)
    useEffect(() => {
        // PRICE
        let newImmobile = _.filter(allImobiles, function (o) {
            let min, max;
            immobilePriceMin == '' ? min = 0 : min = parseInt(immobilePriceMin)
            immobilePriceMax == '' ? max = Infinity : max = parseInt(immobilePriceMax)
            return o.price >= min && o.price <= max
        })

        // KIND
        let arrKind = [];
        [
            { status: 'Apartamento', value: immobileKindApartamento },
            { status: 'Cobertura', value: immobileKindCobertura },
            { status: 'Casa', value: immobileKindCasa },
            { status: 'Casa de Condominio', value: immobileKindCasaCondominio },
            { status: 'Terreno', value: immobileKindTerreno },
            { status: 'Conjunto Comercial', value: immobileKindConjuntoComercial },
            { status: 'Galpão', value: immobileKindGalpao },
            { status: 'Sitio/Fazenda', value: immobileKindSitioFazenda },
            { status: 'Prédio Inteiro', value: immobileKindPredioInteiro },
            { status: 'Loja', value: immobileKindLoja },
            { status: 'Imóvel Comercial', value: immobileKindImovelComercial }
        ].map((element) => { if (element.value) { arrKind.push(element.status) } })
        if (arrKind.length > 0) {
            console.log('kind', arrKind);
            newImmobile = _.filter(newImmobile, function (o) {
                if (arrKind.includes(o.kind)) return o
            })
        }

        // STATUS
        let arrStatus = [];
        [
            { status: 'Na Planta', value: immobileStatusNaPlanta },
            { status: 'Em Construção', value: immobileStatusEmConstrucao },
            { status: 'Pronto pra Morar', value: immobileStatusProntoPraMorar }
        ].map((element) => { if (element.value) { arrStatus.push(element.status) } })
        if (arrStatus.length > 0) {
            newImmobile = _.filter(newImmobile, function (o) {
                if (arrStatus.includes(o.status)) return o
            })
        }


        setImmobiles(newImmobile)
    }, [
        immobileStatusNaPlanta,
        immobileStatusEmConstrucao,
        immobileStatusProntoPraMorar,
        immobileKindApartamento,
        immobileKindCobertura,
        immobileKindCasa,
        immobileKindCasaCondominio,
        immobileKindTerreno,
        immobileKindConjuntoComercial,
        immobileKindGalpao,
        immobileKindSitioFazenda,
        immobileKindPredioInteiro,
        immobileKindLoja,
        immobileKindImovelComercial,
        immobilePriceMin,
        immobilePriceMax,
        immobileFootageMin,
        immobileFootageMax,
        immobileBedrooms,
        immobileBathrooms,
        immobileVacancies,
        immobileState,
        immobileCity,
        immobileFeatures,
    ])


    return (
        <div>
            <Head>
                <title></title>
            </Head>

            <div className={styles.immobileDetails}>

                <div className={styles.researchContent}>

                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preço Mínimo</Form.Label>
                                    <Form.Control value={immobilePriceMin.toString()} pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" type="text" onChange={event => setImmobilePriceMin(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preço Máximo</Form.Label>
                                    <Form.Control value={immobilePriceMax.toString()} type="text" onChange={event => setImmobilePriceMax(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Área Mínima</Form.Label>
                                    <Form.Control value={immobileFootageMin} type="number" onChange={event => setImmobileFootageMin(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Área Máxima</Form.Label>
                                    <Form.Control value={immobileFootageMax} type="number" onChange={event => setImmobileFootageMax(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quartos</Form.Label>
                                    <Form.Control value={immobileBedrooms} type="number" onChange={event => setImmobileBedrooms(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Banheiros</Form.Label>
                                    <Form.Control value={immobileBathrooms} type="number" onChange={event => setImmobileBathrooms(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Vagas</Form.Label>
                                    <Form.Control value={immobileVacancies} type="number" onChange={event => setImmobileVacancies(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control value={immobileState} type="text" onChange={event => setImmobileState(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Control value={immobileCity} type="text" onChange={event => setImmobileCity(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Lazer & Características</Form.Label>
                                <Form.Control as="textarea" value={immobileFeatures} type="text" onChange={event => setImmobileFeatures(event.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Label className="mb-3">Tipos de Imóvel</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Check inline name="tipo" type="checkbox" label="Apartamento" onChange={() => {
                                    immobileKindApartamento ? setImmobileKindApartamento(false) : setImmobileKindApartamento(true)
                                }} checked={immobileKindApartamento} />
                                <Form.Check inline name="tipo" type="checkbox" label="Cobertura" onChange={() => {
                                    immobileKindCobertura ? setImmobileKindCobertura(false) : setImmobileKindCobertura(true)
                                }} checked={immobileKindCobertura} />
                                <Form.Check inline name="tipo" type="checkbox" label="Casa" onChange={() => {
                                    immobileKindCasa ? setImmobileKindCasa(false) : setImmobileKindCasa(true)
                                }} checked={immobileKindCasa} />
                                <Form.Check inline name="tipo" type="checkbox" label="Casa de Condominio" onChange={() => {
                                    immobileKindCasaCondominio ? setImmobileKindCasaCondominio(false) : setImmobileKindCasaCondominio(true)
                                }} checked={immobileKindCasaCondominio} />
                                <Form.Check inline name="tipo" type="checkbox" label="Terreno" onChange={() => {
                                    immobileKindTerreno ? setImmobileKindTerreno(false) : setImmobileKindTerreno(true)
                                }} checked={immobileKindTerreno} />
                                <Form.Check inline name="tipo" type="checkbox" label="Conjunto Comercial" onChange={() => {
                                    immobileKindConjuntoComercial ? setImmobileKindConjuntoComercial(false) : setImmobileKindConjuntoComercial(true)
                                }} checked={immobileKindConjuntoComercial} />
                                <Form.Check inline name="tipo" type="checkbox" label="Galpão" onChange={() => {
                                    immobileKindGalpao ? setImmobileKindGalpao(false) : setImmobileKindGalpao(true)
                                }} checked={immobileKindGalpao} />
                                <Form.Check inline name="tipo" type="checkbox" label="Sitio/Fazenda" onChange={() => {
                                    immobileKindSitioFazenda ? setImmobileKindSitioFazenda(false) : setImmobileKindSitioFazenda(true)
                                }} checked={immobileKindSitioFazenda} />
                                <Form.Check inline name="tipo" type="checkbox" label="Prédio Inteiro" onChange={() => {
                                    immobileKindPredioInteiro ? setImmobileKindPredioInteiro(false) : setImmobileKindPredioInteiro(true)
                                }} checked={immobileKindPredioInteiro} />
                                <Form.Check inline name="tipo" type="checkbox" label="Loja" onChange={() => {
                                    immobileKindLoja ? setImmobileKindLoja(false) : setImmobileKindLoja(true)
                                }} checked={immobileKindLoja} />
                                <Form.Check inline name="tipo" type="checkbox" label="Imóvel Comercial" onChange={() => {
                                    immobileKindImovelComercial ? setImmobileKindImovelComercial(false) : setImmobileKindImovelComercial(true)
                                }} checked={immobileKindImovelComercial} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Label className="mb-3">Status do Imóvel</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Check inline name="status" type="checkbox" label="Na Planta" onChange={() => {
                                    immobileStatusNaPlanta ? setImmobileStatusNaPlanta(false) : setImmobileStatusNaPlanta(true)
                                }} checked={immobileStatusNaPlanta} />
                                <Form.Check inline name="status" type="checkbox" label="Em Construção" onChange={() => {
                                    immobileStatusEmConstrucao ? setImmobileStatusEmConstrucao(false) : setImmobileStatusEmConstrucao(true)
                                }} checked={immobileStatusEmConstrucao} />
                                <Form.Check inline name="status" type="checkbox" label="Pronto pra Morar" onChange={() => {
                                    immobileStatusProntoPraMorar ? setImmobileStatusProntoPraMorar(false) : setImmobileStatusProntoPraMorar(true)
                                }} checked={immobileStatusProntoPraMorar} />
                            </Form.Group>
                        </Row>
                    </Form>

                </div>

                <div className={styles.immobilesContent}>

                    <div className={styles.immobileList}>
                        <h1>{immobiles.length} Imóveis Encontrados</h1>
                        <div>
                            <ul>
                                {immobiles.map((immobile) => {
                                    return (
                                        <li key={immobile.id}>
                                            <a href={`/immobiles/${immobile.slug}----${immobile.id}`} target="_blank">
                                                <div className={styles.immobileCards}>
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={immobile.imageCard}
                                                        objectFit="cover"
                                                    />
                                                    <div className={styles.container}>
                                                        <h2>{immobile.priceFormatted}</h2>
                                                        <p><b>{immobile.footage}</b>m²  <b>{immobile.bedrooms}  </b> {immobile.bedrooms == "1" ? "Quarto" : "Quartos"}  <b>{immobile.bathrooms}</b> {immobile.bathrooms == "1" ? "Banheiro" : "Banheiros"}  <b>{immobile.vacancies}</b> {immobile.vacancies == "1" ? "Vaga" : "Vagas"}</p>
                                                        {immobile.descriptionTitle.length > MAX_DESCRIPTION_TITLE_LENGTH ?
                                                            <p>{`${immobile.descriptionTitle.substring(0, MAX_DESCRIPTION_TITLE_LENGTH)}...`}</p> :
                                                            <p>{immobile.descriptionTitle}</p>}
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

                </div>

            </div>

            <Footer />
        </div>
    )
}

// ----------------------------------------------------------------------------------------------------

export const getServerSideProps: GetServerSideProps = async () => {
    const allImobiles = await firebaseController.getAllImmobiles()

    return {
        props: {
            allImobiles,
        }
    }
}