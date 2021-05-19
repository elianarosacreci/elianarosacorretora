import styles from './home.module.scss'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'

import { Footer } from '../components/Footer'


export default function Home() {

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
        <div>
          <h1>Imóveis Mais Populares</h1>
          <ul>
            <li>
              <Link href='/immobiles/immobile'>
                <a>
                  <div className={styles.immobileCards}>
                    <Image
                      width={500}
                      height={500}
                      src="/example-2.jpg"
                      objectFit="cover"
                    />
                    <div className={styles.container}>
                      <h2>R$ 275.898</h2>
                      <p><b>67</b> m² <b>2</b> Quartos <b>2</b> Banheiros <b>1</b> Vaga</p>
                      <p>Apartamento com 2 Quartos à Venda na Rua Bonita e Bem Segura, no Bairro da Cidade do Estado</p>
                      <span>VER OS DETALHES →</span>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <div className={styles.immobileCards}>
                <Image
                  width={500}
                  height={500}
                  src="/example-3.jpg"
                  objectFit="cover"
                />
                <div className={styles.container}>
                  <h2>R$ 275.898</h2>
                  <p><b>67</b> m² <b>2</b> Quartos <b>2</b> Banheiros <b>1</b> Vaga</p>
                  <p>Apartamento com 2 Quartos à Venda na Rua Bonita e Bem Segura, no Bairro da Cidade do Estado</p>
                  <span>VER OS DETALHES →</span>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.immobileCards}>
                <Image
                  width={500}
                  height={500}
                  src="/example-1.jpg"
                  objectFit="cover"
                />
                <div className={styles.container}>
                  <h2>R$ 275.898</h2>
                  <p><b>67</b> m² <b>2</b> Quartos <b>2</b> Banheiros <b>1</b> Vaga</p>
                  <p>Apartamento com 2 Quartos à Venda na Rua Bonita e Bem Segura, no Bairro da Cidade do Estado</p>
                  <span>VER OS DETALHES →</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h1>Preços Atraentes</h1>
          <ul>
            <li>
              <div className={styles.immobileCards}>
                <Image
                  width={500}
                  height={500}
                  src="/example-1.jpg"
                  objectFit="cover"
                />
                <div className={styles.container}>
                  <h2>R$ 275.898</h2>
                  <p><b>67</b> m² <b>2</b> Quartos <b>2</b> Banheiros <b>1</b> Vaga</p>
                  <p>Apartamento com 2 Quartos à Venda na Rua Bonita e Bem Segura, no Bairro da Cidade do Estado</p>
                  <span>VER OS DETALHES →</span>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.immobileCards}>
                <Image
                  width={500}
                  height={500}
                  src="/example-2.jpg"
                  objectFit="cover"
                />
                <div className={styles.container}>
                  <h2>R$ 275.898</h2>
                  <p><b>67</b> m² <b>2</b> Quartos <b>2</b> Banheiros <b>1</b> Vaga</p>
                  <p>Apartamento com 2 Quartos à Venda na Rua Bonita e Bem Segura, no Bairro da Cidade do Estado</p>
                  <span>VER OS DETALHES →</span>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.immobileCards}>
                <Image
                  width={500}
                  height={500}
                  src="/example-3.jpg"
                  objectFit="cover"
                />
                <div className={styles.container}>
                  <h2>R$ 275.898</h2>
                  <p><b>67</b> m² <b>2</b> Quartos <b>2</b> Banheiros <b>1</b> Vaga</p>
                  <p>Apartamento com 2 Quartos à Venda na Rua Bonita e Bem Segura, no Bairro da Cidade do Estado</p>
                  <span>VER OS DETALHES →</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h1>Acabaram de Chegar</h1>
          <ul>
            <li>
              <div className={styles.immobileCards}>
                <Image
                  width={500}
                  height={500}
                  src="/example-3.jpg"
                  objectFit="cover"
                />
                <div className={styles.container}>
                  <h2>R$ 275.898</h2>
                  <p><b>67</b> m² <b>2</b> Quartos <b>2</b> Banheiros <b>1</b> Vaga</p>
                  <p>Apartamento com 2 Quartos à Venda na Rua Bonita e Bem Segura, no Bairro da Cidade do Estado</p>
                  <span>VER OS DETALHES →</span>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.immobileCards}>
                <Image
                  width={500}
                  height={500}
                  src="/example-1.jpg"
                  objectFit="cover"
                />
                <div className={styles.container}>
                  <h2>R$ 275.898</h2>
                  <p><b>67</b> m² <b>2</b> Quartos <b>2</b> Banheiros <b>1</b> Vaga</p>
                  <p>Apartamento com 2 Quartos à Venda na Rua Bonita e Bem Segura, no Bairro da Cidade do Estado</p>
                  <span>VER OS DETALHES →</span>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.immobileCards}>
                <Image
                  width={500}
                  height={500}
                  src="/example-2.jpg"
                  objectFit="cover"
                />
                <div className={styles.container}>
                  <h2>R$ 275.898</h2>
                  <p><b>67</b> m² <b>2</b> Quartos <b>2</b> Banheiros <b>1</b> Vaga</p>
                  <p>Apartamento com 2 Quartos à Venda na Rua Bonita e Bem Segura, no Bairro da Cidade do Estado</p>
                  <span>VER OS DETALHES →</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </section>

      <Footer />
    </div >
  )
}
