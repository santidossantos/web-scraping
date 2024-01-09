<script setup lang="ts"></script>

<template>
    <div class="not-found">
        <section class="page_404">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 ">
                        <div class="col-sm-10 col-sm-offset-1  text-center">
                            <div class="four_zero_four_bg">
                                <h1 class="text-center ">404</h1>
                            </div>
                            <div class="contant_box_404">
                                <h3 class="h2">
                                    Parece que te has perdido
                                </h3>
                                <p>La página que buscas no esta disponible</p>
                                <a href="/" class="link_404">Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.text-center {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.not-found {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.page_404 {
    padding: 40px 0;
    background: #fff;
    font-family: 'Arvo', serif;
}

.page_404 img {
    width: 100%;
}


.four_zero_four_bg {
    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
}

.four_zero_four_bg h1 {
    font-size: 80px;
}

.four_zero_four_bg h3 {
    font-size: 80px;
}

.link_404 {
    color: #fff !important;
    padding: 10px 20px;
    background: #0f457e;
    margin: 20px 0;
    display: inline-block;
    text-decoration: none;
    border-radius: 16px;
}

.contant_box_404 {
    margin-top: -50px;
}
</style>

<style>
.v-navigation-drawer {
    display: none;
}

.v-app-bar {
    display: none;
}
</style>