<template>
    <v-container style="margin-bottom: 100px">
        <v-row>
            <v-col cols="12">
                <v-breadcrumbs :items="breadcumbs">
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
        <v-row>
            <v-col cols="12">
                <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                >
                    <form @submit.prevent="submitProfile">
                        <v-container>
                            <v-row>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">名前</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="名前"
                                    rules="required"
                                    >
                                        <v-text-field
                                            solo
                                            label="名前"
                                            persistent-hint
                                            required
                                            v-model="name"
                                            :error-messages="errors"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>                                   
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">読み仮名</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="読み仮名"
                                    rules="required"
                                    >
                                        <v-text-field
                                            solo
                                            label="読み仮名"
                                            persistent-hint
                                            required
                                            v-model="ruby"
                                            :error-messages="errors"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>                                   
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">性別</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="性別"
                                    rules="required"
                                    >
                                        <v-autocomplete
                                            solo
                                            clearable
                                            v-model="gender"
                                            :items="genders"
                                            item-value="value"
                                            item-text="name"
                                            class="ma-0 pa-0 border-12"
                                            :error-messages="errors"
                                        ></v-autocomplete>
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">メールアドレス</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="メールアドレス"
                                    :rules="email"
                                    >
                                        <v-text-field
                                            solo
                                            label="メールアドレス"
                                            persistent-hint
                                            required
                                            v-model="email"
                                            :error-messages="errors"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>                                   
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">電話番号</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="電話番号"
                                    rules="required"
                                    >
                                        <v-text-field
                                            solo
                                            label="電話番号"
                                            persistent-hint
                                            required
                                            v-model="tel"
                                            :error-messages="errors"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>                                   
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">郵便番号</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="郵便番号"
                                    rules="required"
                                    >
                                        <v-text-field
                                            solo
                                            label="郵便番号"
                                            persistent-hint
                                            required
                                            v-model="zip"
                                            :error-messages="errors"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>                                   
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">都道府県</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="都道府県"
                                    rules="required"
                                    >
                                        <v-text-field
                                            solo
                                            label="都道府県"
                                            persistent-hint
                                            required
                                            v-model="prefecture"
                                            :error-messages="errors"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>                                   
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">市区町村</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="市区町村"
                                    rules="required"
                                    >
                                        <v-text-field
                                            solo
                                            label="市区町村"
                                            persistent-hint
                                            required
                                            v-model="city"
                                            :error-messages="errors"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>                                   
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">住所</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="住所"
                                    rules="required"
                                    >
                                        <v-text-field
                                            solo
                                            label="住所"
                                            persistent-hint
                                            required
                                            v-mode="address"
                                            :error-messages="errors"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>                                   
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">建物名</h6>
                                    <validation-provider
                                    v-slot="{ errors }"
                                    name="建物名"
                                    rules="required"
                                    >
                                        <v-text-field
                                            solo
                                            label="建物名"
                                            persistent-hint
                                            required
                                            v-mode="building"
                                            :error-messages="errors"
                                            class="ma-0 pa-0 border-12"
                                        >
                                        </v-text-field>                                   
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                    <h6 class="pink-heading">建物名</h6>
                                    <v-menu
                                        ref="modal"
                                        v-model="modal"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="auto"
                                        >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                            solo
                                            v-model="dateofBirthday"
                                            :label="$t('labels.dateofBirthday')"
                                            persistent-hint
                                            append-icon="mdi-calendar"
                                            v-bind="attrs"
                                            v-on="on"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @blur="date = parseDate(dateofBirthday)"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            no-title
                                            @input="modal = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" xs="12" sm="6" md="4" class="pt-0 pb-0">
                                    <h6 class="pink-heading">アレルギー情報</h6>
                                    <v-textarea
                                    solo
                                    name="input-7-4"
                                    label="アレルギー情報"
                                    class="border-12"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="4" class="pt-0 pb-0">
                                    <h6 class="pink-heading">特記事項</h6>
                                    <v-textarea
                                    solo
                                    name="input-7-4"
                                    label="特記事項"
                                    class="border-12"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="4" class="pt-0 pb-0">
                                    <h6 class="pink-heading">服用中のお薬</h6>
                                    <v-textarea
                                    solo
                                    name="input-7-4"
                                    label="服用中のお薬"
                                    class="border-12"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row justify="center" class="mt-lg-5">
                                <v-col cols="6" xs="6" sm="3" md="2">
                                    <v-btn block class="rounded-l p-4 text-h6" color="#fff" @click="$router.go(-1)">{{$t('buttons.back')}}</v-btn>
                                </v-col>
                                <v-col cols="6" xs="6" sm="3" md="2">
                                    <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#e83e8c" :disabled="invalid">保存</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </form>
                </validation-observer>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { Icon } from '@iconify/vue2';
    import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

    setInteractionMode('eager')

    extend('digits', {
        ...digits,
        message: '{_field_} needs to be {length} digits. ({_value_})',
    })

    extend('required', {
        ...required,
        message: '{_field_}',
    })

    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    })

    extend('regex', {
        ...regex,
        message: '{_field_} {_value_} does not match {regex}',
    })

    extend('email', {
        ...email,
        message: 'Email must be valid',
    })

    export default {
        components: {
            Icon,
            ValidationProvider,
            ValidationObserver
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
                breadcumbs: [
                    {
                    text: 'ホーム',
                    disabled: false,
                    href: '/staff/dashboard',
                    },
                    {
                    text: '来院者',
                    disabled: false,
                    href: '/staff/visitor',
                    },
                    {
                    text: '新規作成',
                    disabled: true,
                    href: '',
                    }
                ],
                name: '',
                ruby: '',
                genders: [
                    {
                        name: 'Male',
                        value: 'male'
                    },
                    {
                        name: 'Female',
                        value: 'female'
                    },
                    {
                        name: 'Other',
                        value: 'other'
                    }
                ],
                gender: '',
                email: '',
                tel: '',
                zip: '',
                prefecture:'',
                city: '',
                address: '',
                building:'',
                date_of_birth: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                allergy_info: '',
                special_note: '',
                medications_diseases:'',
                modal: false,
                dateofBirthday: '',
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            }
        },
        mounted() {
        },
        methods:{
            parseDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${year}/${month}/${day}`
            },
            async submitProfile(){
            }
        },
        watch: {
            date (val) {
                this.dateofBirthday = this.formatDate(this.date)
            },
        }
    }
</script>