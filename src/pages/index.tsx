import styles from './home.module.scss'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Image from 'next/image'
import { GetStaticProps } from 'next'

import firebaseController from '../services/firebaseController'

import { Footer } from '../components/Footer'


type Immobiles = {
  id: string
  slug: string
  price: string
  footage: string
  bedrooms: string
  bathrooms: string
  vacancies: string
  descriptionTitle: string
  imageCard: string
}

type HomeProps = {
  attractivePricesList: Immobiles[]
  justArrivedList: Immobiles[]
  mostPopularsList: Immobiles[]
}


export default function Home({ attractivePricesList, justArrivedList, mostPopularsList }: HomeProps) {

  const MAX_DESCRIPTION_TITLE_LENGTH = 30

  const [acquisitionKindSelect, setAcquisitionKindSelect] = useState('')
  const [immobileKindSelect, setImmobileKindSelect] = useState('')
  const [districtAndCity, setDistrictAndCity] = useState('')
  const [codeImmobile, setCodeImmobile] = useState('')

  const [researchFields, setResearchFields] = useState(true)
  function onResearchFieldsOrResearchCode() {
    if (researchFields == true) {
      setResearchFields(false)
    } else {
      setResearchFields(true)
    }
  }

  const router = useRouter()
  const preventDefault = f => e => {
    e.preventDefault()
    f(e)
  }
  const onResearch = preventDefault(() => {
    // router.push({
    //   pathname: '/advancedSearch',
    //   query: formValues,
    // })
  })


  return (
    <div className={styles.homepage}>

      <section className={styles.imageHome}>
        <h1>Encontre o seu próximo imóvel!</h1>

        {researchFields == true ?
          <div className={styles.researchFields}>
            <select
              style={{ width: 150 }}
              defaultValue="comprar"
              onChange={event => setAcquisitionKindSelect(event.target.value)}
            >
              <option value="comprar">Comprar</option>
              <option value="alugar">Alugar</option>
            </select>

            <select
              style={{ width: 180 }}
              defaultValue="apartamento"
              onChange={event => setImmobileKindSelect(event.target.value)}
            >
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa   </option>
            </select>

            <input
              style={{ width: 380 }}
              type="text"
              placeholder="Digite o nome de um bairro ou cidade..."
              onChange={event => setDistrictAndCity(event.target.value)}
            />

            <button className={styles.research} type="button" onClick={onResearch}>Buscar</button>
          </div>
          :
          <div className={styles.researchCode}>
            <input
              style={{ width: 380 }}
              type="text"
              placeholder="Digite o código do imóvel..."
              onChange={event => setCodeImmobile(event.target.value)}
            />

            <button className={styles.research} type="button" onClick={onResearch}>Buscar</button>
          </div>}

        <button className={styles.researchFieldsOrResearchCode} type="button" onClick={onResearchFieldsOrResearchCode}>
          {researchFields == true ? <span>Buscar por código do imóvel →</span> : <span>← Buscar por localização</span>}
        </button>
      </section>

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

        <h1>Acabaram de Chegar</h1>
        <div>
          <ul>
            {justArrivedList.map((justArrived) => {
              return (
                <li key={justArrived.id}>
                  <a href={`/immobiles/${justArrived.slug}----${justArrived.id}`} target="_blank">
                    <div className={styles.immobileCards}>
                      <Image
                        width={500}
                        height={500}
                        src={justArrived.imageCard}
                        objectFit="cover"
                      />
                      <div className={styles.container}>
                        <h2>{justArrived.price}</h2>
                        <p><b>{justArrived.footage}</b>m² <b>{justArrived.bedrooms}</b> Quartos <b>{justArrived.bathrooms}</b> Banheiros <b>{justArrived.vacancies}</b> Vaga</p>
                        {justArrived.descriptionTitle.length > MAX_DESCRIPTION_TITLE_LENGTH ?
                          <p>{`${justArrived.descriptionTitle.substring(0, MAX_DESCRIPTION_TITLE_LENGTH)}...`}</p> :
                          <p>{justArrived.descriptionTitle}</p>}
                        <span>VER OS DETALHES →</span>
                      </div>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <h1>Mais Populares</h1>
        <div>
          <ul>
            {mostPopularsList.map((mostPopular) => {
              return (
                <li key={mostPopular.id}>
                  <a href={`/immobiles/${mostPopular.slug}----${mostPopular.id}`} target="_blank">
                    <div className={styles.immobileCards}>
                      <Image
                        width={500}
                        height={500}
                        src={mostPopular.imageCard}
                        objectFit="cover"
                      />
                      <div className={styles.container}>
                        <h2>{mostPopular.price}</h2>
                        <p><b>{mostPopular.footage}</b>m² <b>{mostPopular.bedrooms}</b> Quartos <b>{mostPopular.bathrooms}</b> Banheiros <b>{mostPopular.vacancies}</b> Vaga</p>
                        {mostPopular.descriptionTitle.length > MAX_DESCRIPTION_TITLE_LENGTH ?
                          <p>{`${mostPopular.descriptionTitle.substring(0, MAX_DESCRIPTION_TITLE_LENGTH)}...`}</p> :
                          <p>{mostPopular.descriptionTitle}</p>}
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
    </div >
  )
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------

export const getStaticProps: GetStaticProps = async () => {
  // TODO - Fazer validação para tratar retornos com erros ou vazios do Firebase

  const attractivePricesList = await firebaseController.getAttractivePrices()
  const justArrivedList = await firebaseController.getJustArrived()
  const mostPopularsList = await firebaseController.getMostPopular()
  return {
    props: {
      attractivePricesList,
      justArrivedList,
      mostPopularsList
    },
    revalidate: 60 * 60 * 24
  }
}