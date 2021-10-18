<template>
  <v-app>
    <v-main>
       <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import loginPage from './components/LoginPage';

export default {
  name: 'App',
  // components: {
  //   loginPage,
  // },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">

  * {
    font-family: 'Roboto';

    .flex {
      display: flex;
      justify-content: center;
    }
  }

</style>
