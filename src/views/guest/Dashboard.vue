<template>
    <v-container style="max-width: 74em; padding-top: 8em !important;">
        <v-row align="center" justify="center">
          <v-col cols="12" xs="12" sm="12" md="8">
              <v-card class="elevation-12 rounded-xl p-lg-5">
                <v-carousel
                  :continuous="true"
                  :cycle="cycle"
                  :show-arrows="false"
                  hide-delimiter-background
                  delimiter-icon="mdi-minus"
                  height="448"
                >
                  <v-carousel-item
                    v-for="(slide, i) in slides"
                    :key="i"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="12" xs="12" sm="12" md="12">
                          <v-card-text>
                            <v-row align="center" justify="center">
                                <v-img class="rounded-xl" :src="getImgUrl(slide)" style="max-height: 320px;" alt="">
                                </v-img>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="12">
                                    <div>Word of the Day</div>
                                    <div class="text--primary">
                                    relating to or dependent on charity; charitable.
                                    "an eleemosynary educational institution."
                                    </div>
                                </v-col>
                            </v-row>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-carousel-item>
                </v-carousel>
                <v-card-actions class="mt-5">
                    <v-btn
                        class="border-12"
                        block
                        color="secondary"
                        @click="next()"
                        height="50px"
                    >
                        {{ $t("labels.bookingFromHere") }}
                    </v-btn>
                </v-card-actions>
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
            timeout: 7500,
            cycle: true,
            slides: [
                'slide1.jpeg',
                'slide2.jpeg',
                'slide3.jpeg',
                'slide4.jpeg',
                'slide5.jpeg',
            ],
        }
    },
    methods:{
        getImgUrl(imagePath) {
          return require('@/assets/images/' + imagePath);
        },
        next(){
            this.$router.push('/booking/calendar')
        }
    },
    mounted() {
      this.$store.dispatch('setBookDate', null)
    },
}
</script>
