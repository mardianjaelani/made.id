<template>
  <v-app id="inspire" class="outer" style="background-position: center;
    background-repeat: no-repeat;
    background-size: contain;">
    <v-main>
      <v-container class="fill-height" style="max-width: 74em;">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="4" md="4">
            <v-card class="elevation-12 rounded-l" style="border-top: 3px solid #e83e8c;">
              <v-card-title style="border-bottom: 1px solid rgba(0,0,0,.125);">
                <v-img
                  class="ml-2"
                  lazy-src="../assets/logo_made_id.png"
                  src="../assets/logo_made_id.png"
                ></v-img>
              </v-card-title>
              <v-card-text class="mt-5">
                  <form>
                    <v-text-field
                      solo
                      v-model="email"
                      :error-messages="errors"
                      label="Email"
                      append-icon="mdi-email"
                      hint="Email"
                      required
                      class="ma-0 pa-0 rounded-l"
                      hide-details=true
                      type="email"
                    ></v-text-field>

                    <v-text-field
                        class="mt-2 rounded-l"
                        solo
                        v-model="password"
                        :error-messages="errors"
                        label="Password"
                        append-icon="mdi-lock"
                        :type="show ? 'text' : 'password'"
                        @keyup.enter="submit()"
                        hint="Password"
                        counter
                        required>
                    </v-text-field>
                  </form>
                  <v-row class="">
                    <v-col cols="12">
                      <v-btn block class="rounded-l" color="primary" @click="submit()" style="border-color: deeppink !important;outline-color: deeppink !important;">Login</v-btn>
                      <!-- <v-btn block class="rounded-l text-white mt-2" color="#06c755" v-show="false">LINE でログイン</v-btn> -->
                    </v-col>
                    <v-col cols="12" v-show="false">
                      <!-- <p style="color:#007bff">パスワードを忘れましたか？</p> -->
                      <!-- <p>
                        {{ $t("labels.salonCode") }}
                      </p> -->
                    </v-col>
                  </v-row>
                  <div class="d-flex mt-4 ">
                      <v-spacer></v-spacer>
                      <router-link to="/password/reset" style="color:#e83e8c">
                          <b>Lupa Password？</b> 
                      </router-link>
                  </div>
                  <!-- <div class="d-flex mb-6">
                      <v-spacer></v-spacer>
                      <router-link to="/password/init" style="color:#e83e8c">
                          <b>初めてご利用の方</b> 
                      </router-link>
                  </div> -->
                  
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
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>

    export default {
        name: 'AdminLogin',
        data(){
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
                timeout: 7500
            }
        },
        mounted(){
          this.$store.dispatch('setOverlay', false)
        },
        methods: {
            clear(){
              this.email = ''
              this.password = ''
            },
            async submit(){          

              this.loading = true

              let user_id = this.email;
			        let password = this.password;

              this.$store.dispatch('setOverlay', true)

              if (this.email.trim() === '' || this.password.trim() === '') {
                  this.$store.dispatch('setOverlay', false)

                  this.snackbar = {
                    color: "red text-white",
                    icon: "mdi-checkbox-marked-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: "Please Fill Email and Password",
                    visible: true
                  }; 

                  return false
                }

              // this.$store
              // .dispatch("loginUser", { user_id, password })
              // .then((res) => {
                this.$store.dispatch('setOverlay', false)
                this.$router.push('/staff');                
              // })
              // .catch((err) => {
              //   this.$store.dispatch('setOverlay', false)
              //   this.snackbar = {
              //     color: "error",
              //     icon: "mdi-alert-circle",
              //     mode: "multi-line",
              //     position: "top",
              //     timeout: 7500,
              //     title: "Error",
              //     text: err,
              //     visible: true
              //   };
              // });
            }
        }
    }
</script>