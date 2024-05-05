<template>
    <div class="about w-full h-auto">
        <h1 class="text-center text-4xl font-bold m-10">Equipo</h1>
        <div class="card-team-container m-10 flex  justify-between">
            <Card title="Sebastian French" content="Estudiante de Ingeniería de Sistemas y Computación"
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
            <Card title="### ###"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl w-1/3 h-1/3 m-4" />
            <Card title="### ###"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl w-1/3 h-1/3 m-4" />
            <Card title="### ###"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl w-1/3 h-1/3 m-4" />
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
