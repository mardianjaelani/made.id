<template>
    <v-container style="padding-bottom:80px">
        <v-row>
            <v-col cols="12">
                <v-breadcrumbs :items="breadcumbs">
                    <template v-slot:item="{ item }">
                        <v-breadcrumbs-item
                            :to="item.href"
                            class="text-subtitle-2 crumb-item"
                            :disabled="item.disabled"
                            exact
                        >
                            {{ item.text }}
                        </v-breadcrumbs-item>
                    </template>
                </v-breadcrumbs>
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
            <v-col cols="12">
                <v-card class="elevation-8 rounded-l" style="border-top: 3px solid #e83e8c;">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" xs="12" sm="6" md="6">
                                <h6>
                                    {{ $t('labels.uploadSetting') }}
                                </h6>
                                <div class="d-flex">
                                    <input class="mt-8" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                                    <v-btn
                                        class="mr-2 mt-6 p-2 text-white"
                                        color="green"
                                        elevation="2"
                                        large
                                        @click="saveFile()"
                                    >
                                    <v-icon>
                                        mdi-upload
                                    </v-icon>
                                    {{ $t('buttons.upload') }}</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row justify="center" v-show="display" class="mt-12">
                            <v-col xs="12" sm="8" md="4">
                                <v-card class="elevation-8 rounded-xl" style="border-top: 3px solid #e83e8c;">
                                    <v-card-title >
                                        <v-btn
                                            class="mx-2"
                                            fab
                                            small
                                            color="#e83e8c;"
                                            @click="close()"
                                        >
                                            <v-icon dark>
                                                mdi-close
                                            </v-icon>
                                        </v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row align="center" justify="center">
                                            <v-col xs="12" sm="6" md="6">
                                                <h6 class="text-center">登録</h6>
                                                <h3 class="text-center">{{registered_count}} <span style="font-size:18px">行</span></h3>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>
<script>

    export default {
      data() {
          return {
            breadcumbs: [
                {
                text: 'ホーム',
                disabled: false,
                href: '/staff/dashboard',
                },
                {
                text: '設定',
                disabled: true,
                href: 'breadcrumbs_link_2',
                },
                {
                text: '来院者アップロード',
                disabled: true,
                href: 'breadcrumbs_link_2',
                }
            ],
            file: '',
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
            display: false,
            registered_count: ''
          }
      },
      mounted() {
        this.$store.dispatch('setOverlay', false)
      },
      methods:{
        close(){
            $("#file").val('');
            this.display = false
            this.registered_count = ''
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        saveFile(){
            if (this.file === '') {
                this.snackbar = {
                  color: "error text-white",
                  icon: "mdi-alert-circle",
                  mode: "multi-line",
                  position: "top",
                  timeout: 7500,
                  title: "Error",
                  text: "File required",
                  visible: true
                };
                return false;
            } else{
                let formData = new FormData();
                formData.append('file', this.file);

                this.$store.dispatch('setOverlay', true)

                axios.post(`${process.env.VUE_APP_URL}/api/v1/upload_patient_info`, formData , 
                { 
                headers: { 'Authorization': `Bearer ${this.$store.getters.isTokenAdmin}`, 'Content-Type': 'multipart/form-data' } 
                }).then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutAdmin").then(() => {
                            this.$router.push('/staff/login')
                        });
                    } else {
                        this.$store.dispatch('setOverlay', false)
                        this.file = ''
                        this.snackbar = {
                            color: "success text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Success",
                            text: "Successfully upload File",
                            visible: true
                        };
                        $("#file").val('');
                        this.display = true
                        this.registered_count = res.data.value.registered_count
                    }
                        
                }).catch(err => {
                    console.log(err.response);
                    this.$store.dispatch('setOverlay', false)
                })
            }
        }
      },
      watch: {
      }
    }
  </script>
  