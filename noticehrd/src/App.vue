<template>
  <v-app id="inspire">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    
  }
</script>
<style>
.main{
    background: url('~@/assets/bg.jpg') repeat;
    
    /* background-size: cover; */
}
.card{
  background: url('~@/assets/exclusive_paper.png') repeat;
}
</style>