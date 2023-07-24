<template>
    <v-container class="mt-5" style="max-width: 100em;padding-bottom: 100px;">
        <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="6">
                <v-card class="mx-auto rounded-xl" style="border-top: 3px solid #e83e8c;">
                    <v-card-text>
                        <validation-observer
                            ref="observer"
                            v-slot="{ invalid }"
                        >
                            <form @submit.prevent="submitUpdatePassword">
                                <v-container class="mt-lg-5">
                                    <v-row align="center" justify="center">
                                        <v-col cols="12" xs="12" sm="12" md="10">
                                            <h5 class="text-center" style="font-weight:700">{{$t('labels.updatePassword')}}</h5>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-lg-5" align="center" justify="center">
                                        <v-col cols="12" xs="12" sm="12" md="10" class="pt-0 pb-0">
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
                                        <v-col cols="12" xs="12" sm="12" md="10" class="pt-0 pb-0">
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
                                    <v-row justify="center" class="mt-lg-5">
                                        <v-col cols="6" xs="6" sm="3" md="3">
                                            <v-btn block class="rounded-l p-4 text-h6" color="#fff" @click="$router.go(-1)">{{$t('buttons.cancel')}}</v-btn>
                                        </v-col>
                                        <v-col cols="6" xs="6" sm="3" md="3">
                                            <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#e83e8c" :disabled="invalid">{{$t('buttons.update')}}</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </form>
                        </validation-observer>
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
            </v-col>
        </v-row>
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
        components: {
            Icon,
            ValidationProvider,
            ValidationObserver
        },
        data() {
            return {
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
        mounted() {
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
                    this.$router.push('/patient/dashboard');
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
                        headers: { Authorization: `${this.$store.getters.isTokenUser}` } 
                    })
                    .then(res => {
                        if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                            this.$store.dispatch("logoutUser").then(() => {
                                this.$router.push('/')
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
    }
</script>