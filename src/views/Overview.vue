<template>
  <v-container fluid class="mb-8">
    <v-row>
      <v-col cols="12">
        <v-container fluid>
          <v-row>
            <v-col
              class="col-12"
              xs="12"
              sm="12"
              md="12"
            >
                <div class="d-flex mt-2">
                    <v-btn
                    small
                    color="success"
                    class="py-5"
                    >
                      <v-icon>mdi-plus</v-icon>
                        Tambah Penjualan
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="280px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            solo
                            dense
                            v-model="date"
                            label="Period"
                            persistent-hint
                            append-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            class="ml-3 mr-3"
                            hide-details=true
                            style="max-width: 220px;"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            type="month"
                            no-title
                            @input="menu = false"
                        ></v-date-picker>
                    </v-menu>
                    <v-btn
                    small
                    color="#fff"
                    class="py-5 mr-3"
                    @click="getDashboard()"
                    >
                        <v-icon>mdi-cached</v-icon>
                    </v-btn>
                </div>
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col cols="12" sm="12" md="4">
              <v-card class="rounded-l blue lighten-5" outlined>
                <v-card-title class="">
                  <div class="d-flex">
                    <v-icon color="blue">
                      mdi-bucket
                    </v-icon>
                    <div class="ml-3">
                      Pembelian
                    </div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-container class="mt-0 pt-0">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <h5 style="font-weight:600" class="pa-0 ma-0 blue--text">
                          Rp 0
                        </h5>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-card class="rounded-l green lighten-5" outlined>
                <v-card-title class="">
                  <div class="d-flex">
                    <v-icon color="green">
                      mdi-chart-box-plus-outline
                    </v-icon>
                    <div class="ml-3">
                      Penjualan
                    </div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-container class="mt-0 pt-0">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <h5 style="font-weight:600" class="pa-0 ma-0 green--text">
                          Rp 0
                        </h5>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-card class="rounded-l pink lighten-5" outlined>
                <v-card-title class="">
                  <div class="d-flex">
                    <v-icon color="pink">
                      mdi-chart-bubble
                    </v-icon>
                    <div class="ml-3">
                      Keuntungan
                    </div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-container class="mt-0 pt-0">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <h5 style="font-weight:600" class="pa-0 ma-0 pink--text">
                          Rp 0
                        </h5>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-5">
            <v-col cols="12" sm="12" md="12">
              <v-card class="rounded-l primary-custom-card1" outlined>
                <v-card-text class="p-4 mb-5">
                  <v-row>
                    <v-col cols="12">
                      <h6 class="pb-1 mb-5" style="font-weight:600">Transaksi </h6>
                      <div id="chartContainer" style="height: 375px; width: 100%;"></div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
      show: false,
      loading: false,
      firstLoad: true,
      theme: {
          isDark: false
      },
      items: [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}],
      clickVal : 0,
      easterDialog: false,
      total_target: 0,
      total_alokasi: 0,
      total_paid: 0,
      asset: 0,
      liabilities: 0,
      expanse: 0,
      income: 0,
      expanse_ketiga: 0,
      income_ketiga: 0,
      other_balance: 0,
      menu: false,
      year: new Date().toISOString().substr(0, 4),
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 7),
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dialogfilter: false,
      entities: [],
      entity_id: '',
      offices: [],
      office_id: '',
      bidangs: [],
      bidang: '',
      komisies: [],
      komisi: '',
      disabled_bidang: false,
      disabled_komisi: false,
      flag_three: '',
      disabled_flag_three: false,
      id_pdt: '',
      disabled_id_pdt: false,
      dashboard: null
  }),
  methods:{
    save(date) {
        this.$refs.menu.save(date)
        this.$refs.picker.activePicker = 'YEAR'
        this.menu = false
        this.year = new Date(date.substr(0, 4)).toISOString().substr(0, 4)
        this.getDashboard()
    },
    getChart(targets, target_incomes, actuals, actual_incomes, allocations, allocation_incomes){
      var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    // axisY: {
                    //   prefix: "$",
                    //   scaleBreaks: {
                    //     customBreaks: [{
                    //       startValue: 10000,
                    //       endValue: 35000
                    //     }]
                    //   }
                    // },
                    toolTip: {
                      shared: true
                    },
                    legend: {
                      cursor: "pointer",
                      itemclick: this.toggleDataSeries
                    },
                    data: [
                      {
                        type: "column",
                        name: 'Target',
                        yValueFormatString: "#,##0.00",
                        dataPoints: targets
                      },
                      {
                        type: "column",
                        name: 'Target Income',
                        yValueFormatString: "#,##0.00",
                        dataPoints: target_incomes
                      },
                      {
                        type: "column",
                        name: 'Allocation',
                        yValueFormatString: "#,##0.00",
                        dataPoints: allocations
                      },
                      {
                        type: "column",
                        name: 'Allocation Income',
                        yValueFormatString: "#,##0.00",
                        dataPoints: allocation_incomes
                      },
                      {
                        type: "column",
                        name: 'Paid',
                        yValueFormatString: "#,##0.00",
                        dataPoints: actuals
                      },
                      {
                        type: "column",
                        name: 'Paid Income',
                        yValueFormatString: "#,##0.00",
                        dataPoints: actual_incomes
                      }
                    ]
                  });
      chart.render();
    },
    toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    },
    async getDashboard(){
      
    },
  },
  async mounted() {
      this.$refs.picker.activePicker = 'YEAR'   
  },
  watch: {
    menu (val) {
        console.log(val);
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  }
}
</script>
  
