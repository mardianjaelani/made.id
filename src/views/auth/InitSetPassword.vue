<template>
    <v-app id="inspire" class="outer" style="background-position: center;
      background-repeat: no-repeat;
      background-size: cover;">
      <v-main>
        <v-container class="fill-height pl-lg-5 pr-lg-5" style="max-width: 74em;">
          <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="6" md="6" class="col-12" >
              <v-card class="elevation-12 rounded-xl p-3" v-if="display" style="border-top: 3px solid #e83e8c;">
                  <v-progress-linear
                      :active="loading"
                      :indeterminate="loading"
                      absolute
                      bottom
                      color="blue accent-4"
                  ></v-progress-linear>
                  <v-card-title>
                    <v-icon  @click="$router.go(-1)">
                      mdi-arrow-left
                    </v-icon>
                    <h5 class="pt-2 pl-5">初めてご利用の方</h5>
                  </v-card-title>
                  <v-card-title style="border-bottom: 1px solid rgba(0,0,0,.125);">
                    <v-row align="center" justify="center">
                      <v-col cols="12" xs="12" sm="8" md="8">
                        <div class="d-flex">
                          <v-img
                            class="mx-auto text-center"
                            max-width="150"
                            lazy-src="../../assets/logo_made.png"
                            src="../../assets/logo_made.png"
                            style="border-radius: 50%;"
                          ></v-img>
                          <span class="text-center brand-text font-weight-bold h5 my-auto" data-v-5c6101e4="">オンライン診療</span>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-container class="mt-5">
                        <v-row align="center" justify="center">
                            <v-col cols="6">
                                <h6 class="text-center">
                                    Please Wait ...
                                </h6>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col cols="3">
                                <v-progress-circular
                                :size="70"
                                :width="7"
                                color="secondary"
                                indeterminate
                                class="mt-5 text-center mx-auto"
                                ></v-progress-circular>
                            </v-col>                            
                        </v-row>
                    </v-container>
                  </v-card-text>
              </v-card>
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
      </v-main>
      
    </v-app>
  </template>
  
<script>
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
        ValidationProvider,
        ValidationObserver
    },
    name: 'ForgetPassword',
    data(){
        return {
            dialog: false,
            email: '',
            password: '',
            deviceId: '',
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
            display: true,
            username: ''
        }
    },
    mounted(){
        this.$store.dispatch('setOverlay', false)
        this.getToken()
    },
    methods: {
        clear(){
            this.email = ''
        },
        async getToken(){

            await axios.get(`${process.env.VUE_APP_URL}/api/v1/token_login`, { 
                headers: { Authorization: `${this.$route.query.token}` } 
            })
            .then(res => {
                if (res.data.error_message != "") {
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
                    var data = {
                        token: this.$route.query.token,
                        data: res.data.value
                    }

                    this.$store.dispatch("getTokenResetPassword", data)
                    .then((res) => {
                        if (res.data.auth === 0) {
                            this.$router.push('/patient/password');
                        } else{
                            this.$router.push('/staff/password');
                        }
                    }).catch((err) => {
                        this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: err,
                        visible: true
                        };
                    });
                }
            }).catch(err => {
                console.log(err.response);
            })
        }
    }
}
</script>