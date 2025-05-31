<script setup lang="ts">
import { fetchUserByEmail } from '@/services/userService'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  GoogleLogin,
  decodeCredential,
  googleAuthCodeLogin,
  googleTokenLogin,
} from 'vue3-google-login'

interface UserData {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  exp: number
  family_name: string
  given_name: string
  iat: number
  jti: string
  name: string
  nbf: number
  picture: string
}

interface data {
  email: string
  user: string
  id: number
}

interface error {
  message: string
  error: string
}

const router = useRouter()
const email = ref('')
const loginError = ref('')

async function confirmEmail() {
  let response = await fetchUserByEmail(email.value)

  if (typeof response === 'string' && response === 'Error') {
    loginError.value = 'Login não autorizado. Verifique o email.'
    return
  }

  response = response as data
  // Aqui response é do tipo do utilizador
  localStorage.setItem('email', response.email)
  localStorage.setItem('user', response.user)
  loginError.value = '' // Limpa erro se sucesso

  router.push({ path: '/dashboard' })
}

const login = async (response: any) => {
  const userData = decodeCredential(response.credential) as UserData
  //   console.log('Handle the userData', userData)
  const api_response = await fetchUserByEmail(userData.email)
  console.log('API' + api_response)
  console.log(loginError.value)
  if (api_response == 'Error') {
    loginError.value = 'Login não autorizado. Verifique o email.'
    return
  }
  loginError.value = ''
  localStorage.setItem('email', userData.email)
  localStorage.setItem('user', userData.name)

  router.push({ path: '/dashboard' })
}
</script>
<template>
  <div class="main-container">
    <div class="login-container">
      <div class="form-container">
        <h1>Sign in</h1>
        <form id="loginForm" @submit.prevent="confirmEmail">
          <div class="inputs-container">
            <div class="email-container">
              <input type="email" id="email" placeholder="Email" v-model="email" />
            </div>
            <p v-if="loginError" style="color: red; padding-top: 4px; font-size: small">
              {{ loginError }}
            </p>
            <!-- <div class="password-container">
              <input type="password" id="password" placeholder="Password" />
            </div> -->
          </div>
          <div class="button-container">
            <button type="submit">Log In</button>
          </div>
        </form>
        <div class="division-container">
          <div class="division-left"></div>
          <div class="division-center">Or</div>
          <div class="division-right"></div>
        </div>
        <div class="google-login-container">
          <GoogleLogin :callback="login" />
        </div>
      </div>
      <div class="logo-container">
        <img src="/logo.ico" />
        <h2>EyesEveryWhere</h2>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main-container {
  background: url('/fundo.jpeg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100dvh;
}
.login-container {
  position: absolute;
  top: calc(100% / 2 - 60dvh / 2);
  left: calc(100% / 2 - 35dvw / 2);
  background-color: rgb(255, 255, 255);
  width: 35dvw;
  min-width: 600px;
  height: 60dvh;
  min-height: 400px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  backdrop-filter: blur(10px);
}

.login-container h1 {
  font-family: Poppins, sans-serif;
  letter-spacing: 1px;
  text-align: center;
  color: black;
}

.form-container {
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* gap: 4rem; */
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  gap: 20px;
  padding: 20px;
  /* background-color: #d7a871; */
}
.inputs-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.email-container {
  display: flex;
  flex-direction: column-reverse;
  gap: 2px;
  /* width: 250px; */
}
.password-container {
  display: flex;
  flex-direction: column-reverse;
  gap: 2px;
}
.inputs-container input {
  height: 40px;
  border: none;
  border-radius: 2px;
  padding-inline: 10px;
  background-color: #ebebeb;
  font-family: Anaheim, sans-serif;
  outline: none;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: 20px;
  width: 100%;
  /* background-color: aqua; */
  height: fit-content;
}

.button-container button {
  border: none;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: white;
  border: 2px solid #d39247;

  font-family: Poppins, sans-serif;
}
.button-container button:hover {
  background-color: #d7a871;
  color: white;
  border-color: wheat;
}

.division-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.division-left {
  width: 100%;
  border: 1px solid rgb(157, 157, 157);
  border-radius: 10px;
}
.division-center {
  font-family:
    Sofia Sans,
    sans-serif;
  font-size: smaller;
  font-weight: 400;
}
.division-right {
  width: 100%;
  border: 1px solid rgb(157, 157, 157);
  border-radius: 10px;
}

.google-login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aquamarine; */
}
.google-login-container button {
  border: none;
  background: none;
}
.logo-container {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
  background-color: #d7a871;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-family:
    Sofia Sans,
    sans-serif;
  font-weight: 600;
  font-size: large;
}

.logo-container img {
  filter: contrast(0%);
}
</style>
