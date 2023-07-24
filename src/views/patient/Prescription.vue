<template>
    <v-container class="pl-lg-5 pr-lg-5 mt-lg-5" style="max-width: 100em;padding-bottom: 100px;">
        <v-row class="mt-2" align="center" justify="center">
            <v-col cols="12" xs="12" sm="6" md="6">
                <v-autocomplete
                    class="mt-2 rounded-xl"
                    solo
                    v-model="prescription"
                    :items="prescriptions"
                    item-value="month"
                    item-text="month"
                    :return-object="true"
                    height="65"
                    label="Month"
                    @change="(event) => getMonth(event)"
                    clearable
                ></v-autocomplete>
            </v-col>
        </v-row>
        <v-row v-show="show_prescription" class="mt-2" align="center" justify="center">
            <v-col cols="12" xs="12" sm="6" md="6">
                <v-card class="mx-auto border-12 p-3" style="border-top: 3px solid #e83e8c;">
                    <v-card-text>
                        <p class="mb-0 text-h6">{{ prescription_detail ? prescription_detail.month : date }}</p>

                        <v-card class="border-12 p-3 mt-3" v-for="(detail, i) in prescription_details" :key="i">
                            <v-row class="mt-1" v-if="detail.course">
                                <v-col xs="12" sm="12" md="3" class="pb-0 pt-0 col-12">
                                    <h6 class="pink-heading mr-2">{{$t('labels.subscriptionCourses')}} : </h6>
                                </v-col>
                                <v-col xs="12" sm="12" md="9" class="pb-0 pt-0 col-12">
                                    <h6>{{ detail ? detail.course : '-' }}</h6>
                                </v-col>
                            </v-row>
                            <v-row class="mt-1" v-if="detail.single">
                                <v-col xs="12" sm="12" md="3" class="pb-0 pt-0 col-12">
                                    <h6 class="pink-heading mr-2">単品 : </h6>
                                </v-col>
                                <v-col xs="12" sm="12" md="9" class="pb-0 pt-0 col-12">
                                    <h6>{{ detail ? detail.single : '-' }}</h6>
                                </v-col>
                            </v-row>
                            <v-row class="mt-1" v-if="detail.medicines.length > 0">
                                <v-col xs="12" sm="12" md="3" class="pb-0 pt-0 col-12">
                                    <h6 class="pink-heading mt-6">{{$t('labels.medicine')}} : </h6>
                                </v-col>
                                <v-col xs="12" sm="12" md="9" class="pb-0 pt-0 col-12" v-if="detail">

                                    <v-list rounded class="pl-0 pr-0">
                                        <v-list-item-group
                                            color="primary"
                                        >
                                            <v-list-item
                                            v-for="(medicine, i) in detail.medicines" :key="i"
                                            class="pt-0 pb-0 mb-0 mt-0"
                                            >
                                            <v-list-item-icon>
                                                <v-icon>mdi-pill</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    <div class="d-flex">
                                                        <p class="ma-2">{{medicine.date}}</p>
                                                        <p class="ma-2">{{medicine.name}}</p>
                                                        <p class="ma-2">{{medicine.amount}}</p>
                                                        <p class="ma-2">{{medicine.unit}}</p>
                                                    </div>
                                                </v-list-item-title>
                                                    
                                            </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-col>
                            </v-row>
                            <v-row class="mb-1" v-if="detail.items.length > 0">
                                <v-col xs="12" sm="12" md="3" class="pb-0 pt-0 col-12">
                                    <h6 class="pink-heading mt-6">{{$t('labels.item')}} : </h6>
                                </v-col>
                                <v-col xs="12" sm="12" md="9" class="pb-0 pt-0 col-12" v-if="detail">
                                    <v-list rounded>
                                        <v-list-item-group
                                            color="primary"
                                        >
                                            <v-list-item
                                            v-for="(item, i) in detail.items" :key="i"
                                            class="pt-0 pb-0 mb-0 mt-0"
                                            >
                                            <v-list-item-icon>
                                                <v-icon>mdi-needle</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    <div class="d-flex">
                                                        <p class="ma-2">{{item.date}}</p>
                                                        <p class="ma-2">{{item.name}}</p>
                                                        <p class="ma-2">{{item.amount}}</p>
                                                        <p class="ma-2">{{item.unit}}</p>
                                                    </div>
                                                </v-list-item-title>
                                            </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-col>
                            </v-row> 
                            <v-row>
                                <v-col xs="12" sm="12" md="3" class="pb-0 pt-0 col-12">
                                    <h6 class="pink-heading" style="font-size:0.9rem">{{$t('labels.price')}} : </h6>
                                </v-col>
                                <v-col xs="12" sm="12" md="9" class="pb-0 pt-0 col-12">
                                    <h6>{{ detail ? $store.getters.convertToCurrencyUs(detail.price) : '-' }} 円</h6>
                                </v-col>
                            </v-row>
                        </v-card>
                        
                        <p class="text-center mt-12">
                            {{$t('labels.prescriptionMessage')}}
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" class="mt-lg-5">
            <v-col cols="6" xs="6" sm="3" md="2">
                <v-btn block class="rounded-l p-4 text-h6" color="#fff" @click="$router.go(-1)">{{$t('buttons.back')}}</v-btn>
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
                firstLoad: false,
                show_month: true,
                show_prescription: false,
                theme: {
                    isDark: false
                },
                items: [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}],
                prescriptions: [],
                prescription_detail: null,
                selectedItem: 1,
                date: this.formatDate(new Date().toISOString().substr(0, 7)),
                prescription: {
                    month: this.formatDate(new Date().toISOString().substr(0, 7))
                },
                prescription_details: []
            }
        },
        mounted() {
            this.getPrescription()
            this.prescription = {id: 1, month: '2022/10'};
            // this.prescription = {
            //     month: this.formatDate(new Date().toISOString().substr(0, 7))
            // }
        },
        methods:{
            parseDate (date) {
                if (!date) return null

                const [year, month] = date.split('/')
                return `${year}-${month.padStart(2, '0')}`
            },
            formatDate (date) {
                if (!date) return null

                const [year, month] = date.split('-')
                return `${year}/${month}`
            },
            submitProfile(){
                
            },
            getMonth(value){
                this.prescription_detail = value
                this.show_prescription = true
                this.show_month = false
                console.log(value);
                this.prescription_details = value ? value.prescriptions : []

            },
            async getPrescription(){
                await axios.get(`${process.env.VUE_APP_URL}/api/v1/prescriptions`, { 
                    headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutUser").then(() => {
                            this.$router.push('/')
                        });
                    } else {
                        this.prescriptions = res.data.value

                        this.prescriptions.sort(function (a, b) {
                            var key1 = new Date(a.month + '/01');
                            var key2 = new Date(b.month + '/01');
                            console.log(key1, key2);
                            if (key1 > key2) {
                                return -1;
                            } else if (key1 == key2) {
                                return 0;
                            } else {
                                return 1;
                            }
                        });

                        if (this.prescriptions.length > 0) {
                            this.prescription = this.prescriptions[0]
                            this.prescription_detail = this.prescriptions[0]
                            this.prescription_details = this.prescriptions[0] ? this.prescriptions[0].prescriptions : []
                            this.show_prescription = true
                            this.show_month = false
                        }

                        this.firstLoad = false

                        console.log(this.prescriptions);
                    }
                }).catch(err => {
                    console.log(err.response);
                })
            }
        },   
        watch: {
            date (val) {
                this.date = this.formatDate(this.date)
            },
        }     
    }
</script>

<style scoped>
.v-list-item {
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 48px;
    outline: none;
    padding: 0 0px !important;
    position: relative;
    text-decoration: none;
}
</style>