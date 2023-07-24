<template>
    <v-container style="max-width: 35em; padding-top: 6em !important;">
        <v-row >
            <v-col cols="12" xs="12" sm="12" md="12">
                <v-card class="p-2 rounded-l">
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <h4>
                                        Booking Info
                                    </h4>
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <div class="d-flex">
                                        <h6 class="mr-5">
                                            {{ $t("labels.BOOKING_DATE_TIME") }} 
                                        </h6>
                                        <h6>
                                            {{ date }} {{start_hours}} - {{end_hours}}
                                        </h6>
                                    </div>
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <div class="d-flex">
                                        <h6 class="mr-5">
                                            {{ $t("labels.fullname") }}  : 
                                        </h6>
                                        <h6>
                                            {{ name }}
                                        </h6>
                                    </div>
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12">
                                    <div class="d-flex">
                                        <h6 class="mr-5">
                                            {{ $t("labels.tel") }}  : 
                                        </h6>
                                        <h6>
                                            {{ tel }}
                                        </h6>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" xs="12" sm="12" md="12">
                <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#e83e8c" @click="savePatient()">{{$t('buttons.confirm')}}</v-btn>
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
        savePatient(){
            this.$router.push('/booking/thank-you')             
        },
        getData(){
            var datas = this.$store.state.book_date;
            
            this.name = this.$store.state.patient.name
            this.tel = this.$store.state.patient.tel

            // console.log(datas);
            var start = []
            var end = []

            for (let index = 0; index < datas.length; index++) {
                if (this.date != datas[index].date) {
                    this.date = datas[index].date
                }

                start.push(datas[index].start)
                end.push(datas[index].end)

            }

            start.sort(function (a, b) {
                var key1 = new Date(a);
                var key2 = new Date(b);

                if (key1 < key2) {
                    return -1;
                } else if (key1 == key2) {
                    return 0;
                } else {
                    return 1;
                }
            });

            end.sort(function (a, b) {
                var key1 = new Date(a);
                var key2 = new Date(b);

                if (key1 > key2) {
                    return -1;
                } else if (key1 == key2) {
                    return 0;
                } else {
                    return 1;
                }
            });
            
            // console.log(this.date);
            // console.log(start[0].substr(11, 19));
            // console.log(end[0].substr(11, 19));

            this.start_hours = start[0].substr(11, 19)
            this.end_hours = end[0].substr(11, 19)

            var datetime = this.date + " " + this.start_hours + " - " + this.end_hours

            this.$store.dispatch('setBookDateTime', datetime)

            // console.log(this.$store.state.book_date_time);
        }
    },
    mounted() {
        this.getData()
    },
}
</script>
