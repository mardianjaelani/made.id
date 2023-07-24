<template>
    <v-container class="pl-lg-5 pr-lg-5 mt-lg-5" style="max-width: 100em;">
        <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="6" md="6">
                <h6  class="m-2 text-weight-bold text-center">{{ $t("labels.salonCode") }} : {{$store.state.user.salon_code}}</h6>
                
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" xs="12" sm="12" md="12">
                <h6  class="m-2 text-weight-bold">{{ $t("labels.fullname") }} : {{$store.state.user.name}}</h6>
                
            </v-col>
        </v-row>
        <v-row class="mt-lg-5">
            <v-col cols="6" md="6">
                <v-hover
                    v-slot="{ hover }"
                    close-delay="200"
                >
                    <v-card :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    class="rounded-xl elevation-12" @click="choiceTujuan('profile')">
                        <v-list :color="idPoli === 'profile' ? '#e83e8c' : '#ffff'">
                            <v-list-item>
                                <v-list-item-icon class="mr-1">
                                    <icon icon="fa6-solid:user-doctor" width="40" height="40" :color="idPoli === 'profile' ? '#ffff' : '#e83e8c'"/>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <h6 :class="idPoli === 'profile' ? 'text-white' : 'text-kios'"  class="m-2 text-sm-body-2 text-md-body-1 text-weight-bold">
                                            {{ $t("labels.profile") }}
                                        </h6>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="6" md="6">
                <v-hover
                    v-slot="{ hover }"
                    close-delay="200"
                >
                    <v-card :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    class="rounded-xl elevation-12" @click="choiceTujuan('prescription')">
                        <v-list :color="idPoli === 'prescription' ? '#e83e8c' : '#ffff'">
                            <v-list-item>
                                <v-list-item-icon class="mr-1">
                                    <icon icon="healthicons:pharmacy-alt" width="40" height="40" :color="idPoli === 'prescription' ? '#ffff' : '#e83e8c'" />
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                    <h6 :class="idPoli === 'prescription' ? 'text-white' : 'text-kios'" class="m-2 text-sm-body-2 text-md-body-1 text-weight-bold text-enter">
                                        {{ $t("labels.prescriptionContent") }}
                                    </h6>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="6" md="6">
                <v-hover
                    v-slot="{ hover }"
                    close-delay="200"
                >
                    <v-card :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    class="rounded-xl elevation-12"  @click="choiceTujuan('destination')">
                        <v-list :color="idPoli === 'destination' ? '#e83e8c' : '#ffff'">
                            <v-list-item>
                                <v-list-item-icon class="mr-1">
                                    <icon icon="bi:info-circle" width="40" height="40" :color="idPoli === 'destination' ? '#ffff' : '#e83e8c'" />
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                    <h6 :class="idPoli === 'destination' ? 'text-white' : 'text-kios'" class="m-2 text-sm-body-2 text-md-body-1 text-weight-bold text-enter">
                                        {{ $t("labels.destinationInfo") }}
                                    </h6>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="6" md="6">
                <v-hover
                    v-slot="{ hover }"
                    close-delay="200"
                >
                    <v-card :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    class="rounded-xl elevation-12" @click="choiceTujuan('payment')">
                        <v-list :color="idPoli === 'payment' ? '#e83e8c' : '#ffff'">
                            <v-list-item>
                                <v-list-item-icon class="mr-1">
                                    <icon icon="arcticons:eset-payment-protection" width="40" height="40" :color="idPoli === 'payment' ? '#ffff' : '#e83e8c'" />
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                    <h6  :class="idPoli === 'payment' ? 'text-white' : 'text-kios'" class="m-2 text-sm-body-2 text-md-body-1 text-weight-bold text-enter">
                                        {{ $t("labels.paymentMethod") }}
                                    </h6>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-hover>
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
            idPoli: ''
        }
    },
    methods:{
        choiceTujuan(value){
            this.idPoli = value

            if (this.idPoli === 'profile') {
                this.$router.push('/patient/profile')
            } else if (this.idPoli === 'prescription'){
                this.$router.push('/patient/prescription')
            } else if (this.idPoli === 'destination'){
                this.$router.push('/patient/destination')
            } else if (this.idPoli === 'payment'){
                this.$router.push('/patient/payment')
            }
        }
    },
    mounted() {
    },
  }
</script>