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
                            lazy-src="../../assets/logo.png"
                            src="../../assets/logo.png"
                            style="border-radius: 50%;"
                          ></v-img>
                          <span class="text-center brand-text font-weight-bold h5 my-auto" data-v-5c6101e4="">オンライン診療</span>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <validation-observer
                        ref="observer"
                        v-slot="{ invalid }"
                    >
                        <form @submit.prevent="sendEmail">
                            <v-card-text>
                                <h6 class="blue-lcd">ユーザーIDもしくはメールアドレスを入力ください。</h6>
  
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="ユーザーIDもしくはメールアドレスを入力ください。"
                                  rules="required"
                                >
                                    <v-text-field
                                    solo
                                    v-model="email"
                                    :error-messages="errors"
                                    label=""
                                    append-icon="mdi-email"
                                    hint=""
                                    class="border-12"
                                    required
                                    ></v-text-field>   
                                </validation-provider>                             
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="rounded-l mr-2 pl-12 pr-12 pt-5 pb-5" color="secondary" type="submit" :disabled="invalid">メールアドレスに初期設定用リンクを送る</v-btn>
                            </v-card-actions>
                        </form>
                    </validation-observer>
                  </v-card-text>
              </v-card>
              <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="500px"
              >
                  <v-card class="p-3 rounded-xl">
                      <v-card-title class="text-center">
                          <v-row align="center" justify="center">
                              <v-col cols="10">
                              <h5 style="font-weight:700">
                                メールアドレスに再設定リンクをお送りしました。メールボックスを確認ください。
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
              username: '',
              countDown: 3,
            }
        },
        mounted(){
          this.$store.dispatch('setOverlay', false)
        },
        methods: {
            clear(){
              this.email = ''
            },
            countDownTimer () {
              if (this.countDown > 0) {
                  setTimeout(() => {
                      this.countDown -= 1
                      this.countDownTimer()
                  }, 1000)
              }
  
              if (this.countDown <= 0) {
                  this.dialog = false
                  this.$router.go(-1) 
              }
  
            },
            async sendEmail(){
                this.$refs.observer.validate() 
  
                this.$store.dispatch('setOverlay', true)
  
                await axios.post(`${process.env.VUE_APP_URL}/api/v1/init_set_password`, {
                    'user_id': this.email
                })
                .then(res => {
                    this.$store.dispatch('setOverlay', false)
  
                    if (res.data.result === 'success') {
                        this.email = ''
                        if (res.data.error_message == "") {
                          this.dialog = true
                          this.countDownTimer()
                        } else{
                          this.snackbar = {
                              color: "primary text-white",
                              icon: "mdi-checkbox-marked-circle",
                              mode: "multi-line",
                              position: "top",
                              timeout: 7500,
                              title: "Success",
                              text: res.data.error_message == "" ? "メールアドレスに再設定リンクをお送りしました。メールボックスを確認ください。" : res.data.value,
                              visible: true
                          };
                        }
                    } else {
                        this.snackbar = {
                            color: "red text-white",
                            icon: "mdi-checkbox-marked-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: res.data.error_message == 'USER_ID_NOT_FOUND' ? "入力されたメールアドレスまたはユーザーIDで、登録がありません。" : res.data.error_message,
                            visible: true
                        }; 
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            },
        }
    }
  </script>