<style scoped>
.sausage-dog-animation {
height: 25rem;
max-height: 80vh;
max-width: 80vw;
}

.ear,
.closed-eye,
.lean,
.front-legs,
.leg,
.head,
.tail,
.tail-blur,
.shadow {
animation-duration: 3s;
animation-iteration-count: infinite;
animation-timing-function: linear;
}

.ball,
.ball-decoration,
.ball-sound {
animation-duration: 3s;
animation-iteration-count: infinite;
animation-timing-function: ease-in-out;
}

.ball {
animation-name: squishBall;
transform: matrix(
  1.0951654,
  0.52195853,
  -0.52866476,
  1.2371611,
  208.27138,
  -632.28196
);
}

@keyframes squishBall {
0%,
50%,
72%,
80%,
92%,
100% {
  d: path(
    "m 930.80242,477.19065 c -13.05851,3.00801 -24.77881,15.97694 -26.81485,30.67673 -2.03603,14.69979 5.61282,31.12503 15.54844,43.47271 9.93563,12.34768 22.15522,20.61485 36.12779,24.29677 13.97258,3.68192 29.69644,2.77869 42.91157,-2.81649 13.21513,-5.59518 23.92113,-15.88139 30.65943,-28.14324 6.7383,-12.26185 9.5079,-26.49697 5.7369,-38.5172 -3.771,-12.02022 -14.0825,-21.82316 -25.5603,-24.46605 -11.47786,-2.6429 -24.12011,1.87601 -37.63861,0.6591 -13.5185,-1.21691 -27.91187,-8.17033 -40.97037,-5.16233 z"
  );
  transform: matrix(
    1.0951654,
    0.52195853,
    -0.52866476,
    1.2371611,
    208.27138,
    -632.28196
  );
}
65%,
85% {
  d: path(
    "m 932.4158,479.26229 c -14.67189,0.93637 -26.39219,13.9053 -28.42823,28.60509 -2.03603,14.69979 5.61282,31.12503 15.94228,38.97676 10.32947,7.85173 23.3365,7.12856 34.39281,10.90173 11.0563,3.77318 20.16082,12.04166 33.72906,12.76579 13.56828,0.72414 31.59878,-6.09489 42.72528,-18.16177 11.1265,-12.06689 15.3474,-29.37891 10.9229,-43.93943 -4.4245,-14.56052 -17.4943,-26.36654 -28.8312,-27.22343 -11.337,-0.85689 -20.93852,9.23684 -34.54977,8.73602 -13.61125,-0.50082 -31.23124,-11.59712 -45.90313,-10.66076 z"
  );
  transform: matrix(
    1.0951654,
    0.52195853,
    -0.52866476,
    1.2371611,
    208.27138,
    -642.28196
  );
}
}

.ball-decoration {
animation-name: ballDecorationAnimation;
}

@keyframes ballDecorationAnimation {
0%,
50%,
72%,
80%,
92%,
100% {
  d: path(
    "m 963.39546,597.71943 c 21.49913,-19.30313 4.80913,-64.80408 16.71919,-83.46282 16.19467,-25.37116 67.93925,-22.92156 89.43095,-47.68524"
  );
}
65%,
85% {
  d: path(
    "m 978.40243,581.77452 c 21.49916,-19.30313 -15.82546,-51.20401 -3.9154,-69.86275 16.19467,-25.37116 63.71847,-19.16982 85.21017,-43.9335"
  );
}
}

