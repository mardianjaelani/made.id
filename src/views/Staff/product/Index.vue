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
                <v-card class="rounded-l elevation-1">
                    <v-card-title>
                        Product
                        <v-spacer></v-spacer>
                        <v-btn
                        small
                        color="#fff"
                        class="py-5 mr-3"
                        @click="getPullData()"
                        >
                            <v-icon>mdi-cached</v-icon>
                        </v-btn>
                        <v-btn
                        small
                        color="success"
                        class="py-5"
                        to="/staff/product/create"
                        >
                            Create New
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            dense
                            :headers="headers"
                            :items="products"
                            class="elevation-1 rounded-l"
                            :items-per-page="20"
                            :loading="$store.state.overlay"
                            height="510"
                            :divider="true"
                            :light="true"
                            :item-class="tr_datatable"
                            :search="search"
                        >                   
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <div class="d-flex mb-2 w-30">
                                        <v-text-field solo v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="rounded-l "></v-text-field>
                                    </div>
                                </v-toolbar>
                            </template>
                            <template v-slot:[`item.quantity`]="{ item }">
                                {{ $store.getters.convertToCurrencyUs(item.quantity) }}
                            </template>
                            <template v-slot:[`item.price`]="{ item }">
                                {{ $store.getters.convertToCurrencyUs(item.price) }}
                            </template>
                            <template v-slot:[`item.action`]="{ item }">
                                <v-menu
                                    bottom
                                    left
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            dark
                                            icon
                                            v-bind="attrs"
                                            v-on="on"
                                            color="grey"
                                        >
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list dense>
                                        <v-list-item @click="detailItem(item)" :to="'/staff/product/show/'+item.slug">
                                            <v-list-item-icon>
                                                <v-icon>mdi-magnify</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>Detail</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item @click="detailItemEdit(item)" :to="'/staff/product/edit/'+item.slug">
                                            <v-list-item-icon>
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>Edit</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
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
            search: '',
            text_dialog:'',
            dialog: false,
            breadcumbs: [
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/staff',
                },
                {
                    text: 'Product',
                    disabled: true,
                }
            ],
            headers:[
                {
                    text: 'Name',
                    align: 'start',
                    value: 'name',
                    align:'left', width:'200'},
                { text: 'Slug', value: 'slug' , align:'left', width:'150'},
                { text: 'Category', value: 'category' , align:'left', width:'120'},
                { text: 'Stock', value: 'quantity' , align:'right', width:'100'},
                { text: 'Price', value: 'price' , align:'right', width:'120'},
                { text: 'Description', value: 'description' , align:'left', width:'400'},
                { text: 'Action', value: 'action' , align:'left', width:'50'},
            ],
            products: [],
            search: '',
            dialog: false,
            description: '',
            name: '',
            statuses: [
                {
                    value: 'Y',
                    name: 'Active'
                },
                {
                    value: 'N',
                    name: 'Non Active'
                }
            ],
            status: '',
            password: '',
            show: false,
            phone: '',
            detail: null,
            showDetail: false,
            dialogEdit: false,
            disabledAppl: false,
            roles: [
                {
                    text: 'Admin',
                    value: 'admin'
                },
                {
                    text: 'Super Admin',
                    value: 'super-admin'
                }
            ],
            role: ''
        }
    },
    mounted(){
        this.getPullData()
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
        detailItem(item){
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.description = item.description
            this.name = item.name
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.description = item.description
            this.name = item.name
        },
        async getPullData(){
            this.products = []
            this.$store.dispatch('setOverlay', true)
            var respData = await product.fetchProduct('', null, false, false, false)
            if (respData.status === 200) {
                this.products = respData.data.data

                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
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