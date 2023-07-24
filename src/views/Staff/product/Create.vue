<template>
    <v-container fluid class="mt-3 mb-12">
        <v-row>
            <v-col cols="12" class="mb-1 pb-1">
                <v-breadcrumbs :items="breadcumbs" class="pa-1">
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
            <v-col cols="12">
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {product} from "@/backend-api/product"

export default {
    data() {
        return {
            loading: false,
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
            timeout: 7500,
            breadcumbs: [
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/staff',
                },
                {
                    text: 'Product',
                    disabled: false,
                    href: '/staff/product',
                },
                {
                    text: 'Create Product',
                    disabled: true,
                }
            ],
        }
    },
    mounted(){
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.description = ''
            this.name = ''
        },
    }
}
</script>
  
<style>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
}
.tr_datatable{
  background-color: #F5F7F8 !important;
}
</style>