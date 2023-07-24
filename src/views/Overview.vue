<template>
    <v-container >
    </v-container>
</template>
<script>
  export default {
    data: () => ({
        show: false,
        entities: [],
        loading: false,
        firstLoad: true,
        theme: {
            isDark: false
        },
        items: [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}],
    }),
    methods:{
        
    },
    mounted() {
    },
  }
</script>