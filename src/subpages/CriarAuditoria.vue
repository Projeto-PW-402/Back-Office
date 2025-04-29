<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'

const selectedUsers = ref<number[]>([])
const selectedMaterials = ref<number[]>([])

const users = ref([
  {
    id: 1,
    nome: 'João Silva',
    morada: 'Rua das Flores, Lisboa',
    dataNascimento: '1985-06-15',
    especialidade: 'Cardiologia',
    email: 'joao.silva@example.com',
    telemovel: '912345678',
  },
  {
    id: 2,
    nome: 'Ana Martins',
    morada: 'Av. Central, Porto',
    dataNascimento: '1990-03-22',
    especialidade: 'Dermatologia',
    email: 'ana.martins@example.com',
    telemovel: '913456789',
  },
  {
    id: 3,
    nome: 'Carlos Oliveira',
    morada: 'Rua do Sol, Faro',
    dataNascimento: '1982-11-05',
    especialidade: 'Neurologia',
    email: 'carlos.oliveira@example.com',
    telemovel: '914567890',
  },
  {
    id: 4,
    nome: 'Sofia Rocha',
    morada: 'Estrada da Serra, Braga',
    dataNascimento: '1995-01-30',
    especialidade: 'Pediatria',
    email: 'sofia.rocha@example.com',
    telemovel: '915678901',
  },
  {
    id: 5,
    nome: 'Miguel Costa',
    morada: 'Rua Nova, Coimbra',
    dataNascimento: '1988-07-19',
    especialidade: 'Ortopedia',
    email: 'miguel.costa@example.com',
    telemovel: '916789012',
  },
  {
    id: 6,
    nome: 'Inês Almeida',
    morada: 'Av. da Liberdade, Lisboa',
    dataNascimento: '1993-09-25',
    especialidade: 'Ginecologia',
    email: 'ines.almeida@example.com',
    telemovel: '917890123',
  },
  {
    id: 7,
    nome: 'Pedro Fernandes',
    morada: 'Rua das Laranjeiras, Porto',
    dataNascimento: '1979-04-12',
    especialidade: 'Psiquiatria',
    email: 'pedro.fernandes@example.com',
    telemovel: '918901234',
  },
  {
    id: 8,
    nome: 'Rita Sousa',
    morada: 'Largo do Carmo, Évora',
    dataNascimento: '1987-10-08',
    especialidade: 'Oftalmologia',
    email: 'rita.sousa@example.com',
    telemovel: '919012345',
  },
  {
    id: 9,
    nome: 'Tiago Nunes',
    morada: 'Rua do Mercado, Leiria',
    dataNascimento: '1991-12-02',
    especialidade: 'Urologia',
    email: 'tiago.nunes@example.com',
    telemovel: '910123456',
  },
  {
    id: 10,
    nome: 'Cláudia Pinto',
    morada: 'Av. dos Aliados, Porto',
    dataNascimento: '1986-08-17',
    especialidade: 'Pedreido',
    email: 'claudia.pinto@example.com',
    telemovel: '911234567',
  },
])
const materiais = ref([
  {
    id: 1,
    nome: 'Tinta Acrílica',
    tipo: 'Material',
    descricao: 'Tinta branca para interiores',
    quantidade: 10,
    preco: '15.50€',
  },
  {
    id: 2,
    nome: 'Pincel Médio',
    tipo: 'Ferramenta',
    descricao: 'Pincel de cerdas sintéticas',
    quantidade: 25,
    preco: '3.20€',
  },
  {
    id: 3,
    nome: 'Rolo de Pintura',
    tipo: 'Ferramenta',
    descricao: 'Rolo para superfícies lisas',
    quantidade: 12,
    preco: '5.50€',
  },
  {
    id: 4,
    nome: 'Fita de Pintura',
    tipo: 'Acessório',
    descricao: 'Fita adesiva azul, 50m',
    quantidade: 18,
    preco: '2.00€',
  },
  {
    id: 5,
    nome: 'Lixa Grão 120',
    tipo: 'Material',
    descricao: 'Lixa fina para acabamentos',
    quantidade: 30,
    preco: '0.80€',
  },
  {
    id: 6,
    nome: 'Betume',
    tipo: 'Material',
    descricao: 'Betume para madeira',
    quantidade: 6,
    preco: '4.70€',
  },
  {
    id: 7,
    nome: 'Espátula Inox',
    tipo: 'Ferramenta',
    descricao: 'Espátula 10cm cabo plástico',
    quantidade: 14,
    preco: '3.60€',
  },
  {
    id: 8,
    nome: 'Luvas Nitrilo',
    tipo: 'Proteção',
    descricao: 'Luvas descartáveis, tamanho M',
    quantidade: 100,
    preco: '0.15€',
  },
  {
    id: 9,
    nome: 'Óculos de Proteção',
    tipo: 'Proteção',
    descricao: 'Óculos antiembaciamento',
    quantidade: 20,
    preco: '6.90€',
  },
  {
    id: 10,
    nome: 'Máscara FFP2',
    tipo: 'Proteção',
    descricao: 'Máscara de proteção respiratória',
    quantidade: 50,
    preco: '1.10€',
  },
])
</script>
<template>
  <div class="main-container">
    <Navbar :page="3" :disable="true" />
    <div class="inputs-container">
      <div class="top-inputs">
        <div class="top-left-cotainer">
          <div class="little-title">Pedido</div>
          <form>
            <div class="tl-top-form">
              <div class="nome-container tl-input">
                <input type="text" id="nome" placeholder="" />
                <label class="nome-label" for="nome">Nome</label>
              </div>
              <div class="origem-container tl-input">
                <input type="text" id="origem" placeholder="" />
                <label class="origem-label" for="origem">Origem</label>
              </div>
            </div>
            <div class="tipo-container tl-input">
              <input type="text" id="tipo" placeholder="" />
              <label class="tipo-label" for="tipo">Tipo</label>
            </div>
            <div class="descricao-container tl-input">
              <input type="text" id="descricao" placeholder="" />
              <label class="descricao-label" for="descricao">Descrição</label>
            </div>
          </form>
        </div>
        <div class="top-right-cotainer">
          <div class="little-title">Equipa</div>
          <table class="tr-table">
            <thead class="tr-table-header">
              <tr>
                <th class="tr-h">Selecionar</th>
                <th class="tr-h">Trabalhador</th>
              </tr>
            </thead>
          </table>
          <div class="tr-body-scroll">
            <table class="tr-table">
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td
                    class="tr-d"
                    :style="{ backgroundColor: user.id % 2 === 0 ? 'transparent' : '#d3dce6' }"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :value="user.id"
                      v-model="selectedUsers"
                    />
                  </td>
                  <td
                    class="tr-d"
                    :style="{ backgroundColor: user.id % 2 === 0 ? 'transparent' : '#d3dce6' }"
                  >
                    {{ user.nome }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="bottom-inputs">
        <div class="bottom-left-container">
          <div class="little-title">Materiais</div>
          <table class="bl-table">
            <thead class="bl-table-header">
              <tr>
                <th class="bl-h">Material</th>
                <th class="bl-h">Quantidade</th>
              </tr>
            </thead>
          </table>
          <div class="bl-body-scroll">
            <table class="bl-table">
              <tbody>
                <tr v-for="material in materiais" :key="material.id">
                  <td
                    class="bl-d"
                    :style="{ backgroundColor: material.id % 2 === 0 ? 'transparent' : '#d3dce6' }"
                  >
                    {{ material.nome }}
                  </td>
                  <td
                    class="bl-d"
                    :style="{ backgroundColor: material.id % 2 === 0 ? 'transparent' : '#d3dce6' }"
                  >
                    <input type="number" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="bottom-right-container">
          <div class="little-title">Finalizar</div>
          <form>
            <div class="data-container">
              <input type="date" id="data" placeholder="xx / xx / xx" />
              <label class="data-label" for="data">Data</label>
            </div>
            <div class="inicio-container">
              <input type="time" id="inicio" placeholder="" />
              <label class="inicio-label" for="inicio">Inicio</label>
            </div>
            <button type="submit" class="btn btn-primary">Finalizar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: #e6e6e6;
  font-family: 'Sofia Sans', 'Poppins', sans-serif;
}
.inputs-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: blue; */
  margin: 4.5rem;
  padding: 3rem;
}

