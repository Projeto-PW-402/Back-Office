<script setup lang="ts">
import { LogOut, User, LayoutDashboard, Monitor, Users, NotebookPen, Anvil } from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'

const props = defineProps<{
  page: number
  disable?: boolean
}>()

const user = localStorage.getItem('user')
const router = useRouter()

function signout() {
  localStorage.clear()
  router.push({ path: '/login' })
}
</script>

<template>
  <div class="navbar-container">
    <div class="navbar-buttons">
      <div class="navbar-logo">
        <img src="../assets/logo.png" alt="Logo" class="logo" width="145px" height="145px" />
        <div class="navbar-user">
          <button class="btn btn-secondary"><User color="white" />{{ user }}</button>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <RouterLink
              to="/dashboard"
              class="routes"
              :style="{ pointerEvents: props.disable ? 'none' : 'auto' }"
            >
              <button
                class="btn btn-primary"
                :style="
                  props.page === 0
                    ? { color: '#fff', border: '2px solid white', paddingLeft: '10px' }
                    : {}
                "
              >
                <LayoutDashboard
                  class="icons"
                  :style="{ color: props.page === 0 ? '#fff' : '#ddd' }"
                />
                Dashboard
              </button>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/monitoramento"
              class="routes"
              :style="{ pointerEvents: props.disable ? 'none' : 'auto' }"
            >
              <button
                class="btn btn-primary"
                :style="
                  props.page === 1
                    ? { color: '#fff', border: '2px solid white', paddingLeft: '10px' }
                    : {}
                "
              >
                <Monitor class="icons" :style="{ color: props.page === 1 ? '#fff' : '#ddd' }" />
                Monitoramento
              </button>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/users"
              class="routes"
              :style="{ pointerEvents: props.disable ? 'none' : 'auto' }"
            >
              <button
                class="btn btn-primary"
                :style="
                  props.page === 2
                    ? { color: '#fff', border: '2px solid white', paddingLeft: '10px' }
                    : {}
                "
              >
                <Users class="icons" :style="{ color: props.page === 2 ? '#fff' : '#ddd' }" />
                Utilizadores
              </button>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/auditorias/pedidos"
              class="routes"
              :style="{ pointerEvents: props.disable ? 'none' : 'auto' }"
            >
              <button
                class="btn btn-primary"
                :style="
                  props.page === 3
                    ? { color: '#fff', border: '2px solid white', paddingLeft: '10px' }
                    : {}
                "
              >
                <NotebookPen class="icons" :style="{ color: props.page === 3 ? '#fff' : '#ddd' }" />
                Auditorias
              </button>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/materiais"
              class="routes"
              :style="{ pointerEvents: props.disable ? 'none' : 'auto' }"
            >
              <button
                class="btn btn-primary"
                :style="
                  props.page === 4
                    ? { color: '#fff', border: '2px solid white', paddingLeft: '10px' }
                    : {}
                "
              >
                <Anvil class="icons" :style="{ color: props.page === 4 ? '#fff' : '#ddd' }" />
                Materiais
              </button>
            </RouterLink>
          </li>
        </ul>
      </nav>
      <div class="navbar-logout">
        <button id="logout" class="btn btn-primary" :disabled="props.disable" @click="signout">
          Sign Out
          <LogOut class="icons" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  filter: contrast(0%);
}
.navbar-container {
  position: static;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #734414;
  height: 100vh;
  min-height: fit-content;
  max-height: 100dvh;
  min-width: 300px;
  max-width: 300px;
}

.navbar-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 10%;

  background-color: #734414;
  /* height: 50rem; */
  /* min-height: fit-content;
        max-height: 100dvh; */
  max-width: 350px;
}

.navbar-logo {
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.navbar-user {
  width: 15rem;
}

ul {
  list-style: none;

  width: 15rem;

  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  padding: 0;
}

li {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icons {
  color: #ddd;
}
.btn-primary {
  width: 100%;
  height: 3.5rem;

  background-color: rgba(217, 217, 217, 0);
  border: none;
  display: flex;
  justify-content: baseline;
  padding-left: 12px;
  align-items: center;
  gap: 12px;

  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  color: #ddd;
}
.btn-primary:active {
  padding-left: 10px;

  background-color: rgba(217, 217, 217, 15%);
  border: 2px solid #d7d7d7;
  color: #fff;
}

.btn-secondary {
  width: 100%;
  height: fit-content;

  background-color: rgba(214, 122, 42, 0);
  border: none;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 5px;

  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
}
.btn-secondary:focus {
  background-color: rgba(217, 217, 217, 0);
  cursor: default;
}
/* .btn-secondary:hover {
  background-color: rgba(217, 217, 217, 15%);
  cursor: default;
} */

#logout {
  width: 15rem;
  height: 3.5rem;
  background-color: rgba(214, 122, 42, 0.676);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 20px;
}
#logout:active {
  /* Button moving fix */

  padding-left: 12px;

  background-color: rgba(217, 217, 217, 15%);
  border: 2px solid #d7d7d7;
  color: #fff;
}

.routes {
  text-decoration: none;
  width: 100%;
}

@media only screen and (max-height: 1400px) {
  .navbar-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding-top: 45%;
    gap: 15dvh;
    background-color: #734414;
    height: 100dvh;
    max-height: 100dvh;
    /* min-height: fit-content;
        max-height: 100dvh; */
    max-width: 350px;
  }
}

@media only screen and (max-height: 1024px) {
  .navbar-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding-top: 45%;
    gap: 15dvh;
    background-color: #734414;
    height: 100dvh;
    max-height: 100dvh;
    /* min-height: fit-content;
        max-height: 100dvh; */
    max-width: 350px;
  }
}
@media only screen and (max-height: 980px) {
  .navbar-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding-top: 15%;
    gap: 12dvh;
    background-color: #734414;
    height: 100dvh;
    max-height: 100dvh;
    /* min-height: fit-content;
        max-height: 100dvh; */
    max-width: 350px;
  }
}
@media only screen and (max-height: 900px) {
  .navbar-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 0;
    /* padding-top: 20%; */
    gap: 6rem;

    background-color: #734414;
    height: 50rem;
    max-height: 100dvh;
    /* min-height: fit-content;
        max-height: 100dvh; */
    max-width: 350px;
  }
  ul {
    gap: 0.5rem;
  }
}
@media only screen and (max-height: 800px) {
  .navbar-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 0;
    /* padding-top: 20%; */
    gap: 3rem;

    background-color: #734414;
    height: 50rem;
    max-height: 100dvh;
    /* min-height: fit-content;
        max-height: 100dvh; */
    max-width: 350px;
  }
  ul {
    gap: 0.5rem;
  }
}

@media only screen and (max-height: 600px) {
  .navbar-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 5%;
    gap: 1rem;

    background-color: #734414;
    height: 50rem;
    max-height: 100dvh;
    /* min-height: fit-content;
        max-height: 100dvh; */
    max-width: 350px;
  }
  ul {
    gap: 0.5rem;
  }
}

.navbar-logo {
  display: flex;
  width: fit-content;
  height: fit-content;
  justify-content: center;
  align-items: center;
}
.btn-primary {
  width: 100%;
  height: 3.5rem;

  border: none;
  display: flex;
  justify-content: baseline;
  padding-left: 12px;
  align-items: center;
  gap: 12px;

  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
}
</style>
