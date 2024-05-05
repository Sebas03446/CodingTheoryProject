<template>
    <div class="services w-full h-screen">
        <div class="flex flex-col  m-20">
            <div class="flex w-fit justify-center mb-40">
                <img src="@/assets/images/compare.svg" alt="Comparar productos" class="w-1/4 mb-4 border-2 mr-10" />
                <div class="service-content flex flex-col">


                    <h3 class="text-3xl text-primary">Compara los productos tecnológicos en distintas tiendas</h3>
                    <p class="text-tertiary text-center text-wrap">
                        Encuentra las mejores ofertas y compara precios en diversas tiendas para elegir el mejor precio.
                    </p>
                </div>
            </div>

            <div class="flex w-fit justify-center">
                <div class="service-content flex flex-col">
                    <h3 class="text-3xl text-primary">Mira el historial de precio</h3>
                    <p class="text-tertiary text-center">
                        Visualiza el historial de precios del producto tecnológico que estas buscando, para entender las tendencias y aprovechar las ofertas cuando
                        sean más favorables.
                    </p>
                </div>
                <img src="@/assets/images/history.svg" alt="Historial de precios" class="w-1/4 mb-4 border-2 ml-10" />
            </div>

        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.services {
    .container-services {
        @media (max-width: 640px) {
            & {
                flex-wrap: wrap;
            }
        }

        .service-content {
            @media (min-width: 640px) {
                & {
                    padding-top: 5%;
                }
            }
        }
    }

    .service-item {
        @media (min-width: 640px) {
            & {
                padding: 1em;
            }
        }
    }
}
</style>