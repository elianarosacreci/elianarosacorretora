import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import styles from './research.module.scss'
import Image from 'next/image'
import { Col, Form, Row } from 'react-bootstrap'
import { Footer } from '../../components/Footer'

import firebaseController from '../../services/firebaseController'
var _ = require('lodash');


type Immobile = {
    id: string
    slug: string
    priceFormatted: string
    footage: string
    bedrooms: string
    bathrooms: string
    vacancies: string
    suites: string
    descriptionTitle: string
    imageCard: string
    price: number
    state: string
    city: string
    status: string
    kind: string
    footageInt: number
    bedroomsInt: number
    bathroomsInt: number
    vacanciesInt: number
    suitesInt: number
    code: string
}

type ImmobileProps = {
    allImmobiles: Immobile[]
}


export default function Research({ allImmobiles }: ImmobileProps) {

    const MAX_DESCRIPTION_TITLE_LENGTH = 30;

    // FILTER
    const [immobileFilterStatusNaPlanta, setImmobileFilterStatusNaPlanta] = useState(false)
    const [immobileFilterStatusEmConstrucao, setImmobileFilterStatusEmConstrucao] = useState(false)
    const [immobileFilterStatusProntoPraMorar, setImmobileFilterStatusProntoPraMorar] = useState(false)
    const [immobileFilterKindApartamento, setImmobileFilterKindApartamento] = useState(false)
    const [immobileFilterKindCobertura, setImmobileFilterKindCobertura] = useState(false)
    const [immobileFilterKindCasa, setImmobileFilterKindCasa] = useState(false)
    const [immobileFilterKindCasaCondominio, setImmobileFilterKindCasaCondominio] = useState(false)
    const [immobileFilterKindTerreno, setImmobileFilterKindTerreno] = useState(false)
    const [immobileFilterKindConjuntoComercial, setImmobileFilterKindConjuntoComercial] = useState(false)
    const [immobileFilterKindGalpao, setImmobileFilterKindGalpao] = useState(false)
    const [immobileFilterKindSitioFazenda, setImmobileFilterKindSitioFazenda] = useState(false)
    const [immobileFilterKindPredioInteiro, setImmobileFilterKindPredioInteiro] = useState(false)
    const [immobileFilterKindLoja, setImmobileFilterKindLoja] = useState(false)
    const [immobileFilterKindImovelComercial, setImmobileFilterKindImovelComercial] = useState(false)
    const [immobileFilterPriceMin, setImmobileFilterPriceMin] = useState('')
    const [immobileFilterPriceMax, setImmobileFilterPriceMax] = useState('')
    const [immobileFilterFootageMin, setImmobileFilterFootageMin] = useState('')
    const [immobileFilterFootageMax, setImmobileFilterFootageMax] = useState('')
    const [immobileFilterBedrooms, setImmobileFilterBedrooms] = useState('')
    const [immobileFilterBathrooms, setImmobileFilterBathrooms] = useState('')
    const [immobileFilterVacancies, setImmobileFilterVacancies] = useState('')
    const [immobileFilterSuites, setImmobileFilterSuites] = useState('')
    const [immobileFilterState, setImmobileFilterState] = useState('')
    const [immobileFilterCity, setImmobileFilterCity] = useState('')
    const [immobileFilterCode, setImmobileFilterCode] = useState('')

    // ADVANCED FILTER
    const [immobilesFilter, setImmobilesFilter] = useState(allImmobiles)
    useEffect(() => {
        // PRICE
        let newImmobileFilter = _.filter(allImmobiles, function (o) {
            let min, max;
            immobileFilterPriceMin == '' ? min = 0 : min = parseInt(immobileFilterPriceMin)
            immobileFilterPriceMax == '' ? max = Infinity : max = parseInt(immobileFilterPriceMax)
            return o.price >= min && o.price <= max
        })

        // FOOTAGE
        newImmobileFilter = _.filter(newImmobileFilter, function (o) {
            let min, max;
            immobileFilterFootageMin == '' ? min = 0 : min = parseInt(immobileFilterFootageMin)
            immobileFilterFootageMax == '' ? max = Infinity : max = parseInt(immobileFilterFootageMax)
            return o.footageInt >= min && o.footageInt <= max
        })

        // BEDROOMS
        if (immobileFilterBedrooms != '') {
            newImmobileFilter = _.filter(newImmobileFilter, function (o) {
                let bedrooms
                immobileFilterBedrooms == '' ? bedrooms = '' : bedrooms = parseInt(immobileFilterBedrooms)
                return o.bedroomsInt == bedrooms
            })
        }

        // BATHROOMS
        if (immobileFilterBathrooms != '') {
            newImmobileFilter = _.filter(newImmobileFilter, function (o) {
                let bathrooms
                immobileFilterBathrooms == '' ? bathrooms = '' : bathrooms = parseInt(immobileFilterBathrooms)
                return o.bathroomsInt == bathrooms
            })
        }

        // VACANCIES
        if (immobileFilterVacancies != '') {
            newImmobileFilter = _.filter(newImmobileFilter, function (o) {
                let vacancies
                immobileFilterVacancies == '' ? vacancies = '' : vacancies = parseInt(immobileFilterVacancies)
                return o.vacanciesInt == vacancies
            })
        }

        // SUITES
        if (immobileFilterSuites != '') {
            newImmobileFilter = _.filter(newImmobileFilter, function (o) {
                let suites
                immobileFilterSuites == '' ? suites = '' : suites = parseInt(immobileFilterSuites)
                return o.suitesInt == suites
            })
        }

        // STATE
        if (immobileFilterState != '') {
            newImmobileFilter = _.filter(newImmobileFilter, function (o) {
                return o.state.includes(immobileFilterState) == true
            })
        }

        // CITY
        if (immobileFilterCity != '') {
            newImmobileFilter = _.filter(newImmobileFilter, function (o) {
                return o.city.includes(immobileFilterCity) == true
            })
        }

        // KIND
        let arrKind = [];
        [
            { status: 'Apartamento', value: immobileFilterKindApartamento },
            { status: 'Cobertura', value: immobileFilterKindCobertura },
            { status: 'Casa', value: immobileFilterKindCasa },
            { status: 'Casa de Condominio', value: immobileFilterKindCasaCondominio },
            { status: 'Terreno', value: immobileFilterKindTerreno },
            { status: 'Conjunto Comercial', value: immobileFilterKindConjuntoComercial },
            { status: 'Galpão', value: immobileFilterKindGalpao },
            { status: 'Sitio/Fazenda', value: immobileFilterKindSitioFazenda },
            { status: 'Prédio Inteiro', value: immobileFilterKindPredioInteiro },
            { status: 'Loja', value: immobileFilterKindLoja },
            { status: 'Imóvel Comercial', value: immobileFilterKindImovelComercial }
        ].map((element) => { if (element.value) { arrKind.push(element.status) } })
        if (arrKind.length > 0) {
            newImmobileFilter = _.filter(newImmobileFilter, function (o) {
                if (arrKind.includes(o.kind)) return o
            })
        }

        // STATUS
        let arrStatus = [];
        [
            { status: 'Na Planta', value: immobileFilterStatusNaPlanta },
            { status: 'Em Construção', value: immobileFilterStatusEmConstrucao },
            { status: 'Pronto pra Morar', value: immobileFilterStatusProntoPraMorar }
        ].map((element) => { if (element.value) { arrStatus.push(element.status) } })
        if (arrStatus.length > 0) {
            newImmobileFilter = _.filter(newImmobileFilter, function (o) {
                if (arrStatus.includes(o.status)) return o
            })
        }

        // CODE
        if (immobileFilterCode != '') {
            newImmobileFilter = _.filter(newImmobileFilter, function (o) {
                return o.code.includes(immobileFilterCode) == true
            })
        }

        setImmobilesFilter(newImmobileFilter)
    }, [
        immobileFilterStatusNaPlanta,
        immobileFilterStatusEmConstrucao,
        immobileFilterStatusProntoPraMorar,
        immobileFilterKindApartamento,
        immobileFilterKindCobertura,
        immobileFilterKindCasa,
        immobileFilterKindCasaCondominio,
        immobileFilterKindTerreno,
        immobileFilterKindConjuntoComercial,
        immobileFilterKindGalpao,
        immobileFilterKindSitioFazenda,
        immobileFilterKindPredioInteiro,
        immobileFilterKindLoja,
        immobileFilterKindImovelComercial,
        immobileFilterPriceMin,
        immobileFilterPriceMax,
        immobileFilterFootageMin,
        immobileFilterFootageMax,
        immobileFilterBedrooms,
        immobileFilterBathrooms,
        immobileFilterVacancies,
        immobileFilterSuites,
        immobileFilterState,
        immobileFilterCity,
        immobileFilterCode
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
                                    <Form.Label><b><b>Preço Mínimo</b></b></Form.Label>
                                    <Form.Control value={immobileFilterPriceMin.toString()} type="text" maxLength={10} onChange={event => setImmobileFilterPriceMin(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b><b>Preço Máximo</b></b></Form.Label>
                                    <Form.Control value={immobileFilterPriceMax.toString()} type="text" maxLength={10} onChange={event => setImmobileFilterPriceMax(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b><b>Área Mínima</b></b></Form.Label>
                                    <Form.Control value={immobileFilterFootageMin} type="text" onChange={event => setImmobileFilterFootageMin(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b><b>Área Máxima</b></b></Form.Label>
                                    <Form.Control value={immobileFilterFootageMax} type="text" onChange={event => setImmobileFilterFootageMax(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>Quartos</b></Form.Label>
                                    <Form.Control value={immobileFilterBedrooms} type="text" onChange={event => setImmobileFilterBedrooms(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>Banheiros</b></Form.Label>
                                    <Form.Control value={immobileFilterBathrooms} type="text" onChange={event => setImmobileFilterBathrooms(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>Suítes</b></Form.Label>
                                    <Form.Control value={immobileFilterSuites} type="text" onChange={event => setImmobileFilterSuites(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>Vagas</b></Form.Label>
                                    <Form.Control value={immobileFilterVacancies} type="text" onChange={event => setImmobileFilterVacancies(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>Estado</b></Form.Label>
                                    <Form.Control value={immobileFilterState} type="text" onChange={event => setImmobileFilterState(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>Cidade</b></Form.Label>
                                    <Form.Control value={immobileFilterCity} type="text" onChange={event => setImmobileFilterCity(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Form.Label className="mb-3"><b>Tipos de Imóvel</b></Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Check inline name="tipo" type="checkbox" label="Apartamento" onChange={() => {
                                    immobileFilterKindApartamento ? setImmobileFilterKindApartamento(false) : setImmobileFilterKindApartamento(true)
                                }} checked={immobileFilterKindApartamento} />
                                <Form.Check inline name="tipo" type="checkbox" label="Cobertura" onChange={() => {
                                    immobileFilterKindCobertura ? setImmobileFilterKindCobertura(false) : setImmobileFilterKindCobertura(true)
                                }} checked={immobileFilterKindCobertura} />
                                <Form.Check inline name="tipo" type="checkbox" label="Casa" onChange={() => {
                                    immobileFilterKindCasa ? setImmobileFilterKindCasa(false) : setImmobileFilterKindCasa(true)
                                }} checked={immobileFilterKindCasa} />
                                <Form.Check inline name="tipo" type="checkbox" label="Casa de Condominio" onChange={() => {
                                    immobileFilterKindCasaCondominio ? setImmobileFilterKindCasaCondominio(false) : setImmobileFilterKindCasaCondominio(true)
                                }} checked={immobileFilterKindCasaCondominio} />
                                <Form.Check inline name="tipo" type="checkbox" label="Terreno" onChange={() => {
                                    immobileFilterKindTerreno ? setImmobileFilterKindTerreno(false) : setImmobileFilterKindTerreno(true)
                                }} checked={immobileFilterKindTerreno} />
                                <Form.Check inline name="tipo" type="checkbox" label="Conjunto Comercial" onChange={() => {
                                    immobileFilterKindConjuntoComercial ? setImmobileFilterKindConjuntoComercial(false) : setImmobileFilterKindConjuntoComercial(true)
                                }} checked={immobileFilterKindConjuntoComercial} />
                                <Form.Check inline name="tipo" type="checkbox" label="Galpão" onChange={() => {
                                    immobileFilterKindGalpao ? setImmobileFilterKindGalpao(false) : setImmobileFilterKindGalpao(true)
                                }} checked={immobileFilterKindGalpao} />
                                <Form.Check inline name="tipo" type="checkbox" label="Sitio/Fazenda" onChange={() => {
                                    immobileFilterKindSitioFazenda ? setImmobileFilterKindSitioFazenda(false) : setImmobileFilterKindSitioFazenda(true)
                                }} checked={immobileFilterKindSitioFazenda} />
                                <Form.Check inline name="tipo" type="checkbox" label="Prédio Inteiro" onChange={() => {
                                    immobileFilterKindPredioInteiro ? setImmobileFilterKindPredioInteiro(false) : setImmobileFilterKindPredioInteiro(true)
                                }} checked={immobileFilterKindPredioInteiro} />
                                <Form.Check inline name="tipo" type="checkbox" label="Loja" onChange={() => {
                                    immobileFilterKindLoja ? setImmobileFilterKindLoja(false) : setImmobileFilterKindLoja(true)
                                }} checked={immobileFilterKindLoja} />
                                <Form.Check inline name="tipo" type="checkbox" label="Imóvel Comercial" onChange={() => {
                                    immobileFilterKindImovelComercial ? setImmobileFilterKindImovelComercial(false) : setImmobileFilterKindImovelComercial(true)
                                }} checked={immobileFilterKindImovelComercial} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Label className="mb-3"><b>Status do Imóvel</b></Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Check inline name="status" type="checkbox" label="Na Planta" onChange={() => {
                                    immobileFilterStatusNaPlanta ? setImmobileFilterStatusNaPlanta(false) : setImmobileFilterStatusNaPlanta(true)
                                }} checked={immobileFilterStatusNaPlanta} />
                                <Form.Check inline name="status" type="checkbox" label="Em Construção" onChange={() => {
                                    immobileFilterStatusEmConstrucao ? setImmobileFilterStatusEmConstrucao(false) : setImmobileFilterStatusEmConstrucao(true)
                                }} checked={immobileFilterStatusEmConstrucao} />
                                <Form.Check inline name="status" type="checkbox" label="Pronto pra Morar" onChange={() => {
                                    immobileFilterStatusProntoPraMorar ? setImmobileFilterStatusProntoPraMorar(false) : setImmobileFilterStatusProntoPraMorar(true)
                                }} checked={immobileFilterStatusProntoPraMorar} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>Código</b></Form.Label>
                                    <Form.Control value={immobileFilterCode} type="text" onChange={event => setImmobileFilterCode(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </div>
                
                <div className={styles.immobilesContent}>
                    <div className={styles.immobileList}>
                        <h1>{immobilesFilter.length} Imóveis Encontrados</h1>
                        <div>
                            <ul>
                                {immobilesFilter.map((immobile) => {
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
    const allImmobiles = await firebaseController.getAllImmobiles()
    const allimmbl = _.drop(allImmobiles, 11)

    return {
        props: {
            allimmbl
        }
    }
}