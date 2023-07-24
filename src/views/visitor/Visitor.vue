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
        <v-row class="mt-5" align="center" justify="center" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.ID") }}</h6>
                    <v-text-field
                        solo
                        :label="$t('labels.ID')"
                        persistent-hint
                        required
                        v-model="id"
                        class="ma-0 pa-0 border-12"
                        hide-details=true
                    >
                    </v-text-field>
                </div>    
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.fullname") }}</h6>
                    <v-text-field
                        solo
                        :label="$t('labels.fullname')"
                        persistent-hint
                        required
                        v-model="name"
                        class="ma-0 pa-0 border-12"
                        hide-details=true
                    >
                    </v-text-field>
                </div>                        
            </v-col>
        </v-row>
        <v-row class="mt-5" align="center" justify="center" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.dateofBirthday") }}</h6>
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
                </div>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.address") }}</h6>
                    <v-text-field
                        solo
                        :label="$t('labels.address')"
                        persistent-hint
                        required
                        v-model="address"
                        class="ma-0 pa-0 border-12"
                        hide-details=true
                    >
                    </v-text-field>
                </div>                        
            </v-col>
        </v-row>
        <v-row class="mt-8" align="center" justify="center" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="3" md="3">
                <v-btn block class="border-12 text-white p-4" color="secondary" @click="getVisitor()">{{ $t('labels.search') }}</v-btn>
            </v-col>
            <v-col cols="12" xs="12" sm="3" md="3">
                <v-btn block class="border-12 p-4" color="#fff" @click="clear()">{{ $t('labels.clear') }}</v-btn>
            </v-col>
        </v-row>
        <v-row v-show="display === 'block' ? true : false">
            <v-col cols="12">
                <v-card class="elevation-12 rounded-l" style="border-top: 3px solid #e83e8c;">
                    <v-card-title>
                        <v-btn
                        small
                        color="success"
                        class="py-5 border-12"
                        to="/staff/visitor/create"
                        >
                        <v-icon>
                            mdi-plus
                        </v-icon>
                        新規作成
                        </v-btn>
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <v-data-table
                            :headers="headers"
                            :items="visitors"
                            :options.sync="options"
                            :loading="loadingDatatable"
                            loading-text="Please wait, retrieving data"
                            :server-items-length="totalItems"
                            :page.sync="pagination"
                            page-count="10"
                            class="elevation-1"
                        >
                            <!-- <template v-slot:top>
                                <v-text-field v-model="searchItem" label="Search... " class="mx-4" ></v-text-field>
                            </template> -->
                            <template v-slot:[`header.id`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.name`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.rubi`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.email`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.date_of_birth`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.mobile`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.address`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`item.action`]="{ item }">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon small class="mr-2" @click="showItem(item)" v-on="on">
                                            mdi-eye
                                        </v-icon>
                                    </template>
                                    <span>Show</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-show="displayItem === 'block' ? true : false">
            <v-col cols="12">
                <v-card class="elevation-12 rounded-l" style="border-top: 3px solid #e83e8c;">
                    <v-card-title >
                        <h6 style="font-weight:600">{{this.detailItem ? this.detailItem.name : '' }} (JCDC) {{this.detailItem ? this.detailItem.rubi : ''}}</h6>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="mx-2"
                            fab
                            small
                            color="#e83e8c;"
                            @click="close()"
                        >
                            <v-icon dark>
                                mdi-close
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-subtitle>
                        {{this.detailItem ? this.detailItem.date_of_birth : '' }} | {{this.detailItem ? this.detailItem.gender : '' }} | {{this.detailItem ? this.detailItem.email : '' }}
                    </v-card-subtitle>
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{this.detailItem ? this.detailItem.address : '' }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-phone</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{this.detailItem ? this.detailItem.mobile : '' }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-tabs
                        color="#e83e8c"
                        center-active
                        v-model="tab"
                    >
                        <v-tab href="#tab-profile">発送先</v-tab>
                        <v-tab href="#tab-message">Message</v-tab>
                        <v-tab href="#tab-history">History</v-tab>
                        <v-tab>Image</v-tab>
                        <v-tab>Doc</v-tab>
                        <v-tab>Note</v-tab>
                        <v-tab>Process</v-tab>
                        <v-tab>Estimation</v-tab>
                        <v-tab>Interview</v-tab>
                        <v-tab>Purchase History</v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item
                            value="tab-profile"
                        >
                            <validation-observer
                                ref="observer"
                            >
                                <form @submit.prevent="submitProfile">
                                    <v-container class="pl-lg-5 pr-lg-5 mt-lg-5">
                                        <!-- <v-row>
                                            <v-col cols="12" xs="12" sm="12" md="12">
                                                <h6  class="text-weight-bold">ID : {{id}}</h6>
                                                <h6  class="text-weight-bold">{{ $t("labels.fullname") }} : {{$store.state.user.name}}</h6>
                                            </v-col>
                                        </v-row> -->
                                        <v-row class="mt-lg-5">
                                            <v-col cols="12" xs="12" sm="6" md="4" class="pt-0 pb-0">
                                                <h6 class="pink-heading">郵便番号 （ハイフンなし）</h6>
                                                <validation-provider
                                                v-slot="{ errors }"
                                                name="郵便番号は必須です"
                                                rules="required"
                                                >
                                                    <v-text-field
                                                        solo
                                                        :label="$t('labels.zipCode')"
                                                        persistent-hint
                                                        required
                                                        v-model="zip_code"
                                                        :error-messages="errors"
                                                        class="ma-0 pa-0 mr-3"
                                                    >
                                                    <template slot="append-outer">
                                                        <v-btn class="rounded-l text-white p-4 text-h6 text-right" color="#e83e8c">
                                                            <v-icon>
                                                                mdi-magnify
                                                            </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    </v-text-field>                                   
                                                </validation-provider>
                                            </v-col>
                                            <v-col cols="12" xs="12" sm="6" md="4" class="pt-0 pb-0">
                                                <h6 class="pink-heading">都道府県</h6>
                                                <validation-provider
                                                v-slot="{ errors }"
                                                name="都道府県は必須です"
                                                rules="required"
                                                >
                                                    <v-text-field
                                                        solo
                                                        :label="$t('labels.prefecture')"
                                                        persistent-hint
                                                        required
                                                        v-model="prefecture"
                                                        :error-messages="errors"
                                                        class="ma-0 pa-0"
                                                    ></v-text-field>
                                                </validation-provider>
                                            </v-col>
                                            <v-col cols="12" xs="12" sm="6" md="4" class="pt-0 pb-0">
                                                <h6 class="pink-heading">市区町村</h6>
                                                <validation-provider
                                                v-slot="{ errors }"
                                                name="市区町村は必須です"
                                                rules="required"
                                                >
                                                    <v-text-field
                                                        solo
                                                        :label="$t('labels.city')"
                                                        persistent-hint
                                                        required
                                                        v-model="city"
                                                        :error-messages="errors"
                                                        class="ma-0 pa-0"
                                                    ></v-text-field>
                                                </validation-provider>
                                            </v-col>
                                            <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                                <h6 class="pink-heading">住所</h6>
                                                <validation-provider
                                                v-slot="{ errors }"
                                                name="住所は必須です"
                                                rules="required"
                                                >
                                                    <v-text-field
                                                        solo
                                                        :label="$t('labels.streen')"
                                                        persistent-hint
                                                        required
                                                        v-model="street"
                                                        :error-messages="errors"
                                                        class="ma-0 pa-0"
                                                    ></v-text-field>
                                                </validation-provider>
                                            </v-col>
                                            <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                                <h6 class="pink-heading">{{ $t("labels.building") }}</h6>
                                                    <v-text-field
                                                        solo
                                                        :label="$t('labels.building')"
                                                        persistent-hint
                                                        v-model="building"
                                                        class="ma-0 pa-0"
                                                    ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                                <h6 class="pink-heading">電話番号（ハイフンなし）</h6>
                                                <validation-provider
                                                v-slot="{ errors }"
                                                name="電話番号は必須です"
                                                rules="required"
                                                >
                                                    <v-text-field
                                                        solo
                                                        :label="$t('labels.tel')"
                                                        persistent-hint
                                                        required
                                                        v-model="tel"
                                                        :error-messages="errors"
                                                        class="ma-0 pa-0"
                                                    ></v-text-field>
                                                </validation-provider>
                                            </v-col>
                                            <v-col cols="12" xs="12" sm="6" md="3" class="pt-0 pb-0">
                                                <h6 class="pink-heading">連絡方法</h6>
                                                <validation-provider
                                                v-slot="{ errors }"
                                                name="連絡方法は必須です"
                                                rules="required"
                                                >
                                                <v-autocomplete
                                                    clearable
                                                    solo
                                                    v-model="contact_method"
                                                    :items="contact_methods"
                                                    item-value="value"
                                                    item-text="label"
                                                    :label="$t('labels.contactMethod')"
                                                    :error-messages="errors"
                                                    class="ma-0 pa-0"
                                                ></v-autocomplete>
                                                </validation-provider>
                                            </v-col>
                                        </v-row>
                                        <v-row justify="center" class="mt-lg-5">
                                            <v-col cols="6" xs="6" sm="3" md="2">
                                                <v-btn type="submit" block class="rounded-l text-white p-4 text-h6" color="#e83e8c">{{$t('buttons.save')}}</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </form>
                            </validation-observer>
                        </v-tab-item>
                        <v-tab-item
                            value="tab-message"
                        >
                            <v-container
                                class="fill-height m-1"
                            >
                                <v-row class="no-gutters elevation-4" v-if="!localStream">
                                    <v-col
                                        cols="auto"
                                        class="flex-grow-1 flex-shrink-0"
                                    >
                                        <v-responsive
                                            v-if="activeChat"
                                            class="overflow-y-hidden fill-height"
                                            height="650"
                                        >
                                            <v-card
                                            flat
                                            class="d-flex flex-column fill-height"                                            
                                            >
                                            <v-card-title style="border-bottom: 1px solid grey;">
                                                {{this.detailItem ? this.detailItem.name : '' }}
                                                <v-spacer></v-spacer>
                                                <!-- <v-btn
                                                    class="mx-2"
                                                    fab
                                                    small
                                                    depressed
                                                    to="/staff/visitor/video-stream"
                                                >
                                                    <v-icon dark>
                                                        mdi-video
                                                    </v-icon>
                                                </v-btn> -->
                                            </v-card-title>
                                            <v-card-text class="flex-grow-1 overflow-y-auto p-2">
                                                <template v-for="(msg, i) in messages">                                                    
                                                    <div
                                                        :class="{ 'd-flex flex-row-reverse': msg.me }"
                                                    >
                                                        <v-menu offset-y>
                                                            <template v-slot:activator="{ on }">
                                                                <v-avatar 
                                                                    v-if="msg.me"
                                                                    color="primary"
                                                                    size="50"
                                                                >
                                                                    <img src="../../assets/logo.png"></img>
                                                                </v-avatar> 

                                                                <v-avatar
                                                                    v-else
                                                                    color="primary"
                                                                    size="50"
                                                                >
                                                                    <img src="../../assets/default-user.png"></img>
                                                                </v-avatar> 

                                                                <v-hover
                                                                    v-slot:default="{ hover }"
                                                                >
                                                                <v-chip
                                                                    :color="msg.me ? 'green' : 'secondary'"
                                                                    dark
                                                                    style="height:auto;white-space: normal;"
                                                                    class="pa-3 mt-1 ml-1 mr-1"
                                                                    v-on="on"
                                                                >
                                                                    {{ msg.content }}
                                                                    <sub
                                                                    class="ml-2"
                                                                    style="font-size: 0.5rem;"
                                                                    >{{ msg.created_at }}</sub>
                                                                    <!-- <v-icon
                                                                    v-if="hover"
                                                                    small
                                                                    >
                                                                    expand_more
                                                                    </v-icon> -->
                                                                </v-chip>
                                                                </v-hover>
                                                            </template>
                                                            <v-list>
                                                                <v-list-item>
                                                                <v-list-item-title>delete</v-list-item-title>
                                                                </v-list-item>
                                                            </v-list>
                                                        </v-menu>
                                                    </div>
                                                </template>
                                            </v-card-text>
                                            <v-card-text class="flex-shrink-1">
                                                <v-text-field
                                                solo
                                                class="rounded-xl"
                                                v-model="messageForm.content"
                                                label="Write your message ..."
                                                type="text"
                                                no-details
                                                outlined
                                                append-icon="mdi-send"
                                                @keyup.enter="sendMessages()"
                                                hide-details
                                                />
                                            </v-card-text>
                                            </v-card>
                                        </v-responsive>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item
                            value="tab-history"
                        >
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
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
    </v-container>