.top-inputs {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  /* background-color: blue; */
}
.bottom-inputs {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  /* background-color: blue; */
}

/* Top left Container */
.top-left-cotainer {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  /* background-color: wheat; */
  padding: 2rem;
  margin-left: 2rem;
}

.little-title {
  font-size: 0.75rem;
  font-weight: 600;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* background-color: lightblue; */
  gap: 2rem;
}
.tl-top-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tl-input {
  display: flex;
  flex-direction: column-reverse;
}
.nome-container {
  width: 65%;
}
.nome-container input:focus + .nome-label {
  color: #825a32;
}
.origem-container input:focus + .origem-label {
  color: #825a32;
}
.tipo-container {
  width: 50%;
}
.tipo-container input:focus + .tipo-label {
  color: #825a32;
}
.descricao-container input {
  height: 4rem;
}
.descricao-container input:focus + .descricao-label {
  color: #825a32;
}

.top-left-cotainer label {
  font-size: 1.1rem;
  font-weight: 500;
}
.top-left-cotainer input {
  border: 2px solid black;
  border-radius: 6px;
  min-height: 2rem;
  outline: none;
}
.top-left-cotainer input:focus {
  border-color: #825a32;
}
/* Top Right Container */
.top-right-cotainer {
  /* display: flex;
    flex-direction: column;
    align-items: center; */
  width: 50%;
  height: 100%;
  /* background-color: wheat; */
  padding: 2rem;
  margin-right: 2rem;
}
.tr-table {
  width: 100%;
  /* height: auto; */
  overflow-y: scroll;
  border: 2px solid black;
  table-layout: fixed;
}
.tr-table-header tr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.tr-table-header .tr-h {
  position: sticky;
  top: 0;
  padding-block: 0.5rem;
  width: 100%;
  text-align: center;
}
.tr-table-header .tr-h:first-child {
  width: 40%;
}
.tr-body-scroll {
  max-height: 240px;
  overflow-y: auto;
  border: 2px solid black;
  border-top: none;
}
.tr-body-scroll .tr-table {
  border: none;
}
.tr-body-scroll .tr-table tbody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
}
.tr-body-scroll .tr-table tr {
  display: flex;
  width: 100%;
}
.tr-body-scroll .tr-table .tr-d {
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  font-weight: 500;
  font-size: 18px;
  width: 100%;
  /* border-bottom: 2px solid black; */
}
.tr-body-scroll .tr-table .tr-d:first-child {
  width: 40%;
}

