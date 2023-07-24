<template>
    <v-snackbar v-model="$store.state.snackbar" :top="true" :color="$store.state.error ? 'error' : 'success'">
        {{ $store.state.text }}
        <v-btn color="white" text @click="$store.state.snackbar = false">Close</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',
    data(){
        return {}
    }
}
</script>