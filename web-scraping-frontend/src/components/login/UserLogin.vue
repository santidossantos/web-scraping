<script setup lang="ts">
//@ts-ignore
import VueWriter from 'vue-writer'
import LoginButton from '@/components/buttons/LoginButton.vue'

const arr = ['BIENVENID@', 'WEB SCRAPING PORTAL']
</script>

<template>
  <section>
    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <div class="card">
          <h1>
            <VueWriter class="writter" :array="arr" :typeSpeed="70" />
          </h1>

          <img src="src/assets/img/login.png" width="250" height="250" />
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>
              ¿Listo para comenzar?
            </h1>
            <p class="subtitle">Inicia sesión en tan solo un click</p>
            <LoginButton class="ghost" label="Acceder" icon="mdi-google" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <p>
      Web Scraping Portal <i class="fa-solid fa-spider fa-spin"></i> |
      <a target="_blank" href="https://github.com/santidossantos/"> Santiago dos Santos</a>
      | Ingeniería de Alicaciones Web | UNLP
    </p>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

section {
  background: #e1f5fe;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
}

h1 {
  font-weight: bold;
  margin: 0;
  padding-top: 25px;
}

span {
  font-size: medium;
  font-weight: 400;
}

.subtitle {
  font-size: 0.9rem;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 20px;
}

.writter {
  background-image: linear-gradient(135deg, #007bff, rgb(16, 35, 103));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.4rem;
  line-height: 1;
  font-weight: 800;
  font-family: monospace;
}

img {
  margin-top: 30px;
  margin-bottom: 20px;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  margin-top: 10%;
  background: #0e0e0f;
}

.card {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.hidden {
  opacity: 0;
}

.container {
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #3949ab;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>
