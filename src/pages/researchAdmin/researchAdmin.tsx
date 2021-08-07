import styles from './researchAdmin.module.scss'
import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Footer } from '../../components/Footer'
import { GetStaticProps } from 'next'

import { Button, Col, Form, Modal, Row } from 'react-bootstrap/'

import { MdLibraryAdd } from 'react-icons/md'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

import firebaseController from '../../services/firebaseController'
import utilities from '../../services/utilities'


type Immobile = {
    id: string,
    slug: string,
    price: string,
    footage: string,
    bedrooms: string,
    bathrooms: string,
    vacancies: string,
    descriptionTitle: string,
    imageCard: string,
}

type ImmobileProps = {
    allImobiles: Immobile[]
}


export default function ResearchAdmin({ allImobiles }: ImmobileProps) {

    const MAX_DESCRIPTION_TITLE_LENGTH = 30

    const [addAndUpdateModalShow, setAddAndUpdateModalShow] = useState(false)
    const handleAddAndUpdateModalClose = () => setAddAndUpdateModalShow(false)

    const [immobileTitle, setImmobileTitle] = useState('')
    const [immobileFootage, setImmobileFootage] = useState('')
    const [immobileBedrooms, setImmobileBedrooms] = useState('')
    const [immobileBathrooms, setImmobileBathrooms] = useState('')
    const [immobileVacancies, setImmobileVacancies] = useState('')
    const [immobileDescriptionTitle, setImmobileDescriptionTitle] = useState('')
    const [immobileDescription, setImmobileDescription] = useState('')
    const [immobileStreet, setImmobileStreet] = useState('')
    const [immobileNumber, setImmobileNumber] = useState('')
    const [immobileState, setImmobileState] = useState('')
    const [immobileDistrict, setImmobileDistrict] = useState('')
    const [immobileCity, setImmobileCity] = useState('')
    const [immobileFeatures, setImmobileFeatures] = useState('')
    const [immobileNearbyTrainsAndSubways, setImmobileNearbyTrainsAndSubways] = useState('')
    const [immobileStatus, setImmobileStatus] = useState('')
    const [immobilePrice, setImmobilePrice] = useState('')

    async function addImmobile() {
        if (immobileTitle == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileFootage == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileBedrooms == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileBathrooms == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileVacancies == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileDescriptionTitle == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileDescription == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileStreet == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileNumber == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileState == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileDistrict == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileCity == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileFeatures == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileNearbyTrainsAndSubways == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobileStatus == '') {
            alert('Preencha todos os campos para salvar!')
        } else if (immobilePrice == '') {
            alert('Preencha todos os campos para salvar!')
        } else {
            let immobileUUID = await utilities.getUUID()
            let immobileCode = await utilities.getCode()
            let immobileSlug = await utilities.getSlug(immobileTitle)
            let immobileFullAddress = `${immobileStreet}, ${immobileNumber} - ${immobileDistrict} - ${immobileCity} - ${immobileState}`

            let date: Date = new Date();
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
                "images": [
                    "https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/0e40dac3aa7278f0dad85ff7838f345d.jpg"
                ],
                "footage": immobileFootage,
                "bedrooms": immobileBedrooms,
                "bathrooms": immobileBathrooms,
                "vacancies": immobileVacancies,
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
                "createdAt": immobileCreatedAt
            }

            await firebaseController.insertImmobile(immobileToSave)
            setAddAndUpdateModalShow(false)
            alert('Imóvel salvo!')
            window.location.reload()
        }
    }

    async function removeImmobile(idx) {
        await firebaseController.removeImmobileById(idx)
        window.location.reload()
        alert('Imóvel removido!')
    }

    async function updateImmobile(idx) {
        let immobileToUpdate = await firebaseController.getImmobileByIdToUpdate(idx)
    }


    return (
        <>
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

                    <div className={styles.status}>
                        <div className={styles.statusImmobiles}>
                            <label>Status do Imóvel</label>
                            <div className={styles.statusOptions}>
                                <input type="checkbox" id="naPlanta" name="naPlanta" value="naPlanta" />
                                <label htmlFor="naPlanta"> na planta</label><br />
                                <input type="checkbox" id="emConstrucao" name="emConstrucao" value="emConstrucao" />
                                <label htmlFor="emConstrucao"> em construção</label><br />
                                <input type="checkbox" id="prontoParaMorar" name="prontoParaMorar" value="prontoParaMorar" />
                                <label htmlFor="prontoParaMorar"> pronto pra morar</label>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.immobilesContent}>

                    <div className={styles.immobileList}>
                        <div className={styles.listOptions}>
                            <h1>{allImobiles.length} Imóveis Encontrados</h1>
                            <span>
                                <button onClick={() => setAddAndUpdateModalShow(true)}><MdLibraryAdd size={40} /></button>
                            </span>
                        </div>
                        <div>
                            <ul>
                                {allImobiles.map((immobile) => {
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
                                                    <h2>{immobile.price}</h2>
                                                    <p><b>{immobile.footage}</b>m² <b>{immobile.bedrooms}</b> Quartos <b>{immobile.bathrooms}</b> Banheiros <b>{immobile.vacancies}</b> Vaga</p>
                                                    {immobile.descriptionTitle.length > MAX_DESCRIPTION_TITLE_LENGTH ?
                                                        <p>{`${immobile.descriptionTitle.substring(0, MAX_DESCRIPTION_TITLE_LENGTH)}...`}</p> :
                                                        <p>{immobile.descriptionTitle}</p>}
                                                    <button onClick={() => setUpdateModalShow(true)}><FaPencilAlt size={25} /></button>
                                                    <button onClick={() => removeImmobile(immobile.id)}><FaTrashAlt size={25} /></button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                </div>

            </div>

            <Footer />

            {/* ADD AND UPDATE MODAL */}
            <Modal
                show={addAndUpdateModalShow}
                backdrop="static"
                size="lg"
            >
                <Modal.Header>
                    { }
                    <Modal.Title>Inserir Novo Imóvel</Modal.Title>
                    <Modal.Title>Atualizar Imóvel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Digite o título do imóvel..." onChange={event => setImmobileTitle(event.target.value)} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Área</Form.Label>
                                    <Form.Control type="text" placeholder="Digite a área (M²) do imóvel..." onChange={event => setImmobileFootage(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quartos</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o número de quartos do imóvel..." onChange={event => setImmobileBedrooms(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Banheiros</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o número de banheiros do imóvel..." onChange={event => setImmobileBathrooms(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Vagas</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o número de vagas do imóvel..." onChange={event => setImmobileVacancies(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Título da Descrição</Form.Label>
                                <Form.Control type="text" placeholder="Digite o título da descrição do imóvel..." onChange={event => setImmobileDescriptionTitle(event.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} type="text" placeholder="Digite a descrição do imóvel..." onChange={event => setImmobileDescription(event.target.value)} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rua</Form.Label>
                                    <Form.Control type="text" placeholder="Digite a rua do imóvel..." onChange={event => setImmobileStreet(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control type="text" placeholder="Ex: 201..." onChange={event => setImmobileNumber(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control type="text" placeholder="Ex: MG..." onChange={event => setImmobileState(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Bairro</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o bairro do imóvel..." onChange={event => setImmobileDistrict(event.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Control type="text" placeholder="Digite a cidade do imóvel..." onChange={event => setImmobileCity(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Características</Form.Label>
                                <Form.Control as="textarea" rows={4} type="text" placeholder="Digite as características do imóvel separando por vírgulas. Ex: Piscina, Acadêmia, Playground, Churrasqueira..." onChange={event => setImmobileFeatures(event.target.value)} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Trens e Metrôs Próximos</Form.Label>
                                <Form.Control as="textarea" rows={4} type="text" onChange={event => setImmobileNearbyTrainsAndSubways(event.target.value)} placeholder={`Digite: "nome da estação" + "-" + "distacia em km". Caso tenha mais de uma estação, separe por vígula. Ex: Estação General Miguel Costa - 1.5km, Estação Quitaúna - 1.8km...`} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Label className="mb-3">Status do Imóvel</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Check inline name="status" type="radio" label="Na Planta" onChange={() => setImmobileStatus("Na Planta")} />
                                <Form.Check inline name="status" type="radio" label="Em Construção" onChange={() => setImmobileStatus("Em Construção")} />
                                <Form.Check inline name="status" type="radio" label="Pronto pra Morar" onChange={() => setImmobileStatus("Pronto pra Morar")} />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Col xl={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preço do Imóvel</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o valor (R$) do imóvel" onChange={event => setImmobilePrice(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Observações</Form.Label>
                                <Form.Control as="textarea" rows={4} type="text" placeholder="Digite as observações do imóvel..." onChange={event => setImmobileFeatures(event.target.value)} />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleAddAndUpdateModalClose}>Fechar</Button>
                    <Button variant="success" onClick={() => addImmobile()}>Salvar</Button>

                    <Button variant="success" onClick={handleUpdateModalClose}>Atualizar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

// ----------------------------------------------------------------------------------------------------

export const getStaticProps: GetStaticProps = async () => {
    const allImobiles = await firebaseController.getAllImmobiles()

    return {
        props: {
            allImobiles,
        },
        revalidate: 60 * 60 * 24
    }
}