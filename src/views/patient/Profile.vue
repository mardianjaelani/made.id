<template>
    <v-container class="pl-lg-5 pr-lg-5 mt-lg-5" style="max-width: 100em;padding-bottom: 100px;">
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto rounded-xl" style="border-top: 3px solid #e83e8c;">
                    <v-card-text>
                        <validation-observer
                            ref="observer"
                        >
                            <form @submit.prevent="submitProfile">
                                <v-container class="pl-lg-5 pr-lg-5 mt-lg-5">
                                    <v-row>
                                        <v-col cols="12" xs="12" sm="12" md="12">
                                            <h6  class="text-weight-bold">ID : {{id}}</h6>
                                            <h6  class="text-weight-bold">{{ $t("labels.fullname") }} : {{$store.state.user.name}}</h6>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-lg-5">
                                        <v-col cols="12" xs="12" sm="6" md="4" class="pt-0 pb-0">
                                            <h6 class="pink-heading">郵便番号＊ （ハイフンなし）</h6>
                                            <validation-provider
                                            v-slot="{ errors }"
                                            name="郵便番号は必須です"
                                            rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.zipCode')"
                                                    persistent-hint
                                                    required
                                                    v-model="zip_code"
                                                    :error-messages="errors"
                                                    class="ma-0 pa-0 mr-3"
                                                >
                                                <template slot="append-outer">
                                                    <v-btn class="rounded-l text-white p-4 text-h6 text-right" color="#e83e8c">
                                                        <v-icon>
                                                            mdi-magnify
                                                        </v-icon>
                                                    </v-btn>
                                                </template>
                                                </v-text-field>                                   
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="4" class="pt-0 pb-0">
                                            <h6 class="pink-heading">都道府県＊</h6>
                                            <validation-provider
                                            v-slot="{ errors }"
                                            name="都道府県は必須です"
                                            rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.prefecture')"
                                                    persistent-hint
                                                    required
                                                    v-model="prefecture"
                                                    :error-messages="errors"
                                                    class="ma-0 pa-0"
                                                ></v-text-field>
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="4" class="pt-0 pb-0">
                                            <h6 class="pink-heading">市区町村＊</h6>
                                            <validation-provider
                                            v-slot="{ errors }"
                                            name="市区町村は必須です"
                                            rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.city')"
                                                    persistent-hint
                                                    required
                                                    v-model="city"
                                                    :error-messages="errors"
                                                    class="ma-0 pa-0"
                                                ></v-text-field>
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                            <h6 class="pink-heading">住所＊</h6>
                                            <validation-provider
                                            v-slot="{ errors }"
                                            name="住所は必須です"
                                            rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.streen')"
                                                    persistent-hint
                                                    required
                                                    v-model="street"
                                                    :error-messages="errors"
                                                    class="ma-0 pa-0"
                                                ></v-text-field>
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                            <h6 class="pink-heading">{{ $t("labels.building") }}</h6>
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.building')"
                                                    persistent-hint
                                                    v-model="building"
                                                    class="ma-0 pa-0"
                                                ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                            <h6 class="pink-heading">電話番号＊（ハイフンなし）</h6>
                                            <validation-provider
                                            v-slot="{ errors }"
                                            name="電話番号は必須です"
                                            rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.tel')"
                                                    persistent-hint
                                                    required
                                                    v-model="tel"
                                                    :error-messages="errors"
                                                    class="ma-0 pa-0"
                                                ></v-text-field>
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                            <h6 class="pink-heading">連絡方法＊</h6>
                                            <validation-provider
                                            v-slot="{ errors }"
                                            name="連絡方法は必須です"
                                            rules="required"
                                            >
                                            <v-autocomplete
                                                clearable
                                                solo
                                                v-model="contact_method"
                                                :items="contact_methods"
                                                item-value="value"
                                                item-text="label"
                                                :label="$t('labels.contactMethod')"
                                                :error-messages="errors"
                                                class="ma-0 pa-0"
                                                disabled
                                            ></v-autocomplete>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="center" class="mt-lg-5">
                                        <v-col cols="6" xs="6" sm="3" md="2">
                                            <v-btn block class="rounded-l p-4 text-h6" color="#fff" @click="$router.go(-1)">{{$t('buttons.back')}}</v-btn>
                                        </v-col>
                                        <v-col cols="6" xs="6" sm="3" md="2">
                                            <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#e83e8c">{{$t('buttons.save')}}</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </form>
                        </validation-observer>
                    </v-card-text>
                </v-card>
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
        message: '{_field_}',
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
                zip_code: '',
                prefecture: '',
                city: '',
                street: '',
                building: '',
                tel: '',
                contact_methods: [
                    {
                        label: 'Line',
                        value: 'line'
                    },
                    {
                        label: 'Mail',
                        value: 'mail'
                    },
                    {
                        label: 'SMS',
                        value: 'sms'
                    },
                ],
                contact_method: 'line',
                id: ''
            }
        },
        mounted() {
            this.getProfile()
        },
        methods:{
            async submitProfile(){
                await axios.post(`${process.env.VUE_APP_URL}/api/v1/update_profile`, {
                    'zip': this.zip_code,
                    'prefecture': this.prefecture,
                    'city': this.city,
                    'street': this.street,
                    'building': this.building,
                    'contact' : this.contact_method,
                    'mobile': this.tel
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
                        this.getProfile()
                        this.snackbar = {
                            color: "primary text-white",
                            icon: "mdi-checkbox-marked-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Success",
                            text: "Successfully Update Data",
                            visible: true
                        };
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
                        this.zip_code = res.data.value.zip
                        this.prefecture = res.data.value.prefecture
                        this.city = res.data.value.city
                        this.street = res.data.value.street
                        this.building = res.data.value.building
                        this.tel = res.data.value.mobile
                        this.id = res.data.value.id
                        // this.contact_method = res.data.value.contact
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            },
        },        
    }
</script>