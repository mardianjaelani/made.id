<template>
    <v-container class="mt-12 mb-12" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-5 rounded-l">
                    <v-card-title class="blue-lcd" style="border-bottom: 1px solid #e83e8c">
                        {{ $t("labels.profile") }}
                    </v-card-title>
                    <v-card-text>
                        <v-container class="pl-5 pr-5 pt-5 pb-4">
                            <v-row>
                                <v-col class="col-12" sm="4" md="4">
                                    <v-card class="elevation-1 rounded-l">
                                        <v-card-text>
                                            <v-row justify="center" align="center" class="mt-12" v-if="id === ''">
                                                <v-col cols="3">
                                                    <v-progress-circular
                                                    indeterminate
                                                    color="primary"
                                                    class="text-center mx-auto"
                                                    :size="70"
                                                    v-if="id === ''"
                                                    ></v-progress-circular>
                                                </v-col>
                                            </v-row>
                                            <div v-if="id">
                                                <v-img v-if="profile_img" :src="profile_img" alt="Admin"/>
                                                <v-img v-else src="../../assets/default-user.png" alt="Admin"/>
                                            </div>
                                            <v-btn
                                                block
                                                color="accent"
                                                elevation="2"
                                                outlined
                                                class="mt-5"
                                                @click="changeAvatar()"
                                            >
                                            写真を選択
                                            </v-btn>
                                            <p class="css-bqy72x mt-5">ファイル サイズ: 最大 (2 メガバイト)。許可されているファイル拡張子: .JPG .JPEG .PNG</p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col class="col-12" sm="8" md="8">
                                    <v-container class="p-4">
                                        <v-row v-if="id === ''">
                                            <v-skeleton-loader
                                            v-bind="attrs"
                                            type="article, actions"
                                            ></v-skeleton-loader>
                                        </v-row>
                                        <v-row v-else>
                                            <v-col class="col-12" sm="3" md="3">
                                                {{ $t("labels.fullname") }}
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{$store.state.user.name}}
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                {{ $t('labels.zipCode') }}
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{ zip_code }}
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                {{$t('labels.prefecture')}}
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{prefecture}}
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                {{ $t('labels.city') }}
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{city}}
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                {{$t('labels.streen')}}
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{street}}
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                {{$t('labels.building')}}
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{building}}
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                {{$t('labels.tel')}}
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{tel}}
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                {{$t('labels.contactMethod')}}
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{contact_method}}
                                            </v-col>
                                        </v-row>
                                        <v-row class="mt-0 pt-0">
                                            <v-col cols="12">
                                                <v-btn
                                                    block
                                                    color="secondary"
                                                    elevation="2"
                                                    outlined
                                                    class="mt-5"
                                                    to="/patient/password"
                                                >
                                                パスワード更新
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-dialog
                    v-model="dialog"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                Ubah Email
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            Email
                                        </h6>
                                        <v-text-field
                                        solo
                                        v-model="emails"
                                        :error-messages="errors"
                                        label="Email"
                                        append-icon="mdi-email"
                                        hint="Please input your Email"
                                        
                                        ></v-text-field>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="submit()">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_nama"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                Ubah Nama
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            Nama
                                        </h6>
                                        <v-text-field
                                        solo
                                        v-model="name"
                                        :error-messages="errors"
                                        label="Name"
                                        append-icon="mdi-account-settings"
                                        hint="Please input your Name"
                                        
                                        ></v-text-field>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="submit()">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_phone"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                Ubah No HP
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            No HP
                                        </h6>
                                        <v-text-field
                                        solo
                                        v-model="phone"
                                        :error-messages="errors"
                                        label="Phone"
                                        append-icon="mdi-phone"
                                        hint="Please input your phone"
                                        
                                        ></v-text-field>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="submit()">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_password"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                Ubah Kata Sandi
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            Kata Sandi Baru
                                        </h6>
                                        <v-text-field
                                            solo
                                            v-model="password"
                                            :error-messages="errors"
                                            label="Password"
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show ? 'text' : 'password'"
                                            @click:append="show = !show"
                                            hint="Please input your password"
                                            counter
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            Konfirmasi Kata Sandi Baru
                                        </h6>
                                        <v-text-field
                                            solo
                                            v-model="password_confirm"
                                            :error-messages="errors"
                                            label="Confirm Password"
                                            :append-icon="show_confirm ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show_confirm ? 'text' : 'password'"
                                            @click:append="show_confirm = !show_confirm"
                                            hint="Please input your password"
                                            counter
                                            >
                                        </v-text-field>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="submitPassword()">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_avatar"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                    写真を選択
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            写真を選択
                                        </h6>

                                        <div v-if="imgSrc" style="width: auto; height:500px; border: 1px solid gray; display: inline-block;">
                                            <vue-cropper
                                                ref='cropper'
                                                :guides="true"
                                                :view-mode="2"
                                                drag-mode="crop"
                                                :auto-crop-area="0.5"
                                                :min-container-width="250"
                                                :min-container-height="180"
                                                :background="true"
                                                :rotatable="true"
                                                :src="imgSrc"
                                                :aspectRatio= "1/1"
                                                :img-style="{ 'width': 'auto', 'height': '500px' }">
                                            </vue-cropper>
                                        </div>

                                        <div v-else>
                                            <input type="file" name="image" id="image" @change="setImage" class="form-control" accept="image/*">
                                        </div>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="saveAvatar()">{{$t('buttons.save')}}</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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
    </v-container>
