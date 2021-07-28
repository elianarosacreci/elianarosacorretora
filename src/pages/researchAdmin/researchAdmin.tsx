import styles from './researchAdmin.module.scss'
import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import firebaseController from '../../services/firebaseController'

import { Footer } from '../../components/Footer'
import { GetStaticProps } from 'next'

import { Button, Modal } from 'react-bootstrap'

import { MdLibraryAdd } from 'react-icons/md'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'


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

    const MAX_DESCRIPTION_TITLE_LENGTH = 30;

    const [addModalShow, setAddModalShow] = useState(false);
    const handleAddModalClose = () => setAddModalShow(false);

    const [updateModalShow, setUpdateModalShow] = useState(false);
    const handleUpdateModalClose = () => setUpdateModalShow(false);

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
                                <button onClick={() => setAddModalShow(true)}><MdLibraryAdd size={40} /></button>
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
                                                    <button><FaTrashAlt size={25} onClick={() => firebaseController.removeImmobileById(immobile.id)} /></button>
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

            {/* ADD MODAL */}
            <Modal
                show={addModalShow}
                backdrop="static"
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>Inserir Novo Imóvel</Modal.Title>
                </Modal.Header>
                <Modal.Body>Incluir formulário para preencher os dados do imóvel...</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleAddModalClose}>Fechar</Button>
                    <Button variant="success" onClick={handleAddModalClose}>Salvar</Button>
                </Modal.Footer>
            </Modal>

            {/* UPDATE MODAL */}
            <Modal
                show={updateModalShow}
                backdrop="static"
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>Atualizar Imóvel</Modal.Title>
                </Modal.Header>
                <Modal.Body>Incluir formulário com dados do imóvel para atualizar...</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleUpdateModalClose}>Fechar</Button>
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