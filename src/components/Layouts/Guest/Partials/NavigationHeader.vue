<template>
    <v-app-bar app color="white darken-3" dark>
        <!-- <v-app-bar-nav-icon color="#000" @click.stop="drawer()" /> -->
        <v-toolbar-title color="#000" style="width: 300px;" class="text-center">
            <span class="text-center">Online Clinic</span>
        </v-toolbar-title>
        <v-spacer />
        <v-select
          :items="langs"
          v-model="$i18n.locale"
          label="Solo field"
          class="mt-6 mr-5"
          style="max-width: 80px;"
          dense
          solo
        ></v-select>
        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="deep-purple accent-4"
        ></v-progress-linear>
        <v-snackbar v-model="snackbar.visible" :color="snackbar.color" :multi-line="snackbar.mode === 'multi-line'" :timeout="snackbar.timeout" :top="snackbar.position === 'top'">
            <v-layout align-center pr-4>
            <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
            <v-layout column>
                <div>
                <strong>{{ snackbar.title }}</strong>
                </div>
                <div>{{ snackbar.text }}</div>
            </v-layout>
            </v-layout>
            <v-btn v-if="snackbar.timeout === 0" icon @click="snackbar.visible = false">
            <v-icon>clear</v-icon>
            </v-btn>
        </v-snackbar>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
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
            langs: ['ja', 'en']
        }
    },
    methods: {
    },
    mounted(){
    }
}
</script>