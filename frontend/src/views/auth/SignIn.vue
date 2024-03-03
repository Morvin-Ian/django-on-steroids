<template>
  <div class="login-page">
    <div class="login-container">
      <h2 style="text-align: center; color: white;">Sign In</h2>
      <p class="error">{{ error }}</p>
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const error = ref('')
const store = useAuthStore()
const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))

const login = async () => {
  if (password.value && email.value) {
    const response = await store.authenticate({
      email: email.value,
      password: password.value
    })
    if (response.token) {
      router.push("/")
    } else {
      error.value = response.error
    }
  }
}

onMounted(() => {
  if (user && user.token) {
    router.push("/")
  }
})

</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #202C33;
  ;
}

.login-container {
  background-color: #1d1d1d;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input[type="email"],
input[type="password"],
button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
}

button {
  cursor: pointer;
  background-color: #202C33;
  ;
}

button:hover {
  background-color: #0e1417;
  ;
}

.error {
  color: red;
  text-align: center;
  margin-bottom: 10px;
  font-size: small;
}
</style>