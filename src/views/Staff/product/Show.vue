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
            <v-col cols="12">
                <v-card outlined class="rounded-l ma-0 pa-0">
                    <v-card-text>
                        <v-container fluid class="ma-0 pa-0">
                            <v-row class="mt-2">
                                <v-col class="col-12" sm="6" md="2">
                                    <h6 class="blue-lcd mb-1">Category <strong style="color:red;">*</strong><span></span></h6>
                                    <v-autocomplete
                                        dense
                                        solo
                                        clearable
                                        v-model="category_id"
                                        :items="categories"
                                        item-value="id"
                                        item-text="name"
                                        class="ma-0 pa-0 border-12"
                                        hide-details=true
                                    ></v-autocomplete> 
                                </v-col>
                                <v-col class="col-12" sm="6" md="6">
                                    <h6 class="blue-lcd mb-1">Name <strong style="color:red;">*</strong><span></span></h6>
                                    <v-text-field
                                        solo
                                        dense
                                        persistent-hint
                                        v-model="name"
                                        class="ma-0 pa-0 border-12"
                                        hide-details=true
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col class="col-12" sm="6" md="2">
                                    <h6 class="blue-lcd mb-1">Stok <strong style="color:red;">*</strong><span></span></h6>
                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                    dense v-text-field--is-booted v-text-field--enclosed">
                                        <div class="v-input__control">
                                            <div class="v-input__slot">
                                                <div class="v-text-field__slot">
                                                    <money class="" name="quantity" v-model="quantity" v-bind="money" ></money>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col class="col-12" sm="6" md="2">
                                    <h6 class="blue-lcd mb-1">Price <strong style="color:red;">*</strong><span></span></h6>
                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                    dense v-text-field--is-booted v-text-field--enclosed">
                                        <div class="v-input__control">
                                            <div class="v-input__slot">
                                                <div class="v-text-field__slot">
                                                    <money class="" name="price" v-model="price" v-bind="money" ></money>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row class="mt-0">
                                <v-col cols="12">
                                    <h6 class="blue-lcd mb-1">Gambar Produk <strong style="color:red;">*</strong><span></span></h6>
                                </v-col>
                                <div class="col-md-1 thumbnail" v-if="raw_images">
                                    <img :src="raw_images" class="img" style="width: 100%; border-radius:6px; object-fit: contain;">
                                    <button class="btn btn-danger" v-on:click.prevent="hapusRawImage()" style="margin-top: 5px;padding:5px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </div>
                                <div class="col-md-1 thumbnail" v-for="(gambar, key) in edit_images" :key="key">
                                    <img :src="gambar.main_path" class="img" style="width: 100%; border-radius:6px; object-fit: contain;">
                                    <button class="btn btn-danger" v-on:click.prevent="hapusEdit(key)" style="margin-top: 5px;padding:5px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </div>
                                <div class="col-md-1 thumbnail" v-for="(gambar, key) in images" :key="key">
                                    <img :src="gambar" class="img" style="width: 100%; border-radius:6px; object-fit: contain;">
                                    <button class="btn btn-danger" v-on:click.prevent="hapus(key)" style="margin-top: 5px;padding:5px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </div>
                                <!-- <div class="col-md-1">
                                    <div style="padding: 40px; text-align:center; border: dashed 2px #dddddd; cursor: pointer; width:100%" @click="openModal()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    </div>
                                </div> -->
                            </v-row>
                            <v-row class="mt-0">
                                <v-col cols="12">
                                    <h6 class="blue-lcd mb-1">Description <strong style="color:red;">*</strong><span></span></h6>
                                    <textarea v-model="description" name="description" class="form-control" rows="12" cols="50" placeholder="Isi deskripsi produk anda">
                                    </textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <small>*indicates required field</small>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions class="text-center pb-12">
                        <!-- <v-row justify="center">
                            <v-col cols="12" xs="12" sm="3" md="2">
                                <v-btn block class="rounded-l mr-2" color="#fff" @click="clear()">Clear</v-btn>
                            </v-col>
                            <v-col cols="12" xs="12" sm="3" md="2">
                                <v-btn block class="rounded-l text-white" color="primary" @click="submit()">Save</v-btn>
                            </v-col>
                        </v-row> -->
                    </v-card-actions>
                </v-card>
                <v-dialog
                    v-model="dialog"
                    max-width="600px"
                    persistent
                >
                    <v-card style="overflow: hidden;">
                        <v-card-title class="p-3"> 
                            Gambar Produk                       
                            <v-spacer></v-spacer>
                            <v-btn
                                class="mx-2"
                                fab
                                x-small
                                color="#e83e8c;"
                                @click="dialog = false"
                            >
                                <v-icon dark>
                                    mdi-close
                                </v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-text class="mb-0">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <div v-if="image" style="width: auto; height:500px; border: 1px solid gray; display: inline-block;">
                                            <vue-cropper
                                                ref='cropper'
                                                :guides="true"
                                                :view-mode="2"
                                                drag-mode="crop"
                                                :auto-crop-area="0.5"
                                                :min-container-width="200"
                                                :min-container-height="180"
                                                :background="true"
                                                :rotatable="true"
                                                :src="image"
                                                :img-style="{ 'width': 'auto', 'height': '500px' }">
                                            </vue-cropper>
                                        </div>

                                        <div v-else>
                                            <input type="file" name="image" id="image" @change="fileChange" class="form-control" accept="image/*">
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center p-3 mt-0">
                            <v-row justify="center">
                                <v-col cols="6" xs="6" sm="3" md="3">
                                    <v-btn block class="rounded-l p-3" @click="[dialog = false]">Cancel</v-btn>
                                </v-col>
                                <v-col cols="6" xs="6" sm="3" md="3">
                                    <v-btn block class="rounded-l text-white p-3" color="primary" @click="applyCropped()">Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {product} from "@/backend-api/product"
