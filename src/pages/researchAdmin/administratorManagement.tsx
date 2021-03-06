import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import styles from './administratorManagement.module.scss'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap/'
import Image from 'next/image'
import Head from 'next/head'
import { Footer } from '../../components/Footer'

import { MdLibraryAdd } from 'react-icons/md'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

import firebaseController from '../../services/firebaseController'
import utilities from '../../services/utilities'
var _ = require('lodash')

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import PaginationItem from '@mui/material/PaginationItem'


type Immobile = {
    id: string
    slug: string
    title: string
    images: string
    footage: string
    bedrooms: string
    bathrooms: string
    vacancies: string
    suites: string
    features: string
    descriptionTitle: string
    description: string
    street: string
    number: string
    state: string
    district: string
    city: string
    price: number
    nearbyTrainsAndSubways: string
    status: string
    kind: string
    comments: string

    priceFormatted: string
    imageCard: string
    idx: string

    footageInt: number
    bedroomsInt: number
    bathroomsInt: number
    vacanciesInt: number
    suitesInt: number
    code: string
}

type PagesItens = string

type ImmobileProps = {
    allImmobiles: Immobile[],
    pagesByImmobiles: PagesItens
}


export default function ResearchAdmin({ allImmobiles, pagesByImmobiles }: ImmobileProps) {

    const router = useRouter()

    const MAX_DESCRIPTION_TITLE_LENGTH = 30

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

    const [page, setPage] = React.useState(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    useEffect(() => {
        async function actionTypeEffect() {
            const newAllImmobiles: any = await firebaseController.getImmobilesByPage(_.chunk(pagesByImmobiles, 6), page)
            setImmobilesFilter(newAllImmobiles)
        }
        actionTypeEffect()
    }, [page])

    useEffect(() => {
        async function actionTypeEffect() {
            const newAllImmobiles: any = await firebaseController.getImmobilesByPage(_.chunk(pagesByImmobiles, 6), page)

        // PRICE
        let newImmobileFilter = _.filter(allImmobiles, function (o) {
            let min, max
            immobileFilterPriceMin == '' ? min = 0 : min = parseInt(immobileFilterPriceMin)
            immobileFilterPriceMax == '' ? max = Infinity : max = parseInt(immobileFilterPriceMax)
            return o.price >= min && o.price <= max
        })

        // FOOTAGE
        newImmobileFilter = _.filter(newImmobileFilter, function (o) {
            let min, max
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
            { status: 'Galp??o', value: immobileFilterKindGalpao },
            { status: 'Sitio/Fazenda', value: immobileFilterKindSitioFazenda },
            { status: 'Pr??dio Inteiro', value: immobileFilterKindPredioInteiro },
            { status: 'Loja', value: immobileFilterKindLoja },
            { status: 'Im??vel Comercial', value: immobileFilterKindImovelComercial }
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
            { status: 'Em Constru????o', value: immobileFilterStatusEmConstrucao },
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
    }
    actionTypeEffect()
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

    const [immobileStatus, setImmobileStatus] = useState('')
    const [immobileStatusNaPlanta, setImmobileStatusNaPlanta] = useState(false)
    const [immobileStatusEmConstrucao, setImmobileStatusEmConstrucao] = useState(false)
    const [immobileStatusProntoPraMorar, setImmobileStatusProntoPraMorar] = useState(false)
    const [immobileKind, setImmobileKind] = useState('')
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
    const [immobileTitle, setImmobileTitle] = useState('')
    const [immobileImages, setImmobileImages] = useState([])
    const [immobileFootage, setImmobileFootage] = useState('')
    const [immobileFootageUseful, setImmobileFootageUseful] = useState('')
    const [immobileBedrooms, setImmobileBedrooms] = useState('')
    const [immobileBathrooms, setImmobileBathrooms] = useState('')
    const [immobileVacancies, setImmobileVacancies] = useState('')
    const [immobileSuites, setImmobileSuites] = useState('')
    const [immobileDescriptionTitle, setImmobileDescriptionTitle] = useState('')
    const [immobileDescription, setImmobileDescription] = useState('')
    const [immobileStreet, setImmobileStreet] = useState('')
    const [immobileNumber, setImmobileNumber] = useState('')
    const [immobileState, setImmobileState] = useState('')
    const [immobileDistrict, setImmobileDistrict] = useState('')
    const [immobileCity, setImmobileCity] = useState('')
    const [immobileFeatures, setImmobileFeatures] = useState('')
    const [immobileNearbyTrainsAndSubways, setImmobileNearbyTrainsAndSubways] = useState('')
    const [immobilePrice, setImmobilePrice] = useState('')
    const [immobileComments, setImmobileComments] = useState('')
    const [immobileIdx, setImmobileIdx] = useState('')

    const [addOrUpdateModalShow, setAddOrUpdateModalShow] = useState(false)
    const [immobileIdToUpdate, setImmobileIdToUpdate] = useState('')
    const [actionType, setActionType] = useState('')

    const handleAddOrUpdateModalClose = () => {
        setActionType('')

        setImmobileStatus('')
        setImmobileStatusNaPlanta(false)
        setImmobileStatusEmConstrucao(false)
        setImmobileStatusProntoPraMorar(false)

        setImmobileKind('')
        setImmobileKindApartamento(false)
        setImmobileKindCobertura(false)
        setImmobileKindCasa(false)
        setImmobileKindCasaCondominio(false)
        setImmobileKindTerreno(false)
        setImmobileKindConjuntoComercial(false)
        setImmobileKindGalpao(false)
        setImmobileKindSitioFazenda(false)
        setImmobileKindPredioInteiro(false)
        setImmobileKindLoja(false)
        setImmobileKindImovelComercial(false)

        setImmobileTitle('')
        setImmobileImages([])
        setImmobileFootage('')
        setImmobileFootageUseful('')
        setImmobileBedrooms('')
        setImmobileBathrooms('')
        setImmobileVacancies('')
        setImmobileSuites('')
        setImmobileDescriptionTitle('')
        setImmobileDescription('')
        setImmobileStreet('')
        setImmobileNumber('')
        setImmobileState('')
        setImmobileDistrict('')
        setImmobileCity('')
        setImmobileFeatures('')
        setImmobileNearbyTrainsAndSubways('')
        setImmobilePrice('')
        setImmobileComments('')

        setAddOrUpdateModalShow(false)
    }

    const addImmobileImagesPreview = async (target: HTMLInputElement) => {
        let imagesListPreview = []
        for (let i = 0; i < target.files.length; i++) {
            const file = target.files[i];
            let arrayBuffer
            await file.arrayBuffer().then(buffer => arrayBuffer = buffer)
            var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
            imagesListPreview.push("data:image/jpeg;base64," + base64String)
        }
        if (immobileImages.length != 0) {
            const newImagesListPreview = [...immobileImages]
            newImagesListPreview.push(...imagesListPreview)
            setImmobileImages(newImagesListPreview)
        } else {
            setImmobileImages(imagesListPreview)
        }
    }
    const removeImmobileImagesPreview = idx => {
        const temp = [...immobileImages]
        temp.splice(idx, 1)
        setImmobileImages(temp)
    }

    useEffect(() => {
        async function actionTypeEffect() {
            if (actionType === "Create") {
                setImmobileStatusNaPlanta(false)

                setImmobileStatus('')
                setImmobileStatusEmConstrucao(false)
                setImmobileStatusProntoPraMorar(false)

                setImmobileKind('')
                setImmobileKindApartamento(false)
                setImmobileKindCobertura(false)
                setImmobileKindCasa(false)
                setImmobileKindCasaCondominio(false)
                setImmobileKindTerreno(false)
                setImmobileKindConjuntoComercial(false)
                setImmobileKindGalpao(false)
                setImmobileKindSitioFazenda(false)
                setImmobileKindPredioInteiro(false)
                setImmobileKindLoja(false)
                setImmobileKindImovelComercial(false)

                setImmobileTitle('')
                setImmobileImages([])
                setImmobileFootage('')
                setImmobileFootageUseful('')
                setImmobileBedrooms('')
                setImmobileBathrooms('')
                setImmobileVacancies('')
                setImmobileSuites('')
                setImmobileDescriptionTitle('')
                setImmobileDescription('')
                setImmobileStreet('')
                setImmobileNumber('')
                setImmobileState('')
                setImmobileDistrict('')
                setImmobileCity('')
                setImmobileFeatures('')
                setImmobileNearbyTrainsAndSubways('')
                setImmobilePrice('')
                setImmobileComments('')
            }
            if (actionType === "Update") {
                let immobileToUpdate: any = await firebaseController.getImmobileByIdToUpdate(immobileIdToUpdate)

                setImmobileStatus(immobileToUpdate.status)
                if (immobileToUpdate.status == 'Na Planta') {
                    setImmobileStatusNaPlanta(true)
                } if (immobileToUpdate.status == 'Em Constru????o') {
                    setImmobileStatusEmConstrucao(true)
                } if (immobileToUpdate.status == 'Pronto pra Morar') {
                    setImmobileStatusProntoPraMorar(true)
                }

                setImmobileKind(immobileToUpdate.kind)
                if (immobileToUpdate.kind == 'Apartamento') {
                    setImmobileKindApartamento(true)
                }
                if (immobileToUpdate.kind == 'Cobertura') {
                    setImmobileKindCobertura(true)
                }
                if (immobileToUpdate.kind == 'Casa') {
                    setImmobileKindCasa(true)
                }
                if (immobileToUpdate.kind == 'Casa de Condominio') {
                    setImmobileKindCasaCondominio(true)
                }
                if (immobileToUpdate.kind == 'Terreno') {
                    setImmobileKindTerreno(true)
                }
                if (immobileToUpdate.kind == 'Conjunto Comercial') {
                    setImmobileKindConjuntoComercial(true)
                }
                if (immobileToUpdate.kind == 'Galp??o') {
                    setImmobileKindGalpao(true)
                }
                if (immobileToUpdate.kind == 'Sitio/Fazenda') {
                    setImmobileKindSitioFazenda(true)
                }
                if (immobileToUpdate.kind == 'Pr??dio Inteiro') {
                    setImmobileKindPredioInteiro(true)
                }
                if (immobileToUpdate.kind == 'Loja') {
                    setImmobileKindLoja(true)
                }
                if (immobileToUpdate.kind == 'Im??vel Comercial') {
                    setImmobileKindImovelComercial(true)
                }

                setImmobileTitle(immobileToUpdate.title)
                setImmobileImages(immobileToUpdate.images)
                setImmobileFootage(immobileToUpdate.footage)
                setImmobileFootageUseful(immobileToUpdate.footageUseful)
                setImmobileBedrooms(immobileToUpdate.bedrooms)
                setImmobileBathrooms(immobileToUpdate.bathrooms)
                setImmobileVacancies(immobileToUpdate.vacancies)
                setImmobileSuites(immobileToUpdate.suites)
                setImmobileDescriptionTitle(immobileToUpdate.descriptionTitle)
                setImmobileDescription(immobileToUpdate.description)
                setImmobileStreet(immobileToUpdate.street)
                setImmobileNumber(immobileToUpdate.number)
                setImmobileState(immobileToUpdate.state)
                setImmobileDistrict(immobileToUpdate.district)
                setImmobileCity(immobileToUpdate.city)
                setImmobilePrice(immobileToUpdate.price)
                setImmobileComments(immobileToUpdate.comments)
                let features = ''
                immobileToUpdate.features.forEach(function (feature, idx, array) {
                    if (idx === array.length - 1) {
                        features += feature
                    } else {
                        features += `${feature},`
                    }
                })
                setImmobileFeatures(features)
                let nearbyTrainsAndSubways = ''
                immobileToUpdate.nearbyTrainsAndSubways.forEach(function (nearbyTrainAndSubway, idx, array) {
                    if (idx === array.length - 1) {
                        nearbyTrainsAndSubways += `${nearbyTrainAndSubway.name} - ${nearbyTrainAndSubway.distance}`
                    } else {
                        nearbyTrainsAndSubways += `${nearbyTrainAndSubway.name} - ${nearbyTrainAndSubway.distance},`
                    }
                })
                setImmobileNearbyTrainsAndSubways(nearbyTrainsAndSubways)
                setImmobileIdx(immobileToUpdate.idx)
            }
        }
        actionTypeEffect()
    }, [actionType])

    async function addOrUpdateImmobile() {

        if (immobileTitle == '' || immobileImages.length == 0 || immobileFootage == '' || immobileFootageUseful == '' || immobileBedrooms == '' || immobileBathrooms == '' || immobileVacancies == '' ||
            immobileSuites == '' || immobileDescriptionTitle == '' || immobileDescription == '' ||
            immobileStreet == '' || immobileNumber == '' || immobileState == '' || immobileDistrict == '' || immobileCity == '' || immobileFeatures == '' || immobileNearbyTrainsAndSubways == '' ||
            immobileStatus == '' || immobileKind == '' || immobilePrice == '' || immobileComments == '') {
            alert('Preencha todos os campos para salvar!')
            return
        }
        let immobileUUID = await utilities.getUUID()
        let immobileCode = await utilities.getCode(immobileKind)
        let immobileSlug = await utilities.getSlug(immobileTitle)
        let immobileFullAddress = `${immobileStreet}, ${immobileNumber} - ${immobileDistrict} - ${immobileCity} - ${immobileState}`
        let date: Date = new Date()
        let immobileCreatedAt = date.toLocaleString().replace(/\//g, '-')
        let features = immobileFeatures.split(',').map(Function.prototype.call, String.prototype.trim)
        let price = parseInt(immobilePrice)
        let nearbyTrainsAndSubways = []
        let splitOne = immobileNearbyTrainsAndSubways.split(',').map(Function.prototype.call, String.prototype.trim)
        splitOne.forEach(element => {
            let splitTwo = element.split('-').map(Function.prototype.call, String.prototype.trim)
            nearbyTrainsAndSubways.push({
                name: splitTwo[0],
                distance: splitTwo[1]
            })
        })
        let immobileToSave = {
            "id": immobileUUID,
            "slug": immobileSlug,
            "title": immobileTitle,
            "code": immobileCode,
            "images": immobileImages,
            "footage": immobileFootage,
            "footageUseful": immobileFootageUseful,
            "bedrooms": immobileBedrooms,
            "bathrooms": immobileBathrooms,
            "vacancies": immobileVacancies,
            "suites": immobileSuites,
            "features": features,
            "descriptionTitle": immobileDescriptionTitle,
            "description": immobileDescription,
            "address": {
                "street": immobileStreet,
                "number": immobileNumber,
                "district": immobileDistrict,
                "city": immobileCity,
                "state": immobileState,
                "fullAddress": immobileFullAddress
            },
            "price": price,
            "nearbyTrainsAndSubways": nearbyTrainsAndSubways,
            "status": immobileStatus,
            "kind": immobileKind,
            "comments": immobileComments,
            "createdAt": immobileCreatedAt
        }

        if (actionType === "Create") {
            await firebaseController.insertImmobile(immobileToSave)
            alert('Im??vel salvo!')
        }
        if (actionType === "Update") {
            await firebaseController.updateImmobile(immobileToSave, immobileIdx)
            alert('Im??vel atualizado!')
        }

        handleAddOrUpdateModalClose()
        router.push(`/researchAdmin/administratorManagement`)
        // window.location.reload()
        return
    }

    async function removeImmobile(idx) {
        await firebaseController.removeImmobileById(idx)
        router.push(`/researchAdmin/administratorManagement`)
        // window.location.reload()
        alert('Im??vel removido!')
    }


    return (
        <>
            <Head>
                <title></title>
            </Head>
            <div className={styles.immobileDetails}>
                <div className={styles.researchContent}>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b><b>Pre??o M??nimo</b></b></Form.Label>
                                    <Form.Control value={immobileFilterPriceMin.toString()} type="text" maxLength={10} onChange={event => setImmobileFilterPriceMin(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b><b>Pre??o M??ximo</b></b></Form.Label>
                                    <Form.Control value={immobileFilterPriceMax.toString()} type="text" maxLength={10} onChange={event => setImmobileFilterPriceMax(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b><b>??rea M??nima</b></b></Form.Label>
                                    <Form.Control value={immobileFilterFootageMin} type="text" onChange={event => setImmobileFilterFootageMin(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label><b><b>??rea M??xima</b></b></Form.Label>
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
                                    <Form.Label><b>Su??tes</b></Form.Label>
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
                            <Form.Label className="mb-3"><b>Tipos de Im??vel</b></Form.Label>
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
                                <Form.Check inline name="tipo" type="checkbox" label="Galp??o" onChange={() => {
                                    immobileFilterKindGalpao ? setImmobileFilterKindGalpao(false) : setImmobileFilterKindGalpao(true)
                                }} checked={immobileFilterKindGalpao} />
                                <Form.Check inline name="tipo" type="checkbox" label="Sitio/Fazenda" onChange={() => {
                                    immobileFilterKindSitioFazenda ? setImmobileFilterKindSitioFazenda(false) : setImmobileFilterKindSitioFazenda(true)
                                }} checked={immobileFilterKindSitioFazenda} />
                                <Form.Check inline name="tipo" type="checkbox" label="Pr??dio Inteiro" onChange={() => {
                                    immobileFilterKindPredioInteiro ? setImmobileFilterKindPredioInteiro(false) : setImmobileFilterKindPredioInteiro(true)
                                }} checked={immobileFilterKindPredioInteiro} />
                                <Form.Check inline name="tipo" type="checkbox" label="Loja" onChange={() => {
                                    immobileFilterKindLoja ? setImmobileFilterKindLoja(false) : setImmobileFilterKindLoja(true)
                                }} checked={immobileFilterKindLoja} />
                                <Form.Check inline name="tipo" type="checkbox" label="Im??vel Comercial" onChange={() => {
                                    immobileFilterKindImovelComercial ? setImmobileFilterKindImovelComercial(false) : setImmobileFilterKindImovelComercial(true)
                                }} checked={immobileFilterKindImovelComercial} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Label className="mb-3"><b>Status do Im??vel</b></Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Check inline name="status" type="checkbox" label="Na Planta" onChange={() => {
                                    immobileFilterStatusNaPlanta ? setImmobileFilterStatusNaPlanta(false) : setImmobileFilterStatusNaPlanta(true)
                                }} checked={immobileFilterStatusNaPlanta} />
                                <Form.Check inline name="status" type="checkbox" label="Em Constru????o" onChange={() => {
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
                                    <Form.Label><b>C??digo</b></Form.Label>
                                    <Form.Control value={immobileFilterCode} type="text" onChange={event => setImmobileFilterCode(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <div className={styles.immobilesContent}>
                    <div className={styles.immobileList}>
                        <div className={styles.listOptions}>
                            <h1>Im??veis Encontrados</h1>
                            <span>
                                <button onClick={() => { setActionType("Create"); setAddOrUpdateModalShow(true) }}><MdLibraryAdd size={40} /></button>
                            </span>
                        </div>
                        <div>
                            <ul>
                                {immobilesFilter.map((immobile) => {
                                    return (
                                        <li key={immobile.id}>
                                            <div className={styles.immobileCards}>
                                                <Image
                                                    width={500}
                                                    height={500}
                                                    src={immobile.imageCard}
                                                    objectFit="cover"
                                                />
                                                <div className={styles.container}>
                                                    <h2>{immobile.priceFormatted}</h2>
                                                    <p><b>{immobile.footage}</b>m?? <b>{immobile.bedrooms}</b> Quartos <b>{immobile.bathrooms}</b> Banheiros <b>{immobile.vacancies}</b> Vaga</p>
                                                    {immobile.descriptionTitle.length > MAX_DESCRIPTION_TITLE_LENGTH ?
                                                        <p>{`${immobile.descriptionTitle.substring(0, MAX_DESCRIPTION_TITLE_LENGTH)}...`}</p> :
                                                        <p>{immobile.descriptionTitle}</p>}
                                                    <button onClick={() => { setActionType("Update"); setImmobileIdToUpdate(immobile.id); setAddOrUpdateModalShow(true) }}><FaPencilAlt size={30} /></button>
                                                    <button onClick={() => removeImmobile(immobile.id)}><FaTrashAlt size={30} /></button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <br />
                    <Stack
                        className={styles.pagination}
                        spacing={2}>
                        <Pagination
                            count={_.chunk(pagesByImmobiles, 6).length}
                            shape="rounded"
                            size="large"
                            variant="outlined"
                            renderItem={(item) => (
                                <PaginationItem
                                    {...item}
                                />
                            )}
                            page={page}
                            onChange={handleChange}
                        />
                    </Stack>
                </div>
            </div>
            <Footer />

            {/* ADD AND UPDATE MODAL */}
            <Modal
                show={addOrUpdateModalShow}
                backdrop="static"
                size="lg"
                className={styles.modal}
            >
                <Modal.Header>
                    {actionType === "Create" ? <Modal.Title>Inserir Novo Im??vel</Modal.Title> : <Modal.Title>Atualizar Im??vel</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>T??tulo</Form.Label>
                                <Form.Control value={immobileTitle} type="text" placeholder="Digite o t??tulo" onChange={event => setImmobileTitle(event.target.value)} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Imagens</Form.Label>
                                <br />
                                <Form.Control type="file" multiple onChange={event => { addImmobileImagesPreview(event.target as HTMLInputElement) }} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <ul>
                                {immobileImages.map((image, index) => {
                                    return (
                                        <li key={index}>
                                            <Image
                                                width={100}
                                                height={100}
                                                src={image}
                                                objectFit="cover"
                                            />
                                            <button onClick={event => { removeImmobileImagesPreview(index); event.preventDefault() }}><FaTrashAlt size={20} /></button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>??rea</Form.Label>
                                    <Form.Control value={immobileFootage} type="text" placeholder="..." onChange={event => setImmobileFootage(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>??rea Constru??da</Form.Label>
                                    <Form.Control value={immobileFootageUseful} type="text" placeholder="..." onChange={event => setImmobileFootageUseful(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Vagas</Form.Label>
                                    <Form.Control value={immobileVacancies} type="text" placeholder="..." onChange={event => setImmobileVacancies(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quartos</Form.Label>
                                    <Form.Control value={immobileBedrooms} type="text" placeholder="..." onChange={event => setImmobileBedrooms(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Banheiros</Form.Label>
                                    <Form.Control value={immobileBathrooms} type="text" placeholder="..." onChange={event => setImmobileBathrooms(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Su??tes</Form.Label>
                                    <Form.Control value={immobileSuites} type="text" placeholder="..." onChange={event => setImmobileSuites(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>T??tulo da Descri????o</Form.Label>
                                <Form.Control value={immobileDescriptionTitle} type="text" placeholder="Digite o t??tulo da descri????o" onChange={event => setImmobileDescriptionTitle(event.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Descri????o</Form.Label>
                                <Form.Control as="textarea" rows={3} value={immobileDescription} type="text" placeholder="Digite a descri????o" onChange={event => setImmobileDescription(event.target.value)} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rua</Form.Label>
                                    <Form.Control value={immobileStreet} type="text" placeholder="Digite a rua" onChange={event => setImmobileStreet(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>N??mero</Form.Label>
                                    <Form.Control value={immobileNumber} type="text" placeholder="Ex: 201..." onChange={event => setImmobileNumber(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control value={immobileState} type="text" placeholder="Ex: MG..." onChange={event => setImmobileState(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Bairro</Form.Label>
                                    <Form.Control value={immobileDistrict} type="text" placeholder="Digite o bairro" onChange={event => setImmobileDistrict(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Control value={immobileCity} type="text" placeholder="Digite a cidade" onChange={event => setImmobileCity(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Lazer & Caracter??sticas</Form.Label>
                                <Form.Control as="textarea" rows={4} value={immobileFeatures} type="text" placeholder="Digite as caracter??sticas do im??vel separando por v??rgulas. Ex: Piscina, Acad??mia, Playground, Churrasqueira..." onChange={event => setImmobileFeatures(event.target.value)} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Trens e Metr??s Pr??ximos</Form.Label>
                                <Form.Control as="textarea" rows={4} value={immobileNearbyTrainsAndSubways} type="text" onChange={event => setImmobileNearbyTrainsAndSubways(event.target.value)} placeholder={`Digite: "nome da esta????o" + "-" + "distacia em km". Caso tenha mais de uma esta????o, separe por v??gula. Ex: Esta????o General Miguel Costa - 1.5km, Esta????o Quita??na - 1.8km...`} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Label className="mb-3">Status do Im??vel</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Check inline name="tipo" type="radio" label="Apartamento" onChange={() => {
                                    setImmobileKind("Apartamento")
                                    setImmobileKindApartamento(true)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindApartamento} />
                                <Form.Check inline name="tipo" type="radio" label="Cobertura" onChange={() => {
                                    setImmobileKind("Cobertura")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(true)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindCobertura} />
                                <Form.Check inline name="tipo" type="radio" label="Casa" onChange={() => {
                                    setImmobileKind("Casa")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(true)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindCasa} />
                                <Form.Check inline name="tipo" type="radio" label="Casa de Condominio" onChange={() => {
                                    setImmobileKind("Casa de Condominio")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(true)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindCasaCondominio} />
                                <Form.Check inline name="tipo" type="radio" label="Terreno" onChange={() => {
                                    setImmobileKind("Terreno")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(true)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindTerreno} />
                                <Form.Check inline name="tipo" type="radio" label="Conjunto Comercial" onChange={() => {
                                    setImmobileKind("Conjunto Comercial")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(true)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindConjuntoComercial} />
                                <Form.Check inline name="tipo" type="radio" label="Galp??o" onChange={() => {
                                    setImmobileKind("Galp??o")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(true)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindGalpao} />
                                <Form.Check inline name="tipo" type="radio" label="Sitio/Fazenda" onChange={() => {
                                    setImmobileKind("Sitio/Fazenda")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(true)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindSitioFazenda} />
                                <Form.Check inline name="tipo" type="radio" label="Pr??dio Inteiro" onChange={() => {
                                    setImmobileKind("Pr??dio Inteiro")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(true)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindPredioInteiro} />
                                <Form.Check inline name="tipo" type="radio" label="Loja" onChange={() => {
                                    setImmobileKind("Loja")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(true)
                                    setImmobileKindImovelComercial(false)
                                }} checked={immobileKindLoja} />
                                <Form.Check inline name="tipo" type="radio" label="Im??vel Comercial" onChange={() => {
                                    setImmobileKind("Im??vel Comercial")
                                    setImmobileKindApartamento(false)
                                    setImmobileKindCobertura(false)
                                    setImmobileKindCasa(false)
                                    setImmobileKindCasaCondominio(false)
                                    setImmobileKindTerreno(false)
                                    setImmobileKindConjuntoComercial(false)
                                    setImmobileKindGalpao(false)
                                    setImmobileKindSitioFazenda(false)
                                    setImmobileKindPredioInteiro(false)
                                    setImmobileKindLoja(false)
                                    setImmobileKindImovelComercial(true)
                                }} checked={immobileKindImovelComercial} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Label className="mb-3">Status do Im??vel</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Check inline name="status" type="radio" label="Na Planta" onChange={() => {
                                    setImmobileStatus("Na Planta")
                                    setImmobileStatusNaPlanta(true)
                                    setImmobileStatusEmConstrucao(false)
                                    setImmobileStatusProntoPraMorar(false)
                                }} checked={immobileStatusNaPlanta} />
                                <Form.Check inline name="status" type="radio" label="Em Constru????o" onChange={() => {
                                    setImmobileStatus("Em Constru????o")
                                    setImmobileStatusNaPlanta(false)
                                    setImmobileStatusEmConstrucao(true)
                                    setImmobileStatusProntoPraMorar(false)
                                }} checked={immobileStatusEmConstrucao} />
                                <Form.Check inline name="status" type="radio" label="Pronto pra Morar" onChange={() => {
                                    setImmobileStatus("Pronto pra Morar")
                                    setImmobileStatusNaPlanta(false)
                                    setImmobileStatusEmConstrucao(false)
                                    setImmobileStatusProntoPraMorar(true)
                                }} checked={immobileStatusProntoPraMorar} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Col xl={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pre??o do Im??vel</Form.Label>
                                    <Form.Control value={immobilePrice.toString()} type="text" placeholder="Digite o valor (R$) do im??vel" onChange={event => setImmobilePrice(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Observa????es</Form.Label>
                                <Form.Control as="textarea" rows={4} value={immobileComments} type="text" placeholder="Digite as observa????es" onChange={event => setImmobileComments(event.target.value)} />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleAddOrUpdateModalClose}>Fechar</Button>
                    {actionType === "Create" ? <Button variant="success" onClick={() => addOrUpdateImmobile()}>Inserir</Button> : <Button variant="success" onClick={() => addOrUpdateImmobile()}>Atualizar</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

// ----------------------------------------------------------------------------------------------------

export const getServerSideProps: GetServerSideProps = async () => {
    const pagesByImmobiles = await firebaseController.getPagesByImmobiles()
    const allImmobiles = await firebaseController.getImmobilesByPage(_.chunk(pagesByImmobiles, 6), 1)

    return {
        props: {
            allImmobiles,
            pagesByImmobiles,
        }
    }
}
