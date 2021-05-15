import styles from './home.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'


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
        <h1>Encontre o seu imóvel!</h1>

        {researchFields == true ?
          <div className={styles.researchFields}>
            <select
              style={{ width: 120 }}
              defaultValue="comprar"
              onChange={event => setAcquisitionKindSelect(event.target.value)}
            >
              <option value="comprar">Comprar</option>
              <option value="alugar">Alugar</option>
            </select>

            <select
              style={{ width: 170 }}
              defaultValue="apartamento"
              onChange={event => setImmobileKindSelect(event.target.value)}
            >
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa   </option>
            </select>

            <input
              style={{ width: 350 }}
              type="text"
              placeholder="Digite o nome de um bairro ou cidade..."
              onChange={event => setDistrictAndCity(event.target.value)}
            />

            <button className={styles.research} type="button" onClick={onResearch}>Buscar</button>
          </div>
          :
          <div className={styles.researchCode}>
            <input
              style={{ width: 320 }}
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

    </div>
  )
}
