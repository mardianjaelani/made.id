<template>
    <v-container class="mt-12 mb-12" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="10">
                <v-card class="elevation-5 rounded-l">
                    <v-card-title class="blue-lcd" style="border-bottom: 1px solid #1e4393">
                        {{$t('labels.updatePassword')}}
                    </v-card-title>
                    <v-card-text>
                        <v-container class="pl-5 pr-5 pt-5 pb-4">
                            <v-row>
                                <v-col class="col-12" sm="3" md="3">
                                    <v-card class="elevation-1 rounded-l">
                                        <v-card-text>
                                            <v-row justify="center" align="center" class="mt-12" v-if="userModel === null">
                                                <v-col cols="3">
                                                    <v-progress-circular
                                                    indeterminate
                                                    color="primary"
                                                    class="text-center mx-auto"
                                                    :size="70"
                                                    v-if="userModel === null"
                                                    ></v-progress-circular>
                                                </v-col>
                                            </v-row>
                                            <v-img src="/images/default-user.png" v-if="userModel != null"></v-img>
                                            <!-- <v-btn
                                                block
                                                color="accent"
                                                elevation="2"
                                                outlined
                                                class="mt-5"
                                                @click="changeAvatar()"
                                            >
                                                Pilih Foto
                                            </v-btn> -->
                                            <h6 class="mt-5 text-center" style="font-weight: 600;">{{$store.state.admin.name}}</h6>
                                            <p class="text-center">{{this.$store.state.admin.username}}</p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col class="col-12" sm="9" md="9">
                                    <v-container class="p-4">
                                        <v-row v-if="userModel === null">
                                            <v-skeleton-loader
                                            v-bind="attrs"
                                            type="article, actions"
                                            ></v-skeleton-loader>
                                        </v-row>
                                        <v-row v-else>
                                            <v-col cols="12">
                                                <validation-observer
                                                    ref="observer"
                                                    v-slot="{ invalid }"
                                                >
                                                    <form @submit.prevent="submitUpdatePassword">
                                                        <v-container class="pl-lg-5 pr-lg-5">
                                                            <v-row align="center" justify="center">
                                                                <v-col cols="12" xs="12" sm="12" md="12">
                                                                    <h5 class="text-center" style="font-weight:700">{{$t('labels.updatePassword')}}</h5>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="mt-lg-5" align="center" justify="center">
                                                                <v-col cols="12" xs="12" sm="12" md="12" class="pt-0 pb-0">
                                                                    <h6 class="pink-heading">{{ $t("labels.password") }}</h6>
                                                                    <validation-provider
                                                                    v-slot="{ errors }"
                                                                    name="password"
                                                                    rules="required"
                                                                    >
                                                                        <v-text-field
                                                                            solo
                                                                            :label="$t('labels.password')"
                                                                            :append-icon="showReg ? 'mdi-eye' : 'mdi-eye-off'"
                                                                            :type="showReg ? 'text' : 'password'"
                                                                            @click:append="showReg = !showReg"
                                                                            persistent-hint
                                                                            required
                                                                            v-model="password"
                                                                            class="ma-0 pa-0 border-12"
                                                                            height="60"
                                                                            :error-messages="errors"
                                                                        >
                                                                        </v-text-field>                                   
                                                                    </validation-provider>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="mt-lg-5" align="center" justify="center">
                                                                <v-col cols="12" xs="12" sm="12" md="12" class="pt-0 pb-0">
                                                                    <h6 class="pink-heading">{{ $t("labels.passwordConfirm") }}</h6>
                                                                    <validation-provider
                                                                    v-slot="{ errors }"
                                                                    name="passwordConfirm"
                                                                    rules="required"
                                                                    >
                                                                        <v-text-field
                                                                            solo
                                                                            :label="$t('labels.passwordConfirm')"
                                                                            :append-icon="showRegConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                                                                            :type="showRegConfirm ? 'text' : 'password'"
                                                                            @click:append="showRegConfirm = !showRegConfirm"
                                                                            persistent-hint
                                                                            required
                                                                            v-model="passwordConfirm"
                                                                            :error-messages="errors"
                                                                            class="ma-0 pa-0 border-12"
                                                                            height="60"
                                                                        >
                                                                        </v-text-field>                                   
                                                                    </validation-provider>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row align="center" justify="center">
                                                                <v-col cols="12" xs="12" sm="12" md="12" class="pt-0 pb-0">
                                                                    <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#e83e8c" :disabled="invalid">{{$t('buttons.update')}}</v-btn>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </form>
                                                </validation-observer>
                                            </v-col>
                                        </v-row>
                                       
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-dialog
                    v-model="dialogWaitPasien"
                    persistent
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700">
                                パスワードが変更されました。
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row align="center" justify="center">
                                    <v-col cols="12" xs="12" sm="2" md="2">
                                        <v-icon x-large color="yellow" class="text-center">
                                            mdi-clock-outline
                                        </v-icon>
                                    </v-col>
                                </v-row> 
                                <v-row align="center" justify="center">
                                    <v-col cols="12" xs="12" sm="8" md="8">
                                        <h3 class="text-center" style="color: #053d76; font-weight: 600">
                                            <b>{{countDown}}</b> 
                                        </h3>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
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
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { Icon } from '@iconify/vue2';
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
    ...email,
    message: 'Email must be valid',
})


export default {
    components:{
        Icon,
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            attrs: {
                class: 'mb-6',
                boilerplate: true,
                elevation: 2,
            },
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
            userModel: null,
            error: true,
            errors: [],
            password: '',
            passwordConfirm: '',
            showReg: false,
            showRegConfirm: false,
            dialogWaitPasien: false,
            countDown: 3,
        }
    },
    mounted(){
        setTimeout(()=>{
            this.userModel = 'OKE'
        },1000);
    },
    methods:{
        clear(){
            this.password = ''
            this.passwordConfirm = ''
        },
        countDownTimer () {
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }

            if (this.countDown <= 0) {
                this.dialogWaitPasien = false
                this.$router.push('/staff/dashboard');
            }

        },
        async submitUpdatePassword(){
            if(this.password != this.passwordConfirm) {
                this.snackbar = {
                    color: "red text-white",
                    icon: "mdi-checkbox-marked-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Confirm password does not match',
                    visible: true
                }; 
            } else{
                await axios.post(`${process.env.VUE_APP_URL}/api/v1/password_update`, {
                    'password': this.password,
                    'password_confirm': this.passwordConfirm
                }, { 
                    headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutAdmin").then(() => {
                            this.$router.push('/staff/login')
                        });
                    } else if(res.data.error_message != ''){
                        this.snackbar = {
                            color: "red text-white",
                            icon: "mdi-checkbox-marked-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: res.data.error_message,
                            visible: true
                        }; 
                    } else {
                        this.clear()
                        this.dialogWaitPasien = true
                        this.countDownTimer()
                        
                        this.snackbar = {
                            color: "primary text-white",
                            icon: "mdi-checkbox-marked-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Success",
                            text: "パスワードが変更されました。",
                            visible: true
                        };
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            }
        },
    },
    watch: {
    }
}
</script>