.ball-sound {
animation-name: ballSound;
visibility: hidden;
}

@keyframes ballSound {
0%,
60%,
70%,
80%,
90%,
100% {
  visibility: hidden;
  transform: translateY(0);
}
65%,
67%,
69%,
85%,
87%,
89% {
  visibility: visible;
  transform: translateY(-3px);
}
66%,
68%,
86%,
88% {
  visibility: visible;
  transform: translateY(3px);
}
}

.ear {
animation-name: moveEar;
transform-origin: top center;
transform-box: fill-box;
}

@keyframes moveEar {
0%,
12%,
21%,
31%,
35%,
100% {
  transform: rotateZ(0);
}
9%,
19%,
29% {
  transform: rotateZ(-5deg);
  transform: rotateZ(-10deg);
}
13%,
23%,
33% {
  transform: rotateZ(5deg);
  transform: rotateZ(10deg);
}
}

.closed-eye {
animation-name: closeEye;
}

@keyframes closeEye {
0%,
50%,
100% {
  visibility: hidden;
}
10% {
  visibility: visible;
}
}

.lean {
animation-name: leanDown;
transform-origin: center;
}

@keyframes leanDown {
0%,
50%,
100% {
  transform: rotateZ(0) translateY(0);
}
60%,
90% {
  transform: rotateZ(10deg) translateY(5%);
}
}

.front-legs {
animation-name: flexLegs;
}

@keyframes flexLegs {
0%,
50%,
100% {
  transform: translateX(0);
}
60%,
90% {
  transform: translateX(12%);
}
}

.leg {
animation-name: rotateLegs;
transform-origin: bottom left;
transform-box: fill-box;
transform: translateX(16%) rotate(-10deg);
}

@keyframes rotateLegs {
0%,
50%,
100% {
  transform: translateX(16%) rotate(-10deg);
}
60%,
90% {
  transform: translateX(35%) rotate(-83deg);
}
}

.head {
animation-name: lookDown;
transform-origin: top right;
transform-box: fill-box;
}

@keyframes lookDown {
0%,
55%,
100% {
  transform: rotateZ(0) translate(0, 0);
}
60%,
90% {
  transform: rotateZ(5deg) translate(2.5%, 6%);
}
}

.tail {
animation-name: moveTail;
transform-origin: bottom center;
}

@keyframes moveTail {
0%,
50%,
90%,
100% {
  d: path(
    "m 161.6285,568.63016 20.92664,-20.00034 C 151.50961,521.73829 14.092,504.432 14.092,504.432 c 0,0 128.8135,26.71916 147.5365,64.19816 z"
  );
}
64%,
70%,
76%,
82% {
  d: path(
    "m 161.6285,568.63016 20.92664,-20.00034 C 151.50961,521.73829 77.565044,422.94078 77.565044,422.94078 c 0,0 65.340456,108.21038 84.063456,145.68938 z"
  );
}
60%,
66%,
72%,
78%,
84% {
  d: path(
    "m 161.6285,568.63016 20.92664,-20.00034 C 151.50961,521.73829 14.092,504.432 14.092,504.432 c 0,0 128.8135,26.71916 147.5365,64.19816 z"
  );
}
62%,
68%,
74%,
80%,
86% {
  d: path(
    "m 161.6285,568.63016 20.92664,-20.00034 C 151.50961,521.73829 159.419,390.74 159.419,390.74 c 0,0 -16.5135,140.41116 2.2095,177.89016 z"
  );
}
}

.tail-blur {
animation-name: tailBlur;
transform-origin: bottom center;
}

@keyframes tailBlur {
0%,
59%,
90%,
100% {
  opacity: 0;
}
64%,
70%,
76%,
82% {
  transform: rotate(-2deg);
  opacity: 0;
}
60%,
66%,
72%,
78%,
84% {
  opacity: 0.3;
}
62%,
68%,
74%,
80%,
86% {
  transform: rotate(2deg);
  opacity: 0;
}
}

.shadow {
animation-name: scaleShadow;
transform-origin: center center;
}

@keyframes scaleShadow {
0%,
55%,
100% {
  transform: scaleX(1) translateX(0);
}
60%,
90% {
  transform: scaleX(1.1) translateX(4%);
}
}
  
  
</style>