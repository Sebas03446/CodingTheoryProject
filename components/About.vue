<template>
    <div class="about w-full h-auto">
        <h1 class="text-center text-4xl font-bold m-10">¿Qué es Ofertios?</h1>
        <div class="flex flex-col items-center justify-center flex-wrap">
            <p class="text-justify text-2xl m-10 ml-56 w-1/6 mr-64 sm:w-1/2">
            Ofertios es una plataforma que colecciona los precios de productos tecnológicos de diferentes tiendas y
            los disponibiliza en un solo lugar para que los usuarios puedan comparar y elegir la mejor opción.
            </p>
        </div>
        <div class="card-ofertios-container m-10 flex flex-wrap justify-center">
            <Card title="Visión"
                content="Para el 2027 Ofertios será la principal referencia de los consumidores de tecnología, ofreciendo recomendaciones confiables y actualizadas para tomar la mejor decisión de compra."
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl w-1/4 h-auto m-4 p-5 flex flex-col items-center" />
            <Card title="Misión"
                content="Ofertios facilita la compra inteligente de productos tecnológicos, ofreciendo las mejores ofertas y recomendaciones."
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl w-1/4 h-auto m-4 p-5 flex flex-col items-center" />
        </div>

        <h1 class="text-center text-4xl font-bold m-10">Equipo</h1>
        <div class="card-team-container m-10 flex  justify-between">
            <Card title="Sebastian French" content="Desarrollador Backend"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl px-4 py-2 w-1/4 h-1/4 m-4 flex flex-col justify-between">
                <template #image>
                    <img class="mt-4 rounded-sm" src="@/assets/images/1688090822728.jpeg" alt="Image"
                        style="max-width: 100%; max-height: 100%;" />
                </template>
                <template #footer>
                    <div class="flex justify-center mt-4">
                        <a href="https://www.linkedin.com/in/jsebastian-french/" class="social-link mr-2 w-10"
                            target="_blank">
                            <img src="@/assets/icons/linkedin.svg" alt="Facebook" />
                        </a>
                    </div>
                </template>
            </Card>
            <Card title="David Alexander Rátiva Gutiérrez"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl w-1/3 h-1/3 m-4" />
            <Card title="Julián Andrés Córdoba Jaramillo"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl w-1/3 h-1/3 m-4" />
            <Card title="Hector Hernando Alfonso Hernández"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl w-1/3 h-1/3 m-4" />
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
