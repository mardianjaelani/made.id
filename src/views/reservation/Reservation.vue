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
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card
                    class="mx-auto rounded-xl"
                    style="border-top: 3px solid #e83e8c;"
                >
                    <v-card-text>
                        <v-sheet height="64">
                            <v-toolbar
                            flat
                            >
                            <v-btn
                                class="mr-4 text-white"
                                color="success"
                                @click="addEventDialog"
                            >
                                <v-icon>
                                    mdi-plus
                                </v-icon>
                                予約の作成
                            </v-btn>
                            <v-btn
                                outlined
                                class="mr-4"
                                color="grey darken-2"
                                @click="setToday"
                            >
                                本日
                            </v-btn>
                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="prev"
                            >
                                <v-icon small>
                                mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="next"
                            >
                                <v-icon small>
                                mdi-chevron-right
                                </v-icon>
                            </v-btn>
                            <v-toolbar-title v-if="$refs.calendar">
                                {{ $refs.calendar.title.substr(3,5) }} 年 {{$refs.calendar.title.substr(0,3)}}
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-menu
                                bottom
                                right
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    outlined
                                    color="grey darken-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <span>{{ labelTypeCalender }}</span>
                                    <v-icon right>
                                    mdi-menu-down
                                    </v-icon>
                                </v-btn>
                                </template>
                                <v-list>
                                <v-list-item @click="setType('day')">
                                    <v-list-item-title>日</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="setType('week')">
                                    <v-list-item-title>週</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="setType('month')">
                                    <v-list-item-title>月</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="setType('4day')">
                                    <v-list-item-title>４日</v-list-item-title>
                                </v-list-item>
                                </v-list>
                            </v-menu>
                            </v-toolbar>
                        </v-sheet>
                        <v-sheet height="778">
                            <v-calendar
                                ref="calendar"
                                v-model="focus"
                                color="primary"
                                :events="events"
                                :event-color="getEventColor"
                                :type="type"
                                :category-show-all="category_doctor"
                                :categories="doctor_names"
                                :category-days="category_days"
                                :start="start"
                                :end="end"
                                :event-ripple="false"
                                @click:event="showEvent"
                                @click:more="viewDay"
                                @click:date="viewDay"
                                @change="updateRange"
                                @mousedown:event="startDrag"
                                @mousedown:time-category="startTime"
                                @mousemove:time="mouseMove"
                                @mouseup:time="endDrag"
                                @mouseleave.native="cancelDrag"
                                first-time="09:00"
                                interval-count="11"
                                locale="ja-jp"
                            >
                                <template v-slot:event="{ event, timed }">
                                    <div class="v-event-draggable">
                                        {{ event.name }}
                                    <!-- <component :is="{ render: eventSummary }"></component> -->
                                    </div>
                                    <div
                                    v-if="timed"
                                    class="v-event-drag-bottom"
                                    @mousedown.stop="extendBottom(event)"
                                    ></div>
                                </template>
                            </v-calendar>
                            <v-menu
                                v-model="selectedOpen"
                                :close-on-content-click="false"
                                :activator="selectedElement"
                                offset-x
                            >
                                <v-card
                                    color="grey lighten-4"
                                    min-width="350px"
                                    max-width="350px"
                                    flat
                                >
                                    <v-card-title>
                                        <v-row>
                                            <v-col cols="12">
                                                <div class="d-flex">                                        
                                                    <h5>{{selectedEvent.name}}</h5>
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                        class="mx-2"
                                                        fab
                                                        small
                                                        color="#e83e8c;"
                                                        @click="editData(selectedEvent)"
                                                    >
                                                        <v-icon dark>
                                                            mdi-pencil
                                                        </v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col
                                                xs="12"
                                                sm="6"
                                                md="6"
                                                class="col-12"
                                            >
                                                <h6 class="pink-heading">施術</h6>
                                                <h5>{{selectedEvent.data ? selectedEvent.data.treatment.name : ''}}</h5>
                                            </v-col>
                                            <v-col
                                                xs="12"
                                                sm="6"
                                                md="6"
                                                class="col-12"
                                            >
                                                <h6 class="pink-heading">来院者</h6>
                                                <h5>{{selectedEvent.data ? selectedEvent.data.patient.id : ''}} - {{ selectedEvent.data ? selectedEvent.data.patient.name : ''}}</h5>
                                            </v-col>
                                            <v-col
                                                xs="12"
                                                sm="6"
                                                md="4"
                                                class="col-12"
                                            >
                                                <h6 class="pink-heading">開始日時</h6>
                                                <h5>{{parseDateEvent(selectedEvent.start)}}</h5>
                                            </v-col>
                                            <v-col
                                                xs="12"
                                                sm="6"
                                                md="4"
                                                class="col-12"
                                            >
                                                <h6 class="pink-heading">終了日時</h6>
                                                <h5>{{parseDateEvent(selectedEvent.end)}}</h5>
                                            </v-col>
                                            <v-col
                                                xs="12"
                                                sm="6"
                                                md="4"
                                                class="col-12"
                                            >
                                                <h6 class="pink-heading">医師名</h6>
                                                <h5>{{selectedEvent.data ? selectedEvent.data.doctor_name : ''}}</h5>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>
                        </v-sheet>
                    </v-card-text>
                </v-card>
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="800px"
                >
                <v-card class="border-12">
                    <v-card-title>
                    <span class="text-h5">{{ this.edit ? '予約の編集' : '予約の作成' }}</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                xs="12"
                                sm="6"
                                md="6"
                                class="col-12"
                            >
                                <h6 class="pink-heading">施術</h6>
                                <v-autocomplete
                                    v-model="treatment"
                                    :items="treatments"
                                    item-value="id"
                                    item-text="name"
                                    label="施術"
                                    class="border-12"
                                    clearable
                                ></v-autocomplete>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="6"
                                md="6"
                                class="col-12"
                            >
                                <h6 class="pink-heading">来院者</h6>
                                <v-autocomplete
                                    v-model="visitor"
                                    :items="visitors"
                                    item-value="id"
                                    item-text="name_text"
                                    :search-input.sync="search"
                                    cache-items
                                    hide-no-data
                                    label="来院者"
                                    class="border-12"
                                    return-object
                                    clearable
                                ></v-autocomplete>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="6"
                                md="4"
                                class="col-12"
                            >
                                <h6 class="pink-heading">開始日時</h6>

                                <v-datetime-picker 
                                    v-model="start_date" 
                                    label="開始日時"
                                    :date-picker-props="datePropTemps"
                                    locale
                                    time-format="HH:mm:ss"
                                    class="ma-0 pa-0 border-12"
                                    @input="getDoctorValue()"
                                ></v-datetime-picker>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="6"
                                md="4"
                                class="col-12"
                            >
                                <h6 class="pink-heading">終了日時</h6>

                                <v-datetime-picker 
                                    v-model="end_date" 
                                    label="終了日時"
                                    :date-picker-props="datePropTemps"
                                    time-format="HH:mm:ss"
                                    class="ma-0 pa-0 border-12"
                                    @input="getDoctorValue()"
                                ></v-datetime-picker>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="6"
                                md="4"
                                class="col-12"
                            >
                                <h6 class="pink-heading">医師名</h6>
                                <v-autocomplete
                                    v-model="doctor"
                                    :items="doctors"
                                    item-value="doctor_id"
                                    item-text="doctor_name"
                                    label="医師名"
                                    class="border-12"
                                    clearable
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-container>
                            <v-row justify="center" align="center">
                                <v-col xs="12" sm="4" md="4" class="col-12">
                                    <v-btn
                                        block
                                        color="secondary darken-1"
                                        text
                                        @click="closeDialog()"
                                    >
                                        閉じる
                                    </v-btn>
                                </v-col>
                                <v-col xs="12" sm="4" md="4" class="col-12">
                                    <v-btn
                                        block
                                        color="secondary"
                                        class="text-white"
                                        @click="saveReservation()"
                                    >
                                        保存
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialogDrag"
                    persistent
                    max-width="800px"
                >
                <v-card class="border-12">
                    <v-card-title>
                    <span class="text-h5">{{ this.edit ? '予約の編集' : '予約の作成' }}</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                xs="12"
                                sm="6"
                                md="6"
                                class="col-12"
                            >
                                <h6 class="pink-heading">施術</h6>
                                <v-autocomplete
                                    v-model="treatment"
                                    :items="treatments"
                                    item-value="id"
                                    item-text="name"
                                    label="施術"
                                    class="border-12"
                                    clearable
                                ></v-autocomplete>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="6"
                                md="6"
                                class="col-12"
                            >
                                <h6 class="pink-heading">来院者</h6>
                                <v-autocomplete
                                    v-model="visitor"
                                    :items="visitors"
                                    item-value="id"
                                    item-text="name_text"
                                    :search-input.sync="search"
                                    cache-items
                                    hide-no-data
                                    label="来院者"
                                    class="border-12"
                                    return-object
                                    clearable
                                ></v-autocomplete>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="6"
                                md="4"
                                class="col-12"
                            >
                                <h6 class="pink-heading">開始日時</h6>

                                <v-datetime-picker 
                                    v-model="start_date" 
                                    label="開始日時"
                                    :date-picker-props="datePropTemps"
                                    locale
                                    time-format="HH:mm:ss"
                                    class="ma-0 pa-0 border-12"
                                    @input="getDoctorValue()"
                                ></v-datetime-picker>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="6"
                                md="4"
                                class="col-12"
                            >
                                <h6 class="pink-heading">終了日時</h6>

                                <v-datetime-picker 
                                    v-model="end_date" 
                                    label="終了日時"
                                    :date-picker-props="datePropTemps"
                                    time-format="HH:mm:ss"
                                    class="ma-0 pa-0 border-12"
                                    @input="getDoctorValue()"
                                ></v-datetime-picker>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="6"
                                md="4"
                                class="col-12"
                            >
                                <h6 class="pink-heading">医師名</h6>
                                <v-autocomplete
                                    v-model="doctor"
                                    :items="doctors"
                                    item-value="doctor_id"
                                    item-text="doctor_name"
                                    label="医師名"
                                    class="border-12"
                                    clearable
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-container>
                            <v-row justify="center" align="center">
                                <v-col xs="12" sm="4" md="4" class="col-12">
                                    <v-btn
                                        block
                                        color="secondary darken-1"
                                        text
                                        @click="closeDialogDrag()"
                                    >
                                        閉じる
                                    </v-btn>
                                </v-col>
                                <v-col xs="12" sm="4" md="4" class="col-12">
                                    <v-btn
                                        block
                                        color="secondary"
                                        class="text-white"
                                        @click="saveReservationDrag()"
                                    >
                                        保存
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                <v-snackbar class="text-white" v-model="snackbar.visible" :color="snackbar.color" :multi-line="snackbar.mode === 'multi-line'" :timeout="snackbar.timeout" :top="snackbar.position === 'top'">
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
                text: '予約',
                disabled: true,
                href: 'breadcrumbs_link_2',
                }
            ],
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
            datePropTemps: {
                headerColor: '#e83e8c',
                locale: 'ja'
            },
            doctors: [],
            doctor: '',
            name: '',
            start_date: '',
            end_date: '',
            display: '',
            focus: '',
            type: 'category',
            typeToLabel: {
                month: '月',
                week: '週',
                day: '日',
                '4day': '4 日',
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1', 'secondary', 'primary'],
            doctor_names: ['箕輪先生', 'テストA先生', 'テストB先生', 'テストC先生'],
            names: [],
            dialog: false,
            treatments: [],
            treatment:'',
            visitors: [],
            visitor:'',
            search: null,
            picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19),
            picker_end: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19),
            descriptionLimit: 60,
            start:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10).replace(/T/g," "),
            end: '',
            title: '',
            category_doctor: false,
            category_days: 1,
            dragEvent: null,
            dragStart: null,
            createEvent: null,
            createStart: null,
            extendOriginal: null,
            edit: false,
            editItem: null,
            createEventDrag: null,
            dialogDrag: false,
            labelTypeCalender: '日'
        }
    },
    mounted() {
        this.getTreatment()
        var now = new Date();
        if (now.getMonth() == 11) {
            var current = new Date(now.getFullYear() + 1, 0, 1);
            this.end = current.toISOString().substr(0, 10)
        } else {
            var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            this.end = current.toISOString().substr(0, 10)
        }

    },
    methods:{
        setType(type){
            if (type === 'day') {
                this.category_doctor = true
                this.category_days = 1
                this.type = 'category'
                this.labelTypeCalender = '日'
            } else if(type === 'week'){
                this.category_doctor = true
                this.category_days = 7
                this.type = 'category'
                this.labelTypeCalender = '週'
            } else if(type === '4day'){
                this.category_doctor = true
                this.category_days = 4
                this.type = 'category'
                this.labelTypeCalender = '４日'
            } else if(type === 'month'){
                this.category_doctor = false
                this.type = 'month'
                this.labelTypeCalender = '月'
            }
        },
        addEventDialog(){
            this.dialog = true
        },
        viewDay ({ date }) {
            this.focus = date
            this.category_doctor = true
            this.type = 'category'
            this.category_days = 1
            console.log(date);
        },
        getEventColor (event) {
            return event.color
        },
        setToday () {
            this.focus = ''
        },
        prev () {
            this.$refs.calendar.prev()
            console.log(this.start, this.end);
            if (this.type === 'month') {
                var startDate = new Date( Date.parse(this.start) - (new Date()).getTimezoneOffset() * 60000)
                var endDate = new Date( Date.parse(this.end) - (new Date()).getTimezoneOffset() * 60000)

                var startDayofMonth = new Date(startDate.getFullYear(), (startDate.getMonth() + 1) - 1, 0);
                var endDayofMonth = new Date(endDate.getFullYear(), (endDate.getMonth() + 1) - 1, 1);

                this.start = startDayofMonth.toISOString().substr(0,7) + '-01'
                this.end = endDayofMonth.toISOString().substr(0,10)

                this.getReservationMove(this.start, this.end)
            }
        },
        next () {
            this.$refs.calendar.next()
            console.log(this.start, this.end);
            if (this.type === 'month') {
                var startDate = new Date( Date.parse(this.start) - (new Date()).getTimezoneOffset() * 60000)
                var endDate = new Date( Date.parse(this.end) - (new Date()).getTimezoneOffset() * 60000)

                var startDayofMonth = new Date(startDate.getFullYear(), (startDate.getMonth() + 1) + 1, 0);
                var endDayofMonth = new Date(endDate.getFullYear(), (endDate.getMonth() + 1) + 1, 1);


                this.start = startDayofMonth.toISOString().substr(0,7) + '-01'
                this.end = endDayofMonth.toISOString().substr(0,10)

                this.getReservationMove(this.start, this.end)
            }
            

        },
        async getDoctorValue(){
            this.doctor_names = []
            var value = this.start_date ? this.start_date : this.end_date
            var date = (new Date(value - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            date = this.formatDate(date)
            console.log(date);

            await axios.post(`${process.env.VUE_APP_URL}/api/v1/doctors_for_reservation_by_date`, {
                'reservation_date': date
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {          
                    this.doctors = res.data.value

                    for (let index = 0; index < this.doctors.length; index++) {
                        this.doctor_names.push(this.doctors[index].doctor_name)
                    }

                }
                
            }).catch(err => {
                console.log(err.response);
            })

        },
        async getReservationMove(start, end){
            this.events = []

            await axios.post(`${process.env.VUE_APP_URL}/api/v1/reservations`, {
                'patient_id': -1,
                'treatment_type_id': -1,
                'start_datetime': this.formatDate(start) + ' 00:00:00',
                'end_datetime' : this.formatDate(end) + ' 23:59:59'
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {

                    for (let index = 0; index < res.data.value.length; index++) {

                        var start_datetime = this.parseDate(res.data.value[index].start_datetime)
                        var end_datetime = this.parseDate(res.data.value[index].end_datetime)

                        this.events.push({
                            name: res.data.value[index].patient.name,
                            start: this.toTimeEvent(start_datetime),
                            end: this.toTimeEvent(end_datetime),
                            color: 'secondary',
                            timed: true,
                            data: res.data.value[index],
                            category: res.data.value[index].doctor_name
                        })

                        this.$refs.calendar.checkChange()
                    }

                    
                        
                }
                
            }).catch(err => {
                console.log(err.response);
            })
        },
        showEvent ({ nativeEvent, event }) {
            console.log(nativeEvent, event);
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        updateRange ( {start, end} ) {
            this.getReservations()
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        addMinutes(date, minutes) {
            return new Date(date.getTime() + minutes*60000);
        },
        async saveReservation(){
            if (this.edit) {
                this.updateReservation()
            } else {
                console.log(this.treatment, this.visitor);
                if (this.treatment === '' || this.visitor === '' || this.start_date === '' || this.doctor === '') {
                    this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: "Please field data required",
                        visible: true
                    };
                    return false;
                } else{
                    var start = (new Date(this.start_date - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")
                    var end = (new Date(this.end_date - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")
                    var end_time = (new Date(this.addMinutes(this.start_date, 15) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")


                    await axios.post(`${process.env.VUE_APP_URL}/api/v1/reservation/request`, {
                        'patient_id': this.visitor.id,
                        'doctor_id': this.doctor,
                        'treatment_type_id': this.treatment,
                        'start_datetime': this.formatDate(start),
                        'end_datetime' : this.end_date ? this.formatDate(end) : this.formatDate(end_time)
                    }, { 
                        headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
                    })
                    .then(res => {
                        if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                            this.$store.dispatch("logoutAdmin").then(() => {
                                this.$router.push('/staff/login')
                            });
                        } else if(res.data.error_message){
                            this.snackbar = {
                                color: "error",
                                icon: "mdi-alert-circle",
                                mode: "multi-line",
                                position: "top",
                                timeout: 7500,
                                title: "Error",
                                text: res.data.error_message,
                                visible: true
                            };
                            return false;
                        } else {

                            this.end_date = this.end_date ? this.end_date : this.start_date

                            var startDate = new Date( this.start_date - (new Date()).getTimezoneOffset() * 60000)
                            var endDate = new Date( this.end_date - (new Date()).getTimezoneOffset() * 60000)

                            var startDayofMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
                            var endDayofMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);

                            this.start = startDayofMonth.toISOString().substr(0,7) + '-01'
                            this.end = endDayofMonth.toISOString().substr(0,10)

                            this.focus = this.start

                            console.log(this.start, this.end);

                            this.getReservationMove(this.start, this.end)

                            this.treatment = ''
                            this.visitor = ''
                            this.start_date = ''
                            this.end_date = ''
                            this.doctor = ''
                            
                            this.dialog = false  
                            this.edit = false                          
                        }
                        
                    }).catch(err => {
                        console.log(err.response);
                    })
                    
                }
            }
            
        },
        async updateReservation(){
            if (this.treatment === '' || this.visitor === '' || this.start_date === '' || this.doctor === '') {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: "Please field data required",
                    visible: true
                };
                return false;
            } else{
                var start = (new Date(this.start_date - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")
                var end = (new Date(this.end_date - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")
                var end_time = (new Date(this.addMinutes(this.start_date, 15) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")

                // console.log(start, end, end_time, this.editItem, this.visitor, this.doctor, this.treatment);

                await axios.post(`${process.env.VUE_APP_URL}/api/v1/reservation/update`, {
                    'id': this.editItem.id,
                    'patient_id': this.visitor.id,
                    'doctor_id': this.doctor,
                    'treatment_type_id': this.treatment,
                    'start_datetime': this.formatDate(start),
                    'end_datetime' : this.end_date ? this.formatDate(end) : this.formatDate(end_time)
                }, { 
                    headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutAdmin").then(() => {
                            this.$router.push('/staff/login')
                        });
                    } else if(res.data.error_message){
                        this.snackbar = {
                            color: "error",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: res.data.error_message,
                            visible: true
                        };
                        return false;
                    } else {

                        this.end_date = this.end_date ? this.end_date : this.start_date

                        var startDate = new Date( this.start_date - (new Date()).getTimezoneOffset() * 60000)
                        var endDate = new Date( this.end_date - (new Date()).getTimezoneOffset() * 60000)

                        var startDayofMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
                        var endDayofMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);

                        this.start = startDayofMonth.toISOString().substr(0,7) + '-01'
                        this.end = endDayofMonth.toISOString().substr(0,10)

                        this.focus = this.start

                        console.log(this.start, this.end);

                        this.getReservationMove(this.start, this.end)

                        this.treatment = ''
                        this.visitor = ''
                        this.start_date = null
                        this.end_date = null
                        this.doctor = ''
                        
                        this.dialog = false  
                        this.edit = false                          
                    }
                    
                }).catch(err => {
                    console.log(err.response);
                })
                
            }
        },
        async getTreatment(){
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/sell_entity_treatment`, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    this.treatments = res.data.value
                }
                
            }).catch(err => {
                console.log(err.response);
            })
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${year}/${month}/${day}`
        },
        formatMonth (date) {
            if (!date) return null

            const [year, month] = date.split('-')
            return `${year}/${month}`
        },
        parseDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('/')
            return `${year}-${month}-${day}`
        },
        parseMonth (date) {
            if (!date) return null

            const [year, month] = date.split('/')
            return `${year}-${month}`
        },
        async getReservations(start, end){
            this.events = []

            var start_time = start ? (new Date(start - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)

            var endDate = end ? new Date(end) : new Date(Date.now());
            var lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth()+2, 0);

            console.log(this.formatMonth(start_time) + '/01 00:00:00');
            console.log(this.formatMonth(lastDayOfMonth.toISOString().substr(0,7)) + '/01 00:00:00');

            await axios.post(`${process.env.VUE_APP_URL}/api/v1/reservations`, {
                'patient_id': -1,
                'treatment_type_id': -1,
                'start_datetime': this.formatMonth(start_time) + '/01 00:00:00',
                'end_datetime' : this.formatMonth(lastDayOfMonth.toISOString().substr(0,7)) + '/01 00:00:00'
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {

                    for (let index = 0; index < res.data.value.length; index++) {
                        // toTimeEvent

                        var start_datetime = this.parseDate(res.data.value[index].start_datetime)
                        var end_datetime = this.parseDate(res.data.value[index].end_datetime)

                        this.events.push({
                            name: res.data.value[index].patient.name,
                            start: this.toTimeEvent(start_datetime),
                            end: this.toTimeEvent(end_datetime),
                            color: 'secondary',
                            timed: true,
                            data: res.data.value[index],
                            category: res.data.value[index].doctor_name
                        })

                        this.$refs.calendar.checkChange()
                    }                    
                        
                }
                
            }).catch(err => {
                console.log(err.response);
            })
        },
        async getVisitor(page = 1, itemsPerPage = 10, value){
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/visitors2`, {
                'id': isNaN(value) ? 0 : parseInt(value),
                'name': isNaN(value) ? value : '',
                'sort_key': 'id',
                'order' : 'asc',
                'page': page,
                'limit': itemsPerPage
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    this.visitors = []
                    for (let index = 0; index < res.data.value.length; index++) {
                        console.log(res.data.value[index].id, res.data.value[index].name);

                        this.visitors.push(
                            {  
                                id: res.data.value[index].id,  
                                name: res.data.value[index].name,
                                name_text: res.data.value[index].id + ' ' + res.data.value[index].name
                            }
                        );
                    }

                }
            });
        },
        async saveReservationDrag(){
            if (this.treatment === '' || this.visitor === '' || this.start_date === '' || this.doctor === '') {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: "Please field data required",
                    visible: true
                };
                return false;
            } else{
                var start = (new Date(this.start_date - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")
                var end = (new Date(this.end_date - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")
                var end_time = (new Date(this.addMinutes(this.start_date, 15) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")

                await axios.post(`${process.env.VUE_APP_URL}/api/v1/reservation/request`, {
                    'patient_id': this.visitor.id,
                    'doctor_id': this.doctor,
                    'treatment_type_id': this.treatment,
                    'start_datetime': this.formatDate(start),
                    'end_datetime' : this.end_date ? this.formatDate(end) : this.formatDate(end_time)
                }, { 
                    headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
                })
                .then(res => {
                    if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                        this.$store.dispatch("logoutAdmin").then(() => {
                            this.$router.push('/staff/login')
                        });
                    } else if(res.data.error_message){
                        this.snackbar = {
                            color: "error",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: res.data.error_message,
                            visible: true
                        };
                        return false;
                    } else {

                        this.focus = start

                        this.getReservationMove(start.substr(0,10), end.substr(0,10))

                        this.treatment = ''
                        this.visitor = ''
                        this.start_date = ''
                        this.end_date = ''
                        this.doctor = ''
                        
                        this.dialogDrag = false  
                        this.edit = false                          
                    }
                    
                }).catch(err => {
                    console.log(err.response);
                })
                
            }
        },
        closeDialogDrag(){
            this.treatment = ''
            this.visitor = ''
            this.start_date = null
            this.end_date = null
            this.doctor = ''
            this.dialogDrag = false
            this.edit = false

            if (this.createEventDrag) {
                const i = this.events.indexOf(this.createEventDrag)
                if (i !== -1) {
                this.events.splice(i, 1)
                }
            } else {
                this.createEventDrag = null
            }
            
        },
        closeDialog(){
            this.treatment = ''
            this.visitor = ''
            this.start_date = null
            this.end_date = null
            this.doctor = ''
            this.dialog = false
            this.edit = false            
        },
        async editData(event){
            console.log(event);
            this.dialog = true
            this.edit = true

            this.treatment = event.data ? (event.data.treatment ? event.data.treatment.id : '') : ''
            var val = event.data ? (event.data.patient ? event.data.patient : null) : null
            var doctor = event.data ? (event.data.doctor_id ? event.data.doctor_id : null) : null
            this.editItem = event.data ? event.data : null
            // console.log(this.parseDateEvent(event.start));
            this.start_date = this.parseDateEditEvent(event.start)
            this.end_date = this.parseDateEditEvent(event.end)

            if (val) {
                this.getVisitor()
                this.visitor =  {  
                                id: val.id,  
                                name: val.name,
                                name_text: val.id + ' ' + val.name
                            }
            }

            if (doctor) {
                this.getDoctorValue()
                this.doctor = doctor
            }

        },
        startDrag ({ event, timed }) {
            if (event && timed) {
            this.dragEvent = event
            this.dragTime = null
            this.extendOriginal = null
            }
        },
        startTime (tms) {
            // console.log(tms, this.dragEvent);
            const mouse = this.toTime(tms)

            if (this.dragEvent && this.dragTime === null) {
                const start = this.dragEvent.start

                this.dragTime = mouse - start

            } else {
                this.createStart = this.roundTime(mouse)
                // console.log(this.doctor_names);
                this.createEvent = {
                    name: `Event #${this.events.length}`,
                    start: this.createStart,
                    end: this.createStart,
                    color: 'secondary',
                    timed: true,
                    data: null,
                    category: tms ? tms.category : ''
                }

                // console.log(this.createEvent);

                this.events.push(this.createEvent)

            }
        },
        extendBottom (event) {
            this.createEvent = event
            this.createStart = event.start
            this.extendOriginal = event.end
        },
        mouseMove (tms) {
            const mouse = this.toTime(tms)

            if (this.dragEvent && this.dragTime !== null) {
            const start = this.dragEvent.start
            const end = this.dragEvent.end
            const duration = end - start
            const newStartTime = mouse - this.dragTime
            const newStart = this.roundTime(newStartTime)
            const newEnd = newStart + duration

            this.dragEvent.start = newStart
            this.dragEvent.end = newEnd
            } else if (this.createEvent && this.createStart !== null) {
                const mouseRounded = this.roundTime(mouse, false)
                const min = Math.min(mouseRounded, this.createStart)
                const max = Math.max(mouseRounded, this.createStart)

                this.createEvent.start = min
                this.createEvent.end = max
            }
        },
        async endDrag () {
            console.log(this.dragEvent);
            // this.createEvent.data
            // if (this.dragEvent === null) {
            //     this.dragTime = null
            //     this.dragEvent = null
            //     this.createEvent = null
            //     this.createStart = null
            //     this.extendOriginal = null
            // } else{

            if (this.createEvent != null) {

                if (this.createEvent.data === null) {
                    this.dialogDrag = true
                    console.log(this.createEvent);
                    this.start_date = this.parseDateEditEvent(this.createEvent.start)
                    this.end_date = this.parseDateEditEvent(this.createEvent.end)

                    this.doctor_names = []
                    var value = this.start_date ? this.start_date : this.end_date
                    var date = (new Date(value - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
                    date = this.formatDate(date)

                    this.createEventDrag = this.createEvent

                    var category = this.createEvent.category

                    this.dragTime = null
                    this.dragEvent = null
                    this.createEvent = null
                    this.createStart = null
                    this.extendOriginal = null

                    await axios.post(`${process.env.VUE_APP_URL}/api/v1/doctors_for_reservation_by_date`, {
                        'reservation_date': date
                    }, { 
                        headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
                    })
                    .then(res => {
                        if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                            this.$store.dispatch("logoutAdmin").then(() => {
                                this.$router.push('/staff/login')
                            });
                        } else {          
                            this.doctors = res.data.value

                            for (let index = 0; index < this.doctors.length; index++) {
                                this.doctor_names.push(this.doctors[index].doctor_name)
                            }

                            for (let i = 0; i < this.doctors.length; i++) {
                                console.log(this.doctors[i]['doctor_name'], category);
                                if (this.doctors[i]['doctor_name'] === category) {
                                    this.doctor = this.doctors[i]['doctor_id']
                                }
                            }

                        }
                        
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    this.dragTime = null
                    this.dragEvent = null
                    this.createEvent = null
                    this.createStart = null
                    this.extendOriginal = null
                }
                    
            } else {
                this.dragTime = null
                this.dragEvent = null
                this.createEvent = null
                this.createStart = null
                this.extendOriginal = null
            }
            
        },
        cancelDrag () {
            if (this.createEvent) {
            if (this.extendOriginal) {
                this.createEvent.end = this.extendOriginal
            } else {
                const i = this.events.indexOf(this.createEvent)
                if (i !== -1) {
                this.events.splice(i, 1)
                }
            }
            }

            this.createEvent = null
            this.createStart = null
            this.dragTime = null
            this.dragEvent = null
        },
        roundTime (time, down = true) {
            const roundTo = 15 // minutes
            const roundDownTime = roundTo * 60 * 1000

            return down
            ? time - time % roundDownTime
            : time + (roundDownTime - (time % roundDownTime))
        },
        toTime (tms) {
            return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
        },
        toTimeEvent(event){
            return new Date(event).getTime()
        },
        parseDateEvent(timeStamp){
            if (timeStamp) {
                var dateFormat = new Date(timeStamp);
                var dateFormat = (new Date(dateFormat - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace(/T/g," ")

                return dateFormat
            }
        },
        parseDateEditEvent(timeStamp){
            if (timeStamp) {
                var dateFormat = new Date(timeStamp);

                return dateFormat
            }
        }
    },
    computed: {
      fields () {
        if (!this.visitor) return []

        return Object.keys(this.visitor).map(key => {
          return {
            key,
            value: this.visitor[key] || 'n/a',
          }
        })
      },
      items () {
        return this.visitors.map(entry => {
          const Description = entry.name_text.length > this.descriptionLimit
            ? entry.name_text.slice(0, this.descriptionLimit) + '...'
            : entry.name_text

          return Object.assign({}, entry, { Description })
        })
      },
    },
    watch: {
        // search (val) {
        //     val && val !== this.visitor && this.getVisitor(1,10,val)
        // },
        search (val) {
            // Items have already been loaded
            // Lazily load input items
            this.getVisitor(1,10,val)
        },
    }
  }
</script>
<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }

  &:hover::after {
    display: block;
  }
}
</style>