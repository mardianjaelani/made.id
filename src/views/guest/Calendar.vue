<template>
    <v-container style="max-width: 74em;padding-bottom: 100px;" class="pt-8">
        <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="6" md="4">
                <h4 class="text-center">
                    {{ $t("labels.pleaseChooseBookingDate") }}
                </h4>
            </v-col> 
        </v-row>
        <v-row align="center" justify="center">        
            <v-col cols="12" xs="12" sm="12" md="8">
                <v-card class="elevation-12 rounded-xl">
                    <v-card-text>
                        <v-sheet>
                            <v-toolbar
                            flat
                            >
                                <v-toolbar-title v-if="$refs.calendar">
                                    {{ $refs.calendar.title }}
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                                <!-- <v-menu
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
                                        <span>{{ typeToLabel[type] }}</span>
                                        <v-icon right>
                                        mdi-menu-down
                                        </v-icon>
                                    </v-btn>
                                    </template>
                                    <v-list>
                                    <v-list-item @click="type = 'day'">
                                        <v-list-item-title>Day</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'week'">
                                        <v-list-item-title>Week</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'month'">
                                        <v-list-item-title>Month</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = '4day'">
                                        <v-list-item-title>4 days</v-list-item-title>
                                    </v-list-item>
                                    </v-list>
                                </v-menu> -->
                            </v-toolbar>
                        </v-sheet>
                        <v-sheet height="600">
                            <v-calendar
                                ref="calendar"
                                v-model="focus"
                                color="primary"
                                first-time="06:00:00"
                                weekdays="[0,1,2,3,4,5]"
                                :events="events"
                                :event-color="getEventColor"
                                :type="type"
                                event-overlap-mode="column"
                                :event-overlap-threshold="30"
                                @click:event="showEvent"
                                @click:more="viewDay"
                                @click:date="viewDay"
                                @change="updateRange"
                            >
                                <!-- <template v-slot:event="{ event }">
                                    <span class="v-event-summary p-1">
                                        <strong>{{event.name}}
                                        </strong>
                                        <br class="pa-0">
                                        {{event.category}}
                                    </span>                                        
                                </template> -->
                                <template v-slot:interval="{ year, month , day, hour }">
                                    <v-btn block class="date" @click="showEventDay(year, month , day, hour)">
                                        <!-- {{hour}} -->
                                    </v-btn>
                                </template>
                            </v-calendar>
                        </v-sheet>
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
        <v-row justify="center" class="mt-lg-5">
            <v-col cols="6" xs="6" sm="3" md="2">
                <v-btn block class="rounded-l p-4 text-h6" color="#fff" @click="$router.go(-1)">{{$t('buttons.back')}}</v-btn>
            </v-col>
            <v-col cols="6" xs="6" sm="3" md="2">
                <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#e83e8c" @click="saveCalender()">{{$t('buttons.save')}}</v-btn>
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
                focus: '',
                type: 'month',
                typeToLabel: {
                    month: 'Month',
                    week: 'Week',
                    day: 'Day',
                    '4day': '4 Days',
                },
                selectedEvent: {},
                selectedElement: null,
                selectedOpen: false,
                categories: ['Spesialis Konservasi Gigi', 'Spesialis Bedah Mulut'],
                events_name: [
                    {
                        color: "orange",
                        end: '2022-09-07 10:00:00',
                        name: "Andya",
                        category: 'Spesialis Konservasi Gigi',                    
                        start: '2022-09-07 07:00:00',
                        timed: true
                    },
                    {
                        color: "success",
                        end: '2022-09-08 12:00:00',
                        name: "Ahmad",
                        category: 'Spesialis Bedah Mulut',                    
                        start: '2022-09-08 10:00:00',
                        timed: true
                    },
                    {
                        color: "pink",
                        end: '2022-09-09 13:00:00',
                        name: "Rini",
                        category: 'Spesialis Bedah Mulut',
                        start: '2022-09-09 12:00:00',
                        timed: true
                    },
                ],
                events: [],
                colors: ['primary', 'success'],
                names: ['Yoshi', 'Ricky', 'Jendra', 'Joni'],
                event: null,
                dialog_day_doctor: false,
                event_days: [
                    {
                        color: "orange",
                        end: '2022-09-07 08:00:00',
                        name: "Mardian Dwi J",
                        category: 'Spesialis Konservasi Gigi',                    
                        start: '2022-09-07 07:00:00',
                        timed: true
                    },
                    {
                        color: "success",
                        end: '2022-09-07 09:00:00',
                        name: "Ricky",
                        category: 'Spesialis Bedah Mulut',                    
                        start: '2022-09-07 08:00:00',
                        timed: true
                    },
                ],
                date: '',
                start_date: '',
                interval_count: null,
                choiceDate: []
            }
        },
        methods:{
            viewDay ({ date }) {
                this.focus = date
                this.type = 'day'
            },
            getEventColor (event) {
                return event.color
            },
            setToday () {
                this.focus = ''
            },
            prev () {
                this.$refs.calendar.prev()
            },
            next () {
                this.$refs.calendar.next()
            },
            showEvent ({ nativeEvent, event }) {
                console.log(event);
                // this.date = event.start
                // this.event = event
                // this.dialog_docter = false
                // this.dialog_day_doctor = true
                // this.start_date = event.start.substr(11, 19)
                // console.log(event.start.substr(11, 19), event.end.substr(11, 19));

                // var time = event.start.substr(11, 19);
                // var array = time.split(":");

                // var time2 = event.end.substr(11, 19);
                // var array2 = time2.split(":");

                // var interval_start = parseInt(array[0], 10)
                // var interval_end = parseInt(array2[0], 10)
                // var interval = interval_end - interval_start

                // this.interval_count = interval
            },
            updateRange ({ start, end }) {
                const events = []

                const min = new Date(`${start.date}T00:00:00`)
                const max = new Date(`${end.date}T23:59:59`)
                const days = (max.getTime() - min.getTime()) / 86400000
                console.log(days);
                const eventCount = this.rnd(days, days + 20)
                console.log(eventCount);
                for (let i = 0; i < this.events_name.length; i++) {
                    const allDay = this.rnd(0, 3) === 0
                    const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                    const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
                    const second = new Date(first.getTime() + secondTimestamp)

                    this.events.push({
                        name: this.events_name[i].name,
                        start: this.events_name[i].start,
                        end: this.events_name[i].end,
                        color: this.events_name[i].color,
                        timed: true,
                        category: this.events_name[i].category
                    })
                }

                // this.events 
            },
            rnd (a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },
            viewDaySchedule({ nativeEvent, event }){
                console.log(nativeEvent, event);
            },
            showEventDay(year, month , day, hour){
                console.log(year, month , day, hour);

                var day = day > 9 ? day : '0'+day
                var month = month > 9 ? month : '0'+month
                var date = year + '-' + month + '-' + day

                var end_hour = hour + 1
                var start = hour > 9 ? date + ' ' +hour+':00:00' : date + ' ' + '0'+hour+':00:00';
                var end = end_hour > 9 ?  date + ' ' +end_hour+':00:00' : date + ' ' + '0'+end_hour+':00:00';

                console.log(start, end);

                this.choiceDate.push({
                    date: date,
                    end: end,                    
                    start: start,
                    hour_start: hour > 9 ? hour+':00:00' :  '0'+hour+':00:00',
                    hour_end: end_hour > 9 ? end_hour+':00:00' :  '0'+end_hour+':00:00',
                })

                this.events.push({
                    color: "secondary",
                    end: end,
                    name: "Your's",
                    category: '',                    
                    start: start,
                    timed: true
                })
            },
            saveCalender(){
                if (this.choiceDate.length > 0) {
                    this.$store.dispatch('setBookDate', this.choiceDate)
                    this.$router.push('/booking/form')
                    // console.log(this.$store.state.book_date);
                } else {
                    this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: 'Required Date',
                        visible: true
                    };
                    return false;
                }
            }
        },
        mounted() {
            this.$refs.calendar.checkChange()
        },
    }
</script>