import styles from './home.module.scss';

import { Select, Input, Space } from 'antd';
const { Option } = Select;
const { Search } = Input;


export default function Home() {

  function acquisitionSelectOnChange(value) {
    console.log(`Acquisition Select: ${value}`);
  }

  function immobileKindSelectOnChange(value) {
    console.log(`Immobile Kind Select: ${value}`);
  }

  function onSearch(value) {
    console.log(`Immobile Kind Select: ${value}`);
  }

  return (
    <div className={styles.homepage}>

      <section className={styles.imageHome}>

        <h1>Encontre o seu próximo imóvel!</h1>

        <div className={styles.fields}>
          <Select style={{ width: 130 }} defaultValue="comprar" onChange={acquisitionSelectOnChange}>
            <Option value="comprar">Comprar</Option>
            <Option value="alugar">Alugar</Option>
          </Select>

          <Select style={{ width: 150 }} defaultValue="apartamento" onChange={immobileKindSelectOnChange}>
            <Option value="apartamento">Apartamento</Option>
            <Option value="casa">Casa   </Option>
          </Select>

          <Space direction="vertical">
            <Search style={{ width: 380 }} placeholder="Digite um bairro ou cidade" onSearch={onSearch} enterButton="Buscar" />
          </Space>
        </div>

      </section>


    </div>
  )
}