</template>
<script>
import { Icon } from '@iconify/vue2';
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import RTCClient from "../../stream/agora"
import StreamPlayer from "../../components/StreamPlayer.vue"
import { log } from '../../stream/utils/utils'

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
        ValidationObserver,
        StreamPlayer
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
                disabled: true,
                href: 'breadcrumbs_link_2',
                }
            ],
            show: false,
            visitors: [],
            loading: false,
            firstLoad: true,
            theme: {
                isDark: false
            },
            items: [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}],
            searchItem: '',
            loadingDatatable: false,
            headers:[
                { text: '患者ID', value: 'id', sortable: false },
                { text: '名前', value: 'name', sortable: false },
                { text: 'ルビ', value: 'rubi', sortable: false },
                { text: 'メール', value: 'email', sortable: false },
                { text: '誕生日', value: 'date_of_birth', sortable: false },
                { text: '性別', value: 'gender', sortable: false },
                { text: '電話', value: 'mobile', sortable: false },
                { text: '住所', value: 'address', sortable: false },
                { text: 'Action', value: 'action', sortable: false }
            ], 
            detailItem: null,
            display: 'block',
            displayItem: 'none',
            tab: null,
            activeChat: 1,
            messages: [
                {
                    content: "lorem ipsum",
                    me: true,
                    created_at: "11:11am"
                },
                {
                    content: "Is this template really for free? That's unbelievable!",
                    me: false,
                    created_at: "11:11am"
                },
                {
                    content: "You better believe it!",
                    me: true,
                    created_at: "11:11am"
                },
                {
                    content: "Working with AdminLTE on a great new app! Wanna join?",
                    me: false,
                    created_at: "11:12am"
                },
                {
                    content: "I would love to.",
                    me: true,
                    created_at: "11:14am"
                },
                {
                    content: "Is this template really for free? That's unbelievable!",
                    me: false,
                    created_at: "11:11am"
                },
                {
                    content: "You better believe it!",
                    me: true,
                    created_at: "11:11am"
                },
                {
                    content: "Working with AdminLTE on a great new app! Wanna join?",
                    me: false,
                    created_at: "11:12am"
                },
                {
                    content: "I would love to.",
                    me: true,
                    created_at: "11:14am"
                }
            ],
            messageForm: {
                content: "",
                me: true,
                created_at: "11:11am"
            },
            options: {},
            totalItems: 30,
            pagination: 1,
            id: '',
            name: "",
            dateofBirthday: '',
            modal: false,
            shipping_date: '',
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            address: '',
            sortBy: 'desc',
            sortName: 'id',
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
            contact_method: '',
            dialog: false,
            option: {
                appid: '5400c34f559a421797213a7f22fb4d87',
                token: '007eJxTYNBNnu7s9neGROXSpX8XLp55ZX+42OMnNyxX3d+6q+nhrGtPFBhMTQwMko1N0kxNLRNNjAzNLc2NDI0TzdOMjNKSTFIszKe4nU5uCGRk+PDbi5mRAQJBfA6GrOT4kvzs1DwGBgDs5iUB',
                uid: null,
                channel: 'jc_token',
                app_sertificate: '4d7c61a4f85d4b33ac1a8fd2737b94dd'
            },
            disableJoin: false,
            localStream: null,
            remoteStreams: [],
        }
    },
    mounted() {
        // this.getVisitor()
    },
    methods:{
        sortByFunc(sortBy){
            this.sortBy = this.sortBy === 'desc' ? 'asc' : 'desc';
            this.sortName = sortBy
            this.visitors = []
            this.getVisitor(1, 10)
        },
        sendMessages(){
            this.messages.push({
                content: this.messageForm.content,
                me: true,
                created_at: "11:11am"
            })
            this.messageForm.content = ''
        },
        async getVisitor(page = 1, itemsPerPage = 10){
            this.loadingDatatable = true
            this.pagination = page
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/visitors2`, {
                'id': this.id ? parseInt(this.id) : 0,
                'name': this.name ? this.name : '',
                'date_of_birth': this.dateofBirthday ? this.dateofBirthday : '',
                'address': this.address ? this.address : '',
                'sort_key': this.sortName,
                'order' : this.sortBy,
                'page': page,
                'limit': itemsPerPage
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    this.loadingDatatable = false
                    this.totalItems = res.data.extra
                    this.visitors = res.data.value
                }
            });
        },
        clear(){
            this.zip_code = ''
            this.prefecture = ''
            this.city = ''
            this.street = ''
            this.building = ''
            this.tel = ''
            this.contact_method = ''
            this.id = ''
            this.name = ''
            this.dateofBirthday = ''
            this.address = ''
        },  
        showItem(item){
            this.detailItem = item
            this.display = 'none'
            this.displayItem = 'block'
            this.clear()               
            this.getProfile()
        },
        async getProfile(){
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/profile`, {
                'id': this.detailItem ? parseInt(this.detailItem.id) : '',
            }, { 
                headers: { Authorization: `Bearer ${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                console.log(res.data);
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    this.zip_code = res.data.value.zip
                    this.prefecture = res.data.value.prefecture
                    this.city = res.data.value.city
                    this.street = res.data.value.street
                    this.building = res.data.value.building
                    this.tel = res.data.value.mobile
                    this.contact_method = res.data.value.contact
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        async submitProfile(){
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/update_profile`, {
                'id': this.detailItem ? parseInt(this.detailItem.id) : '',
                'zip': this.zip_code,
                'prefecture': this.prefecture,
                'city': this.city,
                'street': this.street,
                'building': this.building,
                'contact' : this.contact_method,
                'mobile': this.tel
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
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
                    this.getProfile()
                    this.snackbar = {
                        color: "primary text-white",
                        icon: "mdi-checkbox-marked-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Success",
                        text: "Successfully Update Data",
                        visible: true
                    };
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        close(){
            this.display = 'block'
            this.displayItem = 'none'
            this.getVisitor()
        },
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
        joinEvent () {
            if(!this.option.appid) {
                console.log('Appid');
                return
            }
            if(!this.option.channel) {
                console.log('Channel Name');
                return
            }
            this.rtc.joinChannel(this.option).then(() => {
                console.log('Join Success');
                // this.$message({
                //     message: 'Join Success',
                //     type: 'success'
                // });
                this.rtc.publishStream().then((stream) => {
                    console.log('Publish Success');
                    // this.$message({
                    // message: 'Publish Success',
                    // type: 'success'
                    // });
                    this.localStream = stream
                }).catch((err) => {
                    console.log(err);
                    // this.$message.error('Publish Failure');
                    log('publish local error', err)
                })
            }).catch((err) => {
                console.log(err);
                // this.$message.error('Join Failure');
                log('join channel error', err)
            })
            this.disableJoin = true
        },
        leaveEvent () {
            this.disableJoin = false
            this.rtc.leaveChannel().then(() => {
                console.log('Leave Success');
                // this.$message({
                //     message: 'Leave Success',
                //     type: 'success'
                // });
            }).catch((err) => {
                console.log('Leave Failure');
                // this.$message.error('Leave Failure')
                log('leave error', err)
            })
            this.localStream = null
            this.remoteStreams = []
        },
    },
    watch: {
        date (val) {
            this.dateofBirthday = this.formatDate(this.date)
        },
        options: {
            handler () {
                const { page, itemsPerPage } = this.options
                this.getVisitor(page, itemsPerPage)
            },
            deep: true,
        },
    },
    created() {
        this.rtc = new RTCClient()
        let rtc = this.rtc
        rtc.on('stream-added', (evt) => {
            let {stream} = evt
            log("[agora] [stream-added] stream-added", stream.getId())
            rtc.client.subscribe(stream)
        })
            
        rtc.on('stream-subscribed', (evt) => {
            let {stream} = evt
            log("[agora] [stream-subscribed] stream-added", stream.getId())
            if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
            this.remoteStreams.push(stream)
            }
        })

        rtc.on('stream-removed', (evt) => {
            let {stream} = evt
            log('[agora] [stream-removed] stream-removed', stream.getId())
            this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== stream.getId())
        }) 

        rtc.on('peer-online', (evt) => {
            this.$message(`Peer ${evt.uid} is online`)
        }) 

        rtc.on('peer-leave', (evt) => {
            this.$message(`Peer ${evt.uid} already leave`)
            this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== evt.uid)
        }) 
    }
}
</script>
<style>
.agora-video-player {
height: 100%;
width: 100%;
}
.agora-view {
    display: flex;
    flex-wrap: wrap;
}
</style>