.form-check-input {
  width: 20px;
  height: 20px;
  border: 2px solid #000;
}

.form-check-input:focus {
  box-shadow: none !important;
}

.form-check-input:checked {
  outline: none;
  border-color: transparent;
}
/* Bottom Left */
.bottom-left-container {
  /* display: flex;
    flex-direction: column;
    align-items: center; */
  width: 50%;
  height: 100%;
  /* background-color: wheat; */
  padding: 2rem;
  margin-left: 2rem;
  margin-bottom: 2rem;
}
.bl-table {
  width: 100%;
  /* height: auto; */
  overflow-y: scroll;
  border: 2px solid black;
  table-layout: fixed;
}
.bl-table-header tr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.bl-table-header .bl-h {
  position: sticky;
  top: 0;
  padding-block: 0.5rem;
  width: 100%;
  text-align: center;
}
.bl-table-header .bl-h:first-child {
  width: 90%;
}
.bl-body-scroll {
  max-height: 240px;
  overflow-y: auto;
  border: 2px solid black;
  border-top: none;
}
.bl-body-scroll .bl-table {
  border: none;
}
.bl-body-scroll .bl-table tbody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
}
.bl-body-scroll .bl-table tr {
  display: flex;
  width: 100%;
}
.bl-body-scroll .bl-table .bl-d {
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  font-weight: 500;
  font-size: 18px;
  width: 100%;
  /* border-bottom: 2px solid black; */
}
.bl-body-scroll .bl-table .bl-d input {
  width: 6rem;
  height: 1.8rem;
  border: 1px solid black;
  border-radius: 6px;
  text-align: center;
  outline: none;
}
.bl-body-scroll .bl-table .bl-d input:focus {
  border: 1px solid #d7a871;
  -moz-appearance: textfield;
}
.bl-body-scroll .bl-table .bl-d input::-webkit-outer-spin-button,
.bl-body-scroll .bl-table .bl-d input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.bl-body-scroll .bl-table .bl-d:first-child {
  width: 90%;
}

/* Bottom Right */

.bottom-right-container {
  width: 50%;
  height: 100%;
  /* background-color: wheat; */
  padding: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
}

.bottom-right-container form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;

  font-weight: 500;
  font-size: 1.1rem;
}
.data-container {
  display: flex;
  width: 30%;
  flex-direction: column-reverse;
}
.data-container input {
  width: 100%;
  height: 2rem;
  text-align: center;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
}
.data-container input:focus {
    color: #d7a871;
    border: 1px solid #d7a871;
}
.inicio-container {
  display: flex;
  width: 30%;
  flex-direction: column-reverse;
}

.inicio-container input {
  width: 100%;
  height: 2rem;
  text-align: center;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
}
.inicio-container input:focus {
  border: 1px solid #d7a871;
}

.bottom-right-container button {
  align-self: center;
  width: 10rem;
  color: black;
  background-color: #d7a871;
  border: 1px solid #745c3e;
}
.bottom-right-container button:active {
  background-color: #745c3e;
  border: 1px solid #d7a871;
}

@media screen and (max-width: 1700px) {
  .inputs-container {
    display: flex;
    width: 100%;
    margin: 2.5rem;
    padding: 2rem;
  }
  .nome-container {
    width: 55%;
  }
}
@media screen and (max-width: 1400px) {
  .inputs-container {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .top-inputs {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50%;
    /* background-color: blue; */
  }
  .nome-container {
    width: 55%;
}
  .bottom-inputs {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50%;
    /* background-color: blue; */
  }
  .top-left-cotainer {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
  }
  .top-right-cotainer {
    width: 50%;
    height: 100%;
  }
}

/* Scroll Bar */
.tr-body-scroll::-webkit-scrollbar {
  width: 10px;
}

/* Fundo da scrollbar */
.tr-body-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 0px;
}

/* Parte deslizável */
.tr-body-scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 0px;
  border: 2px solid #f0f0f0;
}

/* Hover */
.tr-body-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