</template>
<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
    components:{
        VueCropper
    },
    data() {
        return {
            attrs: {
                class: 'mb-6',
                boilerplate: true,
                elevation: 2,
            },
            email: '',
            password: '',
            password_confirm: '',
            avatar: '',
            error: true,
            show: false,
            show_confirm: false,
            errors: [],
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
            phone: '',
            name: '',
            emails: '',
            group: '',
            dialog: false,
            dialog_nama: false,
            dialog_phone: false,
            dialog_password: false,
            dialog_avatar: false,
            imgSrc: '',
            imgAvatar: '',
            cropImg: '',
            userModel: null,
            profile_img: '',
            zip_code: '',
            prefecture: '',
            city: '',
            street: '',
            building: '',
            tel: '',
            contact_methods: [
                {
                    label: 'Line',
                    value: 'line'
                },
                {
                    label: 'Mail',
                    value: 'mail'
                },
                {
                    label: 'SMS',
                    value: 'sms'
                },
            ],
            contact_method: 'line',
            id: ''
        }
    },
    mounted(){
        this.getProfile()
    },
    methods:{
        reset() {
            this.imgSrc = ''
            this.cropImg = ''
		},
        setImage(e) {
			this.reset()
			const file = e.target.files[0]
			if (!file.type.includes('image/')) {
				alert('Please select an image file');
				return;
			}
			if (typeof FileReader === 'function') {
				const reader = new FileReader()
				reader.onload = (event) => {
					this.imgSrc = event.target.result
				};
				reader.readAsDataURL(file)
			} else {
				alert('Sorry, FileReader API not supported')
			}
		},
        async saveAvatar(){

            this.cropImg = this.imgSrc ? this.$refs.cropper.getCroppedCanvas().toDataURL() : ''

            await axios.post(`${process.env.VUE_APP_URL}/api/v1/set_profile_img`, {
                'id': this.id,
                'profile_img': this.cropImg
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenUser}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutUser").then(() => {
                        this.$router.push('/')
                    });
                } else if(res.data.error_message != ''){
                    this.snackbar = {
                        color: "red text-white",
                        icon: "mdi-checkbox-marked-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: res.data.error_message,
                        visible: true
                    }; 
                } else {
                    this.loading = false
                    this.dialog_avatar = false
                    this.imgSrc = ''
                    this.cropImg = ''
                    this.getProfile()
                    this.$store.dispatch('getHeaderAvatar')
                    this.snackbar = {
                        color: "secondary text-white",
                        icon: "mdi-checkbox-marked-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Success",
                        text: "Successfully Change Avatar",
                        visible: true
                    };
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        async submit(){

            // this.loading = true

            // var reqBody = {
            //     'password': this.password,
            //     'name1': this.name,
            //     'phone': this.phone,
            //     'email': this.emails
            // }

            // const respData = await backendApi.fetchCore('/api/profile', reqBody, false, false, false)

            // if (respData.status === 200) {
            //     this.loading = false
            //     this.dialog = false
            //     this.dialog_nama = false
            //     this.dialog_phone = false
            //     this.dialog_password = false
            //     this.getPullData()
            //     this.snackbar = {
            //         color: "success",
            //         icon: "mdi-checkbox-marked-circle",
            //         mode: "multi-line",
            //         position: "top",
            //         timeout: 7500,
            //         title: "Success",
            //         text: "Successfully Update Profile",
            //         visible: true
            //     };
            // } else {
            //     this.snackbar = {
            //         color: "error",
            //         icon: "mdi-alert-circle",
            //         mode: "multi-line",
            //         position: "top",
            //         timeout: 7500,
            //         title: "Error",
            //         text: 'Internal Server Error' + respData.status,
            //         visible: true
            //     };
            // }
        }, 
        async getProfile(){
            await axios.get(`${process.env.VUE_APP_URL}/api/v1/profile`, { 
                headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutUser").then(() => {
                        this.$router.push('/')
                    });
                } else {
                    this.zip_code = res.data.value.zip
                    this.prefecture = res.data.value.prefecture
                    this.city = res.data.value.city
                    this.street = res.data.value.street
                    this.building = res.data.value.building
                    this.tel = res.data.value.mobile
                    this.id = res.data.value.id

                    this.getPullData(res.data.value.id)
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        async getPullData(id){
            this.loading = true
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/get_profile_img`, {
                'id': id
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenUser}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutUser").then(() => {
                        this.$router.push('/')
                    });
                } else if(res.data.error_message != ''){
                    this.snackbar = {
                        color: "red text-white",
                        icon: "mdi-checkbox-marked-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: res.data.error_message,
                        visible: true
                    }; 
                } else {
                    this.profile_img = res.data.value.profile_img
                    this.loading = false
                }
            }).catch(err => {
                console.log(err.response);
            })           
        },
        ubahEmail(){
            this.dialog = true
        },
        ubahNama(){
            this.dialog_nama = true
        },
        ubahPhone(){
            this.dialog_phone = true
        },
        ubahPassword(){
            this.dialog_password = true
        },
        changeAvatar(){
            this.dialog_avatar = true
        }
    },
    watch: {
    }
}
</script>