<template>
  <section class="w-full h-full">
  </section>
</template>

<script>
export default {
  name: "HomeComponent",
};
</script>

<style lang="scss">
.home {
  .container-home {
    @media (max-width: 640px) {
      & {
        flex-wrap: wrap;
      }
    }
    @media (min-width: 640px) {
      & {
        padding-top: 5%;
      }
    }
    .home-content {
      @media (min-width: 640px) {
        & {
          padding-right: 5%;
        }
      }
    }
  }
}
</style>
