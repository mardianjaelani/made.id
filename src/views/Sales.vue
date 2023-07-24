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
        </v-row>
        <v-row justify="center" class="mt-5" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="12" md="6">
                <h5 class="blue-lcd" style="font-weight:700">
                    
                    {{ $t("labels.period") }}
                </h5>
                <v-menu
                    ref="modal"
                    v-model="modal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        solo
                        v-model="period"
                        :label="$t('labels.period')"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        height="65"
                        class="ma-0 pa-0 border-12"
                        hide-details=true
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date"
                        type="month"
                        locale="ja"
                        no-title
                        :max="dateMax"
                        :allowed-dates="allowedMonths"
                        @input="updateData()"
                    ></v-date-picker>
                </v-menu>
            </v-col>
        </v-row>
        <v-row v-show="displayItem === 'block' ? true : false" class="mt-5">
            <v-col cols="12">
                <v-card class="elevation-12 rounded-l" style="border-top: 3px solid #e83e8c;">
                    <v-card-title >
                        <!-- <h6 style="font-weight:600">{{this.detailItem ? this.detailItem.patient_id : '' }}</h6> -->
                        <v-spacer></v-spacer>
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
                        <v-container>
                            <v-row align="center" justify="center">
                                <v-col cols="12" xs="12" sm="6" md="3">
                                    <div class="d-flex ml-10">
                                        <h5 class="mr-5">{{this.period}} {{ $t("labels.transferAmount") }}</h5>

                                        <h5>{{ sales_report ? sales_report.total_agency_profit : ''}}</h5>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5" align="center" justify="center">
                                <v-col cols="12" xs="12" sm="6" md="4">
                                    <h6 class="text-center">
                                        上記の金額より
                                        振込手数料を差し引いた金額をお振込み致します。
                                    </h6>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5">
                                <v-data-table :headers="header_details" :items="sales_reports" class="elevation-1 rounded-xl" page-count="5" :loading="loading" :items-per-page="5">
                                    <template v-slot:[`item.salon_name`]="{ item }">
                                        <td class="text-start pt-5" style="
                                                vertical-align: top;
                                            ">
                                            <p> {{item.salon_name}} </p>
                                        </td>
                                    </template>
                                    <template v-slot:[`item.break`]>
                                        <td class="text-start pt-12" style="
                                            vertical-align: top;
                                        ">
                                            <p> 内訳 </p>
                                        </td>
                                    </template>

                                    <template v-slot:[`item.number`]="{ item }">
                                        <div class="pt-12">
                                            <p class="pb-0" v-for="itm in item.break_down">
                                                {{ itm.number }}
                                            </p>
                                        </div>
                                    </template>

                                    <template v-slot:[`item.type`]="{ item }">
                                        <div class="pt-12">
                                            <p class="pb-0" v-for="itm in item.break_down">
                                                {{ itm.type }}
                                            </p>
                                        </div>
                                    </template>

                                    <template v-slot:[`item.amount`]="{ item }">
                                        <td class="text-start pt-5 pb-0 mb-0" style="
                                                vertical-align: top;
                                            ">
                                            <p> {{item.amount}} </p>

                                            <div>
                                                <p class="pb-0" v-for="itm in item.break_down">
                                                    {{ itm.amount }}
                                                </p>
                                            </div>
                                        </td>
                                    </template>
                                    <template v-slot:[`item.salon_profit`]="{ item }">
                                        <td class="text-start pt-5" style="
                                                vertical-align: top;
                                            ">
                                            <p> {{item.salon_profit}} </p>
                                            
                                        </td>
                                    </template>
                                    <template v-slot:[`item.agency_profit`]="{ item }">
                                        <td class="text-start pt-5" style="
                                                vertical-align: top;
                                            ">
                                            <p> {{item.agency_profit}} </p>
                                        </td>
                                    </template>
                                </v-data-table>
                            </v-row>
                        </v-container>
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
                    text: '売上管理',
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
                date: new Date().toISOString().substr(0, 7),
                dateMax: new Date().toISOString().substr(0, 7) + 1,
                period: '',
                menu: false,
                modal: false,
                display: 'block',
                displayItem: 'none',
                sales_report: null,
                sales_reports: [],
                loading: false,
                header_details: [
                    { text: 'サロン名', value: 'salon_name', sortable: false },
                    { text: '', value: 'break', sortable: false },
                    { text: '会計No', value: 'number', sortable: false },
                    { text: '区別', value: 'type', sortable: false },
                    { text: '売上金', value: 'amount', sortable: false },
                    { text: '売上日', value: 'sales_date', sortable: false },
                    { text: 'サロン様利益', value: 'salon_profit', sortable: false },
                    { text: '代理店様利益', value: 'agency_profit', sortable: false }
                ]
            }
        },
        mounted() {
            this.$store.dispatch('setOverlay', false)
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
            allowedMonths: (val) => {
                var last12Month = function() {
                    var dates = [];
                    var d = new Date()
                    var y = d.getFullYear()
                    var m = d.getMonth()

                    function padMonth(month){
                        if(month<10){
                            return '0'+month;
                        } else {
                            return month;
                        }
                    }

                    if( m === 11 ) {
                        for(var i=1; i<13; i++) {
                            dates.push(y+"-"+ padMonth(i));
                        }
                    } else {
                        for(var i=m+1; i<m+13; i++) {
                            if( (i%12) > m ) {
                                dates.push( (y-1) + "-" +  padMonth(i+1) );
                            } else {
                                dates.push( y + "-" + padMonth((i%12)+1) );
                            }
                        }
                    }
                    return dates;

                }

                var dates = last12Month();

                for (var i = 0; i < dates.length; i++) {
                    if (dates[i] == val){
                        return val
                    }
                }
            
            },
            close(){
                this.displayItem = 'none'
                this.display = 'block'
                this.period = ''
            },
            async updateData(){
                // console.log(this.formatDate(this.date));
                this.modal = false

                this.period = this.formatDate(this.date)

                this.$store.dispatch('setOverlay', true)

                await axios.post(`${process.env.VUE_APP_URL}/api/v1/sales_report`, {
                    'month_of_report': this.period
                }, { 
                    headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutAdmin").then(() => {
                            this.$router.push('/staff/login')
                        });
                    } else {
                        this.$store.dispatch('setOverlay', false)

                        this.display = 'none'
                        this.displayItem = 'block'
                        this.sales_report = res.data.value
                        this.sales_reports = res.data.value.sales_report
                    }
                        
                }).catch(err => {
                    console.log(err.response);
                })
            }
        },
        watch: {
            date (val) {
                this.period = this.formatDate(this.date)
            },
        }
    }
</script>
  