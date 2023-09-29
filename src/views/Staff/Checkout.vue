<template>
    <v-container fluid class="mt-2 mb-12">
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
        </v-row>
        <v-row class="mt-0 mb-5">
            <v-col class="col-12" sm="12" md="8">
                <v-container fluid class="p-0">
                    <v-row>
                        <v-col cols="12">
                            <v-tabs icons-and-text show-arrows flat>
                                <v-tab :href="'#all'" @click="getCategory('all')">All</v-tab>
                                <v-tab
                                    v-for="(tab, index) in tabs"
                                    :key="index"
                                    :href="'#'+tab.id"
                                    @click="getCategory(tab)"
                                    active-class="active-tab"
                                >
                                    {{ tab.name }}
                                </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item
                                    :value="tab_id"
                                >    <v-text-field
                                        class="border-12 w-100 mt-2 mb-1 ml-1 pr-2"
                                        height="30"
                                        solo
                                        label="Please enter your name product"
                                        append-icon="mdi-barcode"
                                        prepend-inner-icon="mdi-magnify"
                                        v-model="search"
                                        hide-details=""
                                    ></v-text-field>
                                    <v-card flat style="overflow-y: auto;" height="730">
                                        <v-container fluid>
                                            <v-row>
                                                <v-col class="col-6" sm="6" md="3" v-for="(product, i) in products" :key="i">
                                                    <v-card outlined @click="addCart(product)">
                                                        <v-img
                                                        height="200"
                                                        :src="product.thumbnail ? product.thumbnail : 'https://cdn.vuetifyjs.com/images/cards/cooking.png'"
                                                        ></v-img>
                                                        <v-card-title>{{product.name}}</v-card-title>
                                                        <v-card-text>
                                                            <div>{{product.description.substr(0,200)}} ...</div>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-btn
                                                                color="success lighten-1"
                                                                block
                                                                @click="addCart(product)"
                                                            >
                                                                Add to Cart
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col class="col-12" sm="12" md="4">
                <v-container fluid class="p-0">
                    <v-row>
                        <v-col cols="12">
                            <v-card outlined class="p-0" height="730">
                                <v-card-title>
                                    Shopping Cart 
                                    <v-badge
                                    color="green"
                                    :content="carts.length <= 0 ? '0' : carts.length"
                                    class="ml-2"
                                    >
                                    </v-badge>
                                    <v-spacer />
                                    <v-icon large>
                                        mdi-dots-horizontal
                                    </v-icon>
                                </v-card-title>
                                <v-card-subtitle>
                                    Transaction #0001
                                </v-card-subtitle>
                                <v-card-text>
                                    <v-container fluid style="overflow-y: auto;height:520px;">
                                        <v-row align="center" justify="center">
                                            <v-col class="col-12" sm="12" md="12" lg="6">
                                                <v-btn class="border-12 p-3" text outlined block>Existing Member</v-btn>
                                            </v-col>
                                            <v-col class="col-12" sm="12" md="12" lg="6">
                                                <v-btn class="border-12 p-3" text outlined block>Add New Member</v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" v-if="carts.length == 0">
                                                <v-img
                                                class="text-center mx-auto"
                                                lazy-src="@/assets/logo_made.png"
                                                max-width="300"
                                                src="@/assets/logo_made.png"
                                                style="margin-top: 50px;"
                                                ></v-img>
                                                <p class="text-center">
                                                    Cart Empty
                                                </p>
                                            </v-col>
                                            <v-col cols="12" v-else>
                                                <v-list dense class="mt-0 pt-0">
                                                    <v-list-item-group v-for="(item, i) in carts"
                                                        :key="i">
                                                        <v-list-item class="pl-0 pr-0">
                                                            <v-list-item-content>
                                                                <div class="d-flex w-100">
                                                                    <div class="w-20">
                                                                        <v-img
                                                                        class="text-center mx-auto border-12"
                                                                        :src="item.thumbnail"
                                                                        max-width="60"
                                                                        height="auto"
                                                                        ></v-img>
                                                                    </div>
                                                                    <div class="w-25">
                                                                        <p class="mt-1">
                                                                        {{ item.name }}
                                                                        </p>
                                                                    </div>
                                                                    <div class="w-20 text-center">
                                                                        <div class="input-group spinner number">
                                                                            <button class="btn error v-btn p-1" type="button">
                                                                                <v-icon small color="white">mdi-minus</v-icon>
                                                                            </button>
                                                                            <input class="form-control" type="text" name="quantity" min="1" :max="item.quantity" v-model="item.qty" style="text-align:center; font-size: 12px;">
                                                                            <button class="btn success v-btn p-1" type="button">
                                                                                <v-icon small color="white">mdi-plus</v-icon>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div class="w-25 text-right">
                                                                        <p class="mt-1 text-right">
                                                                        {{ item.price_string }}
                                                                        </p>
                                                                    </div>
                                                                    <div class="w-10 text-right">
                                                                        <v-icon color="red" @click="deleteDetail(item, i)" class="">
                                                                            mdi-delete
                                                                        </v-icon>
                                                                    </div>
                                                                </div>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-divider class="my-1 hr-line"></v-divider>
                                                    </v-list-item-group>
                                                </v-list>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <v-container fluid>
                                        <v-row>
                                            <v-col cols="12">
                                                <div class="d-flex w-100">
                                                    <div class="w-50">
                                                        <h6>Subtotal</h6>
                                                    </div>
                                                    <div class="w-50 text-right">
                                                        <h6 class="primary--text">Rp. 1.000.000</h6>
                                                    </div>
                                                </div>
                                                <div class="d-flex w-100">
                                                    <div class="w-50">
                                                        <h6>Tax</h6>
                                                    </div>
                                                    <div class="w-50 text-right">
                                                        <h6 class="primary--text">Rp. 100.000</h6>
                                                    </div>
                                                </div>
                                                <div class="d-flex w-100 mt-2">
                                                    <div class="w-50">
                                                        <h5 class="primary--text">Total</h5>
                                                    </div>
                                                    <div class="w-50 text-right">
                                                        <strong><h5 class="primary--text" style="font-weight: 700;">Rp. 1.100.000</h5></strong> 
                                                    </div>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                
                            </v-card>
                            <v-card outlined class="text-center mt-1 primary p-2 white--text">
                                Pay
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {category} from "@/backend-api/category"
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
                    text: 'Penjualan',
                    disabled: true,
                }
            ],
            tabs: [],
            tab: 'all',
            tab_id: 'all',
            carts: [],
            products: [],
            search: ''
        }
    },
    async mounted(){
        await this.getPullData()
        await this.getProduct()
    },
    methods: {
        async getPullData(){
            this.categories = []
            this.$store.dispatch('setOverlay', true)
            var respData = await category.fetchCategory('', null, false, false, false)
            if (respData.status === 200) {
                this.tabs = respData.data.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async getProduct(){
            this.products = []
            this.$store.dispatch('setOverlay', true)

            var reqBody = {
                'category_id': this.tab === 'all' ? '' : this.tab,
                'search': this.search
            }

            var respData = await product.searchProduct('', reqBody, false, false, false)
            if (respData.status === 200) {
                this.products = respData.data.data

                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        addCart(product){
            console.log(product);
            const arrayIndex = this.carts.findIndex(x => x.product_id === product.product_id);
            console.log(arrayIndex);
            if (arrayIndex < 0) {
                this.carts.push(
                    {
                        category: product.category,
                        category_id: product.category_id,
                        description: product.description,
                        name: product.name,
                        price: product.price,
                        price_string: product.price_string,
                        product_id: product.product_id,
                        quantity: product.quantity,
                        slug: product.slug,
                        thumbnail: product.thumbnail,
                        qty: 1
                    }
                )
            } else {
                var quantity = parseInt(this.carts[arrayIndex].qty) + 1
                this.carts[arrayIndex].qty = quantity
            }
        },
        deleteDetail(item, i){

        },
        getCategory(tab){
            this.tab_id = tab.id ? tab.id : 'all'
            this.tab = tab.id ? tab.id : 'all'
        }
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