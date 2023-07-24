<template>
    <v-container class="pl-lg-5 pr-lg-5 mt-lg-5" style="max-width: 100em;padding-bottom: 100px;">
        <v-row justify="center" class="mt-lg-5" align="center">
            <v-col cols="12" xs="12" sm="8" md="6">
                <v-card class="rounded-l" style="border-top: 3px solid #e83e8c;">
                    <v-card-text>
                        <div class="d-flex">
                            <h6>{{$t('labels.scheduledShipmentDate')}}</h6>
                            <v-spacer></v-spacer>
                            <h6>
                                ( 基準日 : {{date ? date.standard_date : ''}}, {{ date ? date.standard_day_of_week : ''  }} )
                            </h6>
                        </div>
                        <h1 class="text-center mt-5 mb-8">{{date ? date.shipping_date : ''}} <span class="ml-5" style="font-size:1.5rem">( {{ date ? date.shipping_day_of_week : '' }} )</span> </h1>
                        <div class="d-flex">
                            <!-- <h6 class="mt-5">
                            {{$t('labels.numberOfDaysToDelay')}} 
                            </h6> -->
                            <v-spacer></v-spacer>
                            <h6>( 次回日 : {{date ? date.next_shipping_date : ''}},  {{ date ? date.next_shipping_day_of_week : ''  }})</h6>
                        </div>
                        <div class="d-flex mt-5">
                            <h6>
                            {{$t('labels.numberOfDaysToDelay')}} 
                            </h6>
                        </div>
                        <v-autocomplete
                            clearable
                            solo
                            v-model="ship"
                            :items="ships"
                            item-value="value"
                            item-text="label"
                            :label="$t('labels.scheduledShipmentDate')"
                            @change="(event) => getscheduledShipmentDate(event)"
                        ></v-autocomplete>
                        <h1 class="text-center mt-5" v-if="ship != '0'">{{date_value}} <span v-if="standart_day_of_week" class="ml-5" style="font-size:1.5rem">( {{ standart_day_of_week }} )</span></h1>
                        <h1 class="text-center mt-5" v-else>{{date ? date.standard_date : ''}} <span class="ml-5" style="font-size:1.5rem">( {{ date ? date.standard_day_of_week : ''  }} )</span></h1>
                    </v-card-text>
                    <p class="mt-12 ml-5 mr-5 p-3 text-center">
                        ７日以上遅らせて欲しい場合は、LINEでご連絡をお願いします。 <br>
                        ※発送予定日の3日18時を過ぎて発送予定日の変更、解約の問い合わせが発生した場合、<br>
                        翌月からの変更、解約になる事をご了承下さい。 解約の手続きは、こちらから <br>
                        https://form.run/@cancel-1655180624
                        <!-- {{$t('labels.shippingMessage')}} -->
                    </p>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" class="mt-lg-5">
            <v-col cols="6" xs="6" sm="3" md="2">
                <v-btn block class="rounded-l p-4 text-h6" color="#fff" @click="$router.go(-1)">{{$t('buttons.back')}}</v-btn>
            </v-col>
            <v-col cols="6" xs="6" sm="3" md="2">
                <v-btn type="button" block class="rounded-l text-white p-4 text-h6" color="#e83e8c" @click="submitDestinatiion()">{{$t('buttons.save')}}</v-btn>
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

    export default {
        components: {
            Icon
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
                prescriptions: [],
                firstLoad: true,
                theme: {
                    isDark: false
                },
                items: [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}],
                ships: [
                    {
                        label: "延期を取り消し基準日に戻す",
                        value: "0"
                    },
                    {
                        label: "1 日",
                        value: "1"
                    },
                    {
                        label: "2 日",
                        value: "2"
                    },
                    {
                        label: "3 日",
                        value: "3"
                    },
                    {
                        label: "4 日",
                        value: "4"
                    },
                    {
                        label: "5 日",
                        value: "5"
                    },
                    {
                        label: "6 日",
                        value: "6"
                    },
                    {
                        label: "7 日",
                        value: "7"
                    }
                ],
                ship: '',
                date: '',
                date_value: '',
                next_shipping_date: '',
                standart_day_of_week: ''
            }
        },
        mounted() {
            this.getShippingDate()
        },
        methods:{
            getscheduledShipmentDate(value){
                this.standart_day_of_week = ''
                const day = new Date(this.date ? this.date.shipping_date : '')
                var date = day.setDate(day.getDate() + parseInt(value))
                var date_fix = (new Date(date - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
                this.date_value = this.formatDate(date_fix)
                this.standart_day_of_week = new Intl.DateTimeFormat('ja-jp', { weekday: 'long'}).format(date)
            },
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${year}/${month}/${day}`
            },
            async submitDestinatiion(){
                if (this.ship === '0') {
                    console.log(this.ship);
                    this.resetShipping()
                } else {
                    await axios.post(`${process.env.VUE_APP_URL}/api/v1/postpone_shipping_date`, {
                        'count': parseInt(this.ship)
                    }, { 
                        headers: { Authorization: `${this.$store.getters.isTokenUser}` } 
                    })
                    .then(res => {
                        if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                            this.$store.dispatch("logoutUser").then(() => {
                                this.$router.push('/')
                            });
                        } else if (res.data.error_message) {
                            this.ship = ''
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
                            this.date_value = ''
                            this.ship = ''
                            this.getShippingDate()
                        }
                    }).catch(err => {
                        console.log(err.response);
                    })
                }
            },
            async resetShipping(){
                await axios.post(`${process.env.VUE_APP_URL}/api/v1/reset_shipping_date`, { 
                    headers: { Authorization: `${this.$store.getters.isTokenUser}` } 
                })
                .then(res => {
                    console.log(res.data);
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutUser").then(() => {
                            this.$router.push('/')
                        });
                    } else if (res.data.error_message) {
                        this.ship = ''
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
                        this.date_value = ''
                        this.ship = ''
                        this.getShippingDate()
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            },
            async getShippingDate(){
                await axios.get(`${process.env.VUE_APP_URL}/api/v1/shipping_date`, { 
                    headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutUser").then(() => {
                            this.$router.push('/')
                        });
                    } else {
                        console.log(res.data.value);
                        this.date = res.data.value
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            },
        },        
    }
</script>