<template>
    <v-app-bar app color="white darken-3" dark>
        <v-app-bar-nav-icon color="#000" @click.stop="drawer()" />
        <v-toolbar-title color="#000" style="width: 300px;">
            <span class="hidden-sm-and-down"></span>
        </v-toolbar-title>
        <v-spacer />
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-toolbar-title class="pr-6 hidden-sm-and-down" v-on="on" style="font-size:0.99rem; cursor:pointer">
                    <v-avatar size="45px" item class="mr-1">
                        <v-img src="/images/default-user.png" alt="Admin"/>
                    </v-avatar>
                    {{$store.state.admin.name}}
                    <v-icon>
                        mdi-chevron-down
                    </v-icon>
                </v-toolbar-title>
            </template>
            <v-list dense>
                <v-list-item-group
                    color="secondary"
                >
                    <v-list-item>
                        <v-card class="rounded-l border-12" width="100%">
                            <v-card-text class="p-1">
                                <div class="d-flex">
                                    <v-avatar size="45px" item class="mr-2">
                                        <v-img src="/images/default-user.png" alt="Admin"/>
                                    </v-avatar>
                                    <p class="mt-3">
                                        {{$store.state.user.username}}
                                    </p>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-list-item>
                    <v-list-item class="mt-2" to="/staff/password">
                        <v-list-item-icon>
                            <v-icon>mdi-lock</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Profile</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-btn type="submit" block class="border-12 mr-12 pl-12 pr-12 pt-2 pb-2 mt-3" color="secondary" @click="logout()">Logout</v-btn>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
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
            timeout: 7500
        }
    },
    methods: {
        drawer(){
            return this.$store.commit('SET_DRAWER_ADMIN')
        },
        checkColor(count){
            return count ? 'red' : 'green'
        },
        logout(){
            this.loading = true

            this.$store.dispatch("logoutUser").then(() => {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-checkbox-marked-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: "Successfully Logout Sistem",
                    visible: true
                };
                this.loading = false
                this.$router.push('/')
            });
        }
    },
    mounted(){
    }
}
</script>