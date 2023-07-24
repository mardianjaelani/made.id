<template>
    <v-container style="max-width: 35em; padding-top: 6em !important;">
        <v-row>
            <v-col cols="12" xs="12" sm="12" md="12">
                <v-card class="p-3 rounded-l">
                    <v-card-text>
                        <v-container>
                            <v-row align="center" justify="center">
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <h4>
                                        {{ $t("labels.ThankYouForYourbooking") }} 
                                    </h4>
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <div class="d-flex">
                                        <h6 class="mr-5">
                                            {{ $t("labels.BOOKING_DATE_TIME") }} 
                                        </h6>
                                        <h6>
                                            {{this.$store.state.book_date_time}}
                                        </h6>
                                    </div>
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <h4>
                                        {{ $t("labels.ChooseYourContactMethod") }} 
                                    </h4>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#06c755" @click="line()">{{$t('buttons.ConnectByLine')}}</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#9dc3e6" @click="sms()">{{$t('buttons.ConnectBySMS')}}</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#ffd966" @click="mail()">{{$t('buttons.ConnectByMail')}}</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
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
            tel: '', 
            date: '',
            start_hours: '',
            end_hours: '',
        }
    },
    methods:{
        line(){
            this.$store.dispatch('setBookDate', null)
            this.$store.dispatch('setBookPatient', null)
            this.$store.dispatch('setBookDateTime', null)

            this.$router.push('/booking')             

        },
        sms(){
            this.$store.dispatch('setBookDate', null)
            this.$store.dispatch('setBookPatient', null)
            this.$store.dispatch('setBookDateTime', null)

            this.$router.push('/booking')    
        },
        mail(){
            this.$store.dispatch('setBookDate', null)
            this.$store.dispatch('setBookPatient', null)
            this.$store.dispatch('setBookDateTime', null)

            this.$router.push('/booking')    
        }
    },
    mounted() {
    },
}
</script>