import {category} from "@/backend-api/category"
import { Money } from 'v-money'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
    components: {
        Money, VueCropper
    },
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
                    text: 'Detail Product',
                    disabled: true,
                }
            ],
            categories: [],
            category_id: '',
            name: '',
            quantity: '',
            price: '',
            money: {
				decimal: '.',
				thousands: ',',
				prefix: '',
				suffix: '',
				precision: 0,
				masked: false
			},
            image: '',
            images: [],
            edit_images: [],
            raw_images: '',
            description: '',
            dialog: false,
            detail: null
        }
    },
    async mounted(){
        console.log(this.$route.params);
        this.$store.dispatch('setOverlay', true)
        await this.loadData()
        await this.getCategory()
        this.$store.dispatch('setOverlay', false)
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        async loadData(){
            var reqBody = {
                'slug': this.$route.params.slug
            }

            const respData = await product.showProduct('', reqBody, false, false, false)
            
            if (respData.status === 200){
                this.category_id = respData.data.data.category_id
                this.name = respData.data.data.name
                this.price = Number(respData.data.data.price)
                this.quantity = Number(respData.data.data.quantity)
                this.description = respData.data.data.description
                this.edit_images = respData.data.data.images
                this.detail = respData.data.data
            }
        },
        clear(){
            this.description = ''
            this.name = ''
            this.category_id = ''
            this.quantity = ''
            this.price = ''
            this.images = []
            this.edit_images = []
            this.raw_images = ''
        },
        async getCategory(){
            var respData = await category.fetchCategory('', null, false, false, false)
            if (respData.status === 200) {
                this.categories = respData.data.data
            }
        },
        openModal(){
            this.dialog = true
        },
        hapusRawImage(){

        },
        hapusEdit(key){
            this.edit_images.splice(key, 1)
        },
        hapus(key) {
            this.images.splice(key, 1)
        },
        applyCropped(){
            this.images.push(this.$refs.cropper.getCroppedCanvas().toDataURL())
            this.image = ''
            this.dialog = false
        },
        fileChange(e) {
            let file = e.target.files[0]
            this.image = ''
            if (!file.type.includes('image/')) {
                swal("Error", "Please select an image file!", "error");
                return
            }
            if (file.size > 10000000) {
                swal("Failed", "File image maximum 10 MB!", "error");
                return
            }
            if (typeof FileReader === 'function') {
                const reader = new FileReader()
                reader.onload = (event) => {
                    this.image = event.target.result
                }
                reader.readAsDataURL(file)
            } else {
                swal("Error", "Sorry, FileReader API not supported", "error");
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            
            if (this.category_id == '' || this.category_id == null || this.name == '' || this.name == null || this.quantity == 0 || this.price == 0 || this.description == '' || this.description == null) {
                this.$store.dispatch('setOverlay', false)
                this.snackbar = {
                    color: "warning",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Warning",
                    text: "Please fill *indicates required field",
                    visible: true
                };
                return false
            }

            var reqBody = {
                'product' : this.detail.product_id,
                'name': this.name ? this.name : '',
                'description': this.description ? this.description : '',
                'category_id': this.category_id ? this.category_id : '',
                'images': this.images,
                'price': this.price ? this.price : '',
                'quantity': this.quantity ? this.quantity : ''
            }

            const respData = await product.updateProduct('', reqBody, false, false, false)

            if (respData.status === 200){
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: respData.data,
                    visible: true
                };
                this.clear()
                this.$store.dispatch('setOverlay', false)
                this.$router.push('/staff/product');                
            } else {
                this.$store.dispatch('setOverlay', false)
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: respData.data,
                    visible: true
                };
                return false
            }

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