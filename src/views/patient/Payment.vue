<template>
    <v-container class="pl-lg-5 pr-lg-5 mt-lg-5" style="max-width: 100em;padding-bottom: 100px;">
        <v-row justify="center" class="mt-lg-5" align="center" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="8" md="6">
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
                <v-card class="rounded-xl p-3" style="border-top: 3px solid #e83e8c;">
                    <v-card-text>
                        <v-container>
                            <v-row justify="center" align="center">
                                <v-col cols="12" xs="12" sm="8" md="6">
                                    <h6 class="text-center" v-if="payment_method === 'card'">{{$t('labels.paymentMethod')}} :  <b>クレジットカード</b>  </h6>
                                    <h6 class="text-center" v-else>{{$t('labels.paymentMethod')}} :  <b>{{payment_method}}</b></h6>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col xs="12" sm="8" md="8">
                                    <v-radio-group v-model="payment">
                                        <!-- <v-radio
                                            class="mt-3"
                                            :label="$t('labels.rakten_pay')"
                                            value="rakten_pay"
                                            disabled
                                        ></v-radio>
                                        <v-radio
                                            class="mt-3"
                                            :label="$t('labels.career')"
                                            value="career"
                                            disabled
                                        ></v-radio> -->
                                        <v-radio
                                            class="mt-3"
                                            :label="$t('labels.card')"
                                            value="card"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="6" md="6">
                                    <v-img
                                    lazy-src="../../assets/card_explanation_fix-1.png"
                                    src="../../assets/card_explanation_fix-1.png"
                                    ></v-img>
                                    <!-- <router-link to="/patient/payment/help" style="color:rgba(0, 0, 0, 0.6)">
                                        <h6 class="text-center">クレジットカードの登録、編集はこちらから</h6>
                                    </router-link> -->
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="8" md="8">
                                    <p style="font-weight:600">
                                        ・VISA、Master など【ブランド】がついた、デビットカード・プリペイドカードの場合、口座残高内・チャージ金額内で、クレジットカード同様ご利用いただくことができます。
                                    </p>
                                    <p style="font-weight:600">
                                        ・ご利用状況の問題や与信限度額の超過、デビットカードであれば残高不足等で登録が完了出来ない場合が御座います。その際は、ご契約のクレジットカード会社様に直接問い合わせ頂くか、クレジットカードの変更をお願い致します。
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row justify="center" class="mt-lg-5">
                                <v-col cols="6" xs="6" sm="3" md="3">
                                    <v-btn block class="border-12 p-4 text-h6" color="#fff" @click="$router.go(-1)">{{$t('buttons.back')}}</v-btn>
                                </v-col>
                                <v-col cols="6" xs="6" sm="3" md="3">
                                    <v-btn type="button" block class="border-12 text-white p-4 text-h6" color="#e83e8c" @click="updatePaymentMenthod()">{{$t('buttons.next')}}</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" class="mt-lg-5" align="center" v-show="displayPayment === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="8" md="6">
                <v-card class="rounded-l p-3" style="border-top: 3px solid #e83e8c;" v-if="payment === 'card'">
                    <v-card-text>
                        <h6>{{$t('labels.paymentMethod')}} : {{payment}}</h6>
                        <h3 class="text-center mt-10 mb-5">下記リンクからカード番号を編集してください。</h3>
                        <v-icon @click="copy">
                            mdi-content-copy
                        </v-icon>
                        <textarea
                        class="p-2 mt-1"
                        style="width:100%; height: 150px; border: 1px solid #afadad; border-radius:12px" 
                        v-on:focus="$event.target.select()" 
                        ref="myinput" 
                        readonly 
                        :value="url_link ? url_link : 'Pls wait...'"/>

                        <div class="d-flex">
                            <v-spacer></v-spacer>
                            <a class="rounded-l text-white mt-0 btn btn-secondary btn-sm" target="_blank" :href="url_link ? url_link : ''">{{$t('buttons.edit')}}</a>
                        </div>
                    </v-card-text>
                    <v-row justify="center" class="mt-5">
                        <v-col cols="6" xs="6" sm="3" md="3">
                            <v-btn block class="border-12 p-4 text-h6" color="#fff" @click="back()">{{$t('buttons.back')}}</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card class="rounded-l p-3" style="border-top: 3px solid #e83e8c;" v-if="payment === 'rakten_pay'">
                    <v-card-text>
                        <v-container>
                            <v-row justify="center">
                                <v-col xs="8" sm="8" md="8">
                                    <v-img
                                        src="../../assets/qr_code.png"
                                        lazy-src="../../assets/qr_code.png"
                                        aspect-ratio="1"
                                        max-height="250"
                                        max-width="250"
                                        class="grey lighten-2 border-12 mx-auto"
                                        position="center center"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                            >
                                                <v-progress-circular
                                                indeterminate
                                                color="grey lighten-5"
                                                ></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-row class="mt-lg-5" justify="center">
                        <v-col cols="6" xs="6" sm="3" md="3">
                            <v-btn block class="border-12 p-4 text-h6" color="#fff" @click="back()">{{$t('buttons.back')}}</v-btn>
                        </v-col>
                        <v-col cols="6" xs="6" sm="3" md="3">
                        </v-col>
                    </v-row>
                </v-card>
                <v-card class="rounded-l p-3" style="border-top: 3px solid #e83e8c;" v-if="payment === 'career'">
                    <v-card-text>
                        <v-container>
                            <v-row justify="center" class="mt-lg-5">
                                <v-col xs="8" sm="8" md="8">
                                    <h6 class="text-center">{{$t('labels.paymentMethod')}} : {{payment}}</h6>
                                    <v-autocomplete
                                        clearable
                                        solo
                                        v-model="career"
                                        :items="careers"
                                        item-value="value"
                                        item-text="label"
                                        :label="$t('labels.career')"
                                        class="mt-5 border-12"
                                        height="60"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-row class="mt-3" justify="center">
                        <v-col cols="6" xs="6" sm="3" md="3">
                            <v-btn block class="border-12 p-4 text-h6" color="#fff" @click="back()">{{$t('buttons.back')}}</v-btn>
                        </v-col>
                        <v-col cols="6" xs="6" sm="3" md="3">
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
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
                error: true,
                errors: [],
                no_payment: '',
                payment_method: '',
                payment: '',
                display: 'block',
                displayPayment: 'none',
                careers: [
                    {
                        label: "KDDI",
                        value: "KDDI"
                    },
                    {
                        label: "DOCOMO",
                        value: "DOCOMO"
                    },
                    {
                        label: "AU",
                        value: "AU"
                    },
                ],
                career: '',
                url_link: '',
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
                user: null
            }
        },
        mounted() {
            this.getPaymentMethod()
            this.getProfile()
        },
        methods:{
            back(){
                this.display = 'block'
                this.displayPayment = 'none'
                this.getPaymentMethod()
            },
            async updatePaymentMenthod(){
                await axios.post(`${process.env.VUE_APP_URL}/api/v1/update_payment_method`, {
                    'payment_method': this.payment
                }, { 
                    headers: { Authorization: `${this.$store.getters.isTokenUser}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutUser").then(() => {
                            this.$router.push('/')
                        });
                    } else {
                        this.generateLink()

                        if (this.payment === 'card') {
                            this.display = 'block'
                            this.displayPayment = 'none'
                        } else {
                            this.display = 'none'
                            this.displayPayment = 'block'
                        }
                        
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            },
            async generateLink(){
                this.url_link = ''
                await axios.post(`${process.env.VUE_APP_URL}/api/v1/card_link_to_edit`, {
                    'patient_id': this.user ? parseInt(this.user.id) : ''
                }, { 
                    headers: { Authorization: `${this.$store.getters.isTokenUser}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutUser").then(() => {
                            this.$router.push('/')
                        });
                    } else if(res.data.error_message){
                        this.snackbar = {
                            color: "error text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: res.data.error_message,
                            visible: true
                        };
                    } else {
                        this.url_link = res.data.value.link
                        window.open(this.url_link, '_blank').focus();
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            },  
            async getPaymentMethod(){
                await axios.get(`${process.env.VUE_APP_URL}/api/v1/payment_method`, { 
                    headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutUser").then(() => {
                            this.$router.push('/')
                        });
                    } else {
                        this.payment_method = res.data.value
                        this.payment = res.data.value
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            },
            async getProfile(){
                await axios.get(`${process.env.VUE_APP_URL}/api/v1/profile`, { 
                    headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutUser").then(() => {
                            this.$router.push('/')
                        });
                    } else {
                        this.user = res.data.value
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            },
            copy() {
                this.$refs.myinput.focus();
                document.execCommand('copy');

                this.snackbar = {
                    color: "primary text-white",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Copied",
                    visible: true
                };
            },
        },        
    }
</script>