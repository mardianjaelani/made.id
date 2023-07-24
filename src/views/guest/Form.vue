<template>
    <v-container style="max-width: 35em; padding-top: 8em !important;">
        <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="8">
                <h4 class="text-center">
                    {{ $t("labels.pleaseFullFileForms") }}
                </h4>
            </v-col>
        </v-row>
        <v-row class="mt-8">
            <v-col cols="12" xs="12" sm="12" md="12" class="pt-0 pb-0">
                <v-card class="p-3 rounded-xl">
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" xs="12" sm="12" md="12" class="pt-0 pb-0">
                                    <div class="d-flex">
                                        <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.fullname") }}</h6>
                                        <v-text-field
                                            solo
                                            :label="$t('labels.fullname')"
                                            persistent-hint
                                            required
                                            v-model="name"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>
                                    </div>    
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12" class="pt-0 pb-0">
                                    <div class="d-flex">
                                        <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.tel") }}</h6>
                                        <v-text-field
                                            solo
                                            :label="$t('labels.tel')"
                                            persistent-hint
                                            required
                                            v-model="tel"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>
                                    </div>    
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
        <v-row justify="center" class="mt-lg-12">
            <v-col cols="12" xs="12" sm="12" md="10">
                <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#e83e8c" @click="savePatient()">{{$t('buttons.next')}}</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { Icon } from '@iconify/vue2';

export default {
    components: {
        Icon,
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
            name: '',
            tel: ''
        }
    },
    methods:{
        savePatient(){
            if (this.name === '' || this.tel === '') {

                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Please Full File Forms',
                    visible: true
                };
                return false;

            } else {
                var data = {
                    name: this.name,
                    tel: this.tel
                }

                this.$store.dispatch('setBookPatient', data)
                // console.log(this.$store.state.patient);

                this.$router.push('/booking/info')
            }                
        }
    },
    mounted() {

    },
}
</script>
