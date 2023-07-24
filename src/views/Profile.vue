<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>User Profile</v-toolbar-title>
                </v-toolbar>
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    bottom
                    color="deep-purple accent-4"
                ></v-progress-linear>

                <v-card-text>
                    <form>
                            <v-text-field
                            v-model="email"
                            :error-messages="errors"
                            label="Username"
                            prepend-icon="mdi-email"
                            hint="Please input your username"
                            disabled
                            ></v-text-field>

                            <v-text-field
                            v-model="emails"
                            :error-messages="errors"
                            label="Email"
                            prepend-icon="mdi-email"
                            hint="Please input your Email"
                            
                            ></v-text-field>

                            <v-text-field
                            v-model="name"
                            :error-messages="errors"
                            label="Name"
                            prepend-icon="mdi-account-settings"
                            hint="Please input your name"
                            
                            ></v-text-field>

                            <v-text-field
                            v-model="phone"
                            :error-messages="errors"
                            label="Phone"
                            prepend-icon="mdi-phone"
                            hint="Please input your phone"
                            ></v-text-field>

                            <v-text-field
                                v-model="password"
                                :error-messages="errors"
                                label="Password"
                                prepend-icon="mdi-lock"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"
                                hint="Please input your password"
                                counter
                                >
                            </v-text-field>
                    </form>
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
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn block color="blue" @click="submit()">Update Profile</v-btn>
                </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
        <content-footer />
    </v-container>
</template>
<script>
import ContentFooter from '../components/Layouts/Partials/ContentFooter.vue'

export default {
    components:{
        ContentFooter
    },
    data() {
        return {
            email: '',
            password: '',
            error: true,
            show: false,
            errors: [],
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
            phone: '',
            name: '',
            emails: ''
        }
    },
    mounted(){
        this.getPullData()
    },
    methods:{
        async submit(){
            this.loading = true

            await axios.post(`${process.env.VUE_APP_URL}/api/profile`, {
                'password': this.password,
                'name1': this.name,
                'phone': this.phone,
                'email': this.emails
            }, { 
                headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
            }).then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutUser").then(() => {
                        this.$router.push('/')
                    });
                } else {
                    this.loading = false
                    this.getPullData()
                    this.snackbar = {
                        color: "success",
                        icon: "mdi-checkbox-marked-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Success",
                        text: "Successfully Update Profile",
                        visible: true
                    };
                }
                    
            }).catch(err => {
                console.log(err.response);
                this.loading4 = false
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: err.response.data.message,
                    visible: true
                };
            })
        }, 
        getPullData(){
            axios.get(`${process.env.VUE_APP_URL}/api/profile`, { 
                headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutUser").then(() => {
                        this.$router.push('/')
                    });
                } else {
                    this.email = res.data.data.username
                    this.password = res.data.data.password
                    this.phone = res.data.data.phone
                    this.name = res.data.data.name1
                    this.emails = res.data.data.email
                }
            }).catch(err => {
                console.log(err.response);
            })
        }
    },
    watch: {
    }
}
</script>