<script setup lang="ts">
    import { UserPlus } from 'lucide-vue-next'
    const props = defineProps<{
        visible: boolean
    }>()
</script>
<template>
  <div class="main-container" :style="{ display: props.visible ? 'flex' : 'none' }">
    <div class="title">Adicionar Utilizador</div>
    <form>
        <div class="name-container">
            <input type="text" id="name" placeholder="" />
            <label class="name-label" for="name">Nome</label>
        </div>
        <div class="morada-container">
            <input type="text" id="morada" placeholder="" />
            <label class="morada-label" for="morada">Morada</label>
        </div>
        <div class="email-container">
            <input type="email" id="email" placeholder="" />
            <label class="email-label" for="email">Email</label>
        </div>
      <div class="number-inputs">
        <div class="data-container">
          <input type="date" id="dataNascimento" placeholder="xx / xx / xx" />
          <label class="data-label" for="dataNascimento">Data de Nascimento</label>
        </div>
        <div class="number-container">
            <select class="form-select" name="countries">
              <option value="PT">PT</option>
              <option value="ES">ES</option>
              <option value="FR">FR</option>
            </select>
          <div class="tele-container" id="number">
            <input type="number" placeholder="xxx.xxx.xxx" />
            <label class="number-label" for="number">Número Telemóvel</label>
          </div>
        </div>
      </div>
      <div class="especialidade-container">
        <input type="text" id="especialidade" placeholder="" />
        <label class="especialidade-label" for="especialidade">Especialidade</label>
        </div>
    </form>
    <button type="submit">Adicionar<UserPlus width="22" height="22"/></button>
  </div>
</template>
<style scoped>

.main-container {
  position: absolute;
  top: calc(50% - 275px);
  left: calc(50% - 50px);
  width: 500px;
  height: 550px;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  font-family: 'Sofia Sans';
  font-optical-sizing: auto;
}
.title {
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0px 0px 20px;
}
form {
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin-left: 20px;
  gap: 20px;
}

form label {
  font-size: 16px;
  font-weight:  700;
  margin-bottom: 5px;
}

form input {
  border: 2px solid black;
  border-radius: 6px;
  height: 35px;
}

form input:focus + label {
  color: #825A32;
}

form input:focus {
  outline: none;
  border-color: #825A32;
}

.name-container {
  display: flex;
  flex-direction: column-reverse;
}

.name-container input:focus + .name-label{
    color: #825A32;
}

.morada-container {
  display: flex;
  flex-direction: column-reverse;
}
.morada-container input:focus + .morada-label{
    color: #825A32;
}

.email-container {
  display: flex;
  flex-direction: column-reverse;
}
.email-container input:focus + .email-label{
    color: #825A32;
}

.especialidade-container {
  display: flex;
  flex-direction: column-reverse;
}
.especialidade-container input:focus + .especialidade-label{
    color: #825A32;
}

.number-inputs {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.data-container {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.data-container input {
  text-align: center;
}
.number-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:flex-end;
  width: 100%;
} 

.number-container select {
    height: 35px;
    width: fit-content;
    border: none;
}
.number-container select:focus {
    box-shadow: none;
}

.tele-container {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
}

.tele-container input[type='number'] {
  text-align: center;
  min-width: 215px;
  letter-spacing: 5px;
} 

.tele-container input:focus + .number-label{
    color: #825A32;
}


button[type='submit'] {
  width: 150px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  left: calc(90% - 130px);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border: 2px solid black;
  border-radius: 6px;
  background-color: #d7a871;

  font-weight: 600;
  font-size: 1.3rem;

  transition:all 0.2s cubic-bezier(0.47, 0, 0.745, 0.715);
}

button[type='submit']:hover {
  background-color: #d7a871;
  color: white;
  cursor: pointer;
  transform: scale(1.05);
}

</style>
