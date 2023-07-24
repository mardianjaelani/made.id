<template>
  <v-footer bottom fixed padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>自由が丘クリニック</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
        return {
          value: 1,
          loading: false,
          snackbar: {
              color: null,
              icon: null,
              mode: null,
              position: "top",
              text: null,
              timeout: 7500,
              title: null,
              visible: false
          },
          timeout: 7500,
          q: ''
        }
  },
  mounted(){
    this.q = this.$route.query.dashboard
    //console.log(this.q)
  },
  methods: {
    
  }
};
</script>