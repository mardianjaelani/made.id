<template>
    <v-container class="pl-lg-5 pr-lg-5 mt-lg-5" style="max-width: 100em;padding-bottom: 100px;">
        <v-row justify="center" class="mt-lg-5" align="center">
            <v-col xs="12" sm="3" md="3" class="col-12">
                <v-img
                lazy-src="../../assets/card_explanation_fix-1.png"
                src="../../assets/card_explanation_fix-1.png"
                ></v-img>
            </v-col>
        </v-row>
        <v-row justify="center" class="mt-lg-5" align="center">
            <v-col cols="6" xs="6" sm="3" md="3">
                <v-btn block class="border-12 p-4 text-h6" color="#fff" @click="$router.go(-1)">{{ $t('buttons.back')}}</v-btn>
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
            }
        },
        mounted() {
        },
        methods:{
        },        
    }
</script>