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
        <v-row class="mt-5" align="center" justify="center" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.patientID") }}</h6>
                    <v-text-field
                        solo
                        :label="$t('labels.patientID')"
                        persistent-hint
                        required
                        v-model="patientID"
                        class="ma-0 pa-0 border-12"
                        hide-details=true
                    >
                    </v-text-field>
                </div>    
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.cardActive") }}</h6>
                    <v-autocomplete
                        solo
                        clearable
                        v-model="cardActive"
                        :items="cardActives"
                        item-value="value"
                        item-text="label"
                        :label="$t('labels.cardActive')"
                        class="ma-0 pa-0 border-12"
                        hide-details=true
                    ></v-autocomplete>
                </div>                        
            </v-col>
        </v-row>
        <v-row class="mt-8" align="center" justify="center" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.name") }}</h6>
                    <v-text-field
                        solo
                        :label="$t('labels.name')"
                        persistent-hint
                        required
                        v-model="name"
                        class="ma-0 pa-0 border-12 border-12"
                        hide-details=true
                    >
                    </v-text-field>
                </div>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.status") }}</h6>
                    <v-autocomplete
                        solo
                        clearable
                        v-model="status"
                        :items="statuses"
                        item-value="value"
                        item-text="label"
                        :label="$t('labels.status')"
                        class="ma-0 pa-0 border-12"
                        hide-details=true
                    ></v-autocomplete>
                </div>
            </v-col>
        </v-row>
        <v-row class="mt-8" align="center" justify="center" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="3" md="3">
                <v-btn block class="border-12 text-white p-4" color="secondary" @click="searchItems()">{{ $t('labels.search') }}</v-btn>
            </v-col>
            <v-col cols="12" xs="12" sm="3" md="3">
                <v-btn block class="border-12 p-4" color="#fff" @click="clear()">{{ $t('labels.clear') }}</v-btn>
            </v-col>
        </v-row>
        <v-row class="mt-10" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="12" md="12">
                <v-card class="rounded-l" style="border-top: 3px solid #e83e8c;">
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="payments"
                            :options.sync="options"
                            :loading="loading"
                            loading-text="Please wait, retrieving data"
                            :server-items-length="totalItems"
                            :page.sync="pagination"
                            :search="search"
                            page-count="10"
                            class="elevation-1"
                        >
                            <template v-slot:[`header.patient_id`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.name`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.register_date`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`item.card_status`]="{ item }">
                                <v-chip
                                class="ma-2 pl-5 pr-5"
                                color="green"
                                text-color="white"
                                v-if="item.card_status === 1"
                                >
                                    登録済
                                </v-chip>
                                <v-chip
                                class="ma-2 pl-5 pr-5"
                                color="red"
                                text-color="white"
                                v-if="item.card_status === 0"
                                >
                                    未登録
                                </v-chip>
                                <v-chip
                                class="ma-2 pl-5 pr-5"
                                color="secondary"
                                text-color="white"
                                v-if="item.card_status === -1"
                                >
                                    Not Search
                                </v-chip>
                            </template>
                            <template v-slot:[`item.subscription_status`]="{ item }">
                                <v-chip
                                class="ma-2 pl-5 pr-5"
                                color="green"
                                text-color="white"
                                v-if="item.subscription_status === 1"
                                >
                                    On
                                </v-chip>
                                <v-chip
                                class="ma-2 pl-5 pr-5"
                                color="red"
                                text-color="white"
                                v-if="item.subscription_status === 0"
                                >
                                    Off
                                </v-chip>
                                <v-chip
                                class="ma-2 pl-5 pr-5"
                                color="secondary"
                                text-color="white"
                                v-if="item.subscription_status === -1"
                                >
                                    Not Search
                                </v-chip>
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
                        <!-- <h6 style="font-weight:600">{{this.detailItem ? this.detailItem.patient_id : '' }}</h6> -->
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
                    <v-card-text>
                        <v-container>
                            <v-row align="center" justify="center" class="mb-2">
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">
                                    <!-- <div class="d-flex"> -->
                                        <h6 class="blue-lcd mr-5">{{ $t("labels.salonCode") }} : </h6>
                                        <h6 class="mr-5">{{salon_code}}</h6>
                                    <!-- </div> -->
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">
                                    <!-- <div class="d-flex"> -->
                                        <h6 class="blue-lcd mr-5">{{ $t("labels.FirstTreatmentDay") }} : </h6>
                                        <h6 class="mr-5">{{date_of_first}}</h6>
                                    <!-- </div> -->
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">  
                                    <!-- <div class="d-flex"> -->
                                        <!-- <p>'</p> -->
                                        <v-btn
                                        elevation="2"
                                        outlined
                                        color="blue"
                                        @click="createLink()"
                                        > {{ $t("buttons.CreateLink") }} </v-btn>
                                    <!-- </div>  -->
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">
                                    <!-- <div class="d-flex"> -->
                                        <h6 class="blue-lcd mr-5">{{ $t("labels.patientID") }} : </h6>
                                        <h6 class="mr-5">{{this.detailItem ? this.detailItem.patient_id : '' }}</h6>
                                    <!-- </div> -->
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0" v-if="this.detailItem">
                                    <!-- <div class="d-flex"> -->
                                        <h6 class="blue-lcd mr-5">{{ $t("labels.cardActive") }} : </h6>

                                        <v-chip
                                        small
                                        class="pl-5 pr-5 pt-0"
                                        color="green"
                                        text-color="white"
                                        v-if="this.detailItem.card_status === 1"
                                        >
                                            ON
                                        </v-chip>
                                        <v-chip
                                        small
                                        class="pl-5 pr-5 pt-0"
                                        color="red"
                                        text-color="white"
                                        v-if="this.detailItem.card_status === 0"
                                        >
                                            OFF
                                        </v-chip>
                                        <v-chip
                                        small
                                        class="pl-5 pr-5 pt-0"
                                        color="secondary"
                                        text-color="white"
                                        v-if="this.detailItem.card_status === -1"
                                        >
                                            Not Search
                                        </v-chip>
                                    <!-- </div>  -->
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">  
                                    <h6 class="blue-lcd mr-5">発送予定日 : </h6>
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
                                                dense
                                                solo
                                                v-model="shipping_date"
                                                label="発送予定日"
                                                persistent-hint
                                                append-icon="mdi-calendar"
                                                v-bind="attrs"
                                                v-on="on"
                                                class="ma-0 pa-0 border-12"
                                                @blur="date = parseDate(shipping_date)"
                                                hide-details
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="date"
                                                no-title
                                                @input="setShippingDate()"
                                            ></v-date-picker>
                                      </v-menu>
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">
                                    <!-- <div class="d-flex"> -->
                                        <h6 class="blue-lcd mr-5">お名前 : </h6>
                                        <h6 class="mr-5 mb-4">{{this.detailItem ? this.detailItem.name : '' }}</h6>
                                    <!-- </div> -->
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">
                                    <!-- <div class="d-flex"> -->
                                        <h6 class="blue-lcd mr-5 mb-0">{{ $t("labels.status") }} : </h6>
                                        <v-switch
                                        class="mt-1 mb-2"
                                        v-model="subscription_status"
                                        inset
                                        color="secondary"
                                        @change="(event) => updateSubscriptionStatus(event)"
                                        hide-details
                                        ></v-switch>
                                    <!-- </div> -->
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">
                                    <!-- <div class="d-flex"> -->
                                        <h6 class="blue-lcd mr-5">発送日 : </h6>
                                        <v-menu
                                            ref="last_modal"
                                            v-model="last_modal"
                                            :close-on-content-click="false"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="auto"
                                            >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                dense
                                                solo
                                                v-model="last_shipping_date"
                                                label="発送日"
                                                persistent-hint
                                                append-icon="mdi-calendar"
                                                v-bind="attrs"
                                                v-on="on"
                                                class="ma-0 pa-0 border-12"
                                                @blur="last_date = parseDate(last_shipping_date)"
                                                hide-details
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="last_date"
                                                no-title
                                                @input="setLastShippingDate()"
                                            ></v-date-picker>
                                      </v-menu>
                                    <!-- </div> -->
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center" class="mt-3">
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">
                                    <!-- <div class="d-flex"> -->
                                        <h6 class="blue-lcd mr-5">{{ $t("labels.price") }} : </h6>
                                        <div class="d-flex" v-if="detailTransaction">
                                            <h6 class="mr-1">{{ detailTransaction ? $store.getters.convertToCurrencyUs(detailTransaction.price) : ''}}
                                            </h6>
                                            <div>
                                                <v-chip
                                                    small
                                                    outlined
                                                    class="ml-1 pl-7 pr-7"
                                                    color="blue"
                                                    @click="payment()"
                                                    v-if="this.detailTransaction.paid != 1"
                                                    :disabled="this.detailTransaction.price <= 0 ? true : false"
                                                >
                                                    {{ $t("labels.execute") }}
                                                </v-chip>
                                                <v-chip
                                                    small
                                                    outlined
                                                    class="ml-1 pl-7 pr-7"
                                                    color="red"
                                                    @click="dialog_cancel_payment = true"
                                                    :disabled="this.detailTransaction.price <= 0 ? true : false"
                                                    v-else
                                                >
                                                    キャンセル
                                                </v-chip>
                                            </div>
                                        </div>
                                    <!-- </div> -->
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0">
                                    <!-- <div class="d-flex"> -->
                                        <h6 class="blue-lcd mr-5">{{ $t("labels.paymentDatetime") }} : </h6>
                                        <h6 class="mr-5">{{ detailTransaction ? detailTransaction.payment_date : ''}}</h6>
                                    <!-- </div> -->
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0" v-if="detailTransaction">
                                    <!-- <div class="d-flex" v-if="detailTransaction"> -->
                                        <h6 class="blue-lcd mr-5">{{ $t("labels.paymentStatus") }} : </h6>
                                        <v-chip
                                            small
                                            class="pl-5 pr-5"
                                            color="green"
                                            text-color="white"
                                            v-if="this.detailTransaction.paid === 1"
                                        >
                                            {{ $t("labels.paid") }}
                                        </v-chip>
                                        <v-chip
                                            small
                                            class="pl-5 pr-5"
                                            color="red"
                                            text-color="white"
                                            v-else
                                        >
                                            {{ $t("labels.unpaid") }}
                                        </v-chip>
                                    <!-- </div> -->
                                </v-col>
                                <v-col cols="12" xs="12" sm="6" md="3" lg="2" xl="2" class="pt-0 pb-0" v-else>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5 mb-5" align="center" justify="center">
                                <v-col cols="12" xs="12" sm="12" md="11" lg="10" class="">
                                    <v-card>
                                        <v-card-text>
                                            <v-simple-table dense class="border-12">
                                                <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th class="blue lighten-5">診療日時</th>
                                                        <th class="blue lighten-5" style="min-width: 70px;">種別</th>
                                                        <th class="blue lighten-5">コース内容</th>
                                                        <th class="blue lighten-5">決済状態</th>
                                                        <th class="blue lighten-5">金額</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(operation, i) in operations" :key="i"  @click="handleClickDetail(operation)">
                                                        <td>
                                                            <tr>
                                                                <td>
                                                                    '
                                                                </td>
                                                            </tr>
                                                            <tr v-for="(treatment, index) in operation.treatments" :key="index">
                                                                <td>{{ operation.consultation_date }}</td>
                                                            </tr>
                                                            <tr v-for="(medicine, y) in operation.medicines" :key="y">
                                                                <td>{{ operation.consultation_date }}</td>
                                                            </tr>
                                                            <tr v-for="(item, x) in operation.items" :key="x">
                                                                <td>{{ operation.consultation_date }}</td>
                                                            </tr>
                                                        </td>
                                                        <td>
                                                            <tr>
                                                                <td>
                                                                   ' 
                                                                </td>
                                                            </tr>
                                                            <tr v-for="(treatment, b) in operation.treatments" :key="b">
                                                                <td :class="treatment.cancelled == 1 ? 'text-decoration-line-through' : ''">施術</td>
                                                            </tr>
                                                            <tr v-for="(medicine, a) in operation.medicines" :key="a">
                                                                <td :class="medicine.cancelled == 1 ? 'text-decoration-line-through' : ''">薬剤</td>
                                                            </tr>
                                                            <tr v-for="(item, z) in operation.items" :key="z">
                                                                <td :class="item.cancelled == 1 ? 'text-decoration-line-through' : ''">商品</td>
                                                            </tr>
                                                        </td>
                                                        <td>
                                                            <tr>
                                                                <td>
                                                                   ' 
                                                                </td>
                                                            </tr>
                                                            <tr v-for="(treatment, d) in operation.treatments" :key="d">
                                                                <td :class="treatment.cancelled == 1 ? 'text-decoration-line-through' : ''">{{treatment.name.length > 22 ? treatment.name.substr(0,25) + '...' : treatment.name}}</td>
                                                            </tr>
                                                            <tr v-for="(medicine, f) in operation.medicines" :key="f">
                                                                <td :class="medicine.cancelled == 1 ? 'text-decoration-line-through' : ''">{{medicine.name.length > 25 ? medicine.name.substr(0,25) + '...' : medicine.name}}</td>
                                                            </tr>
                                                            <tr v-for="(item, c) in operation.items" :key="c">
                                                                <td :class="item.cancelled == 1 ? 'text-decoration-line-through' : ''">{{item.name.length > 25 ? item.name.substr(0,25) + '...' : item.name}}</td>
                                                            </tr>
                                                        </td>
                                                        <td class="text-center pt-1" style="vertical-align: top;">
                                                            <tr>
                                                                <td>
                                                                    <v-chip
                                                                        small
                                                                        class="mt-0 pl-5 pr-5 pt-0 pb-0"
                                                                        color="green"
                                                                        text-color="white"
                                                                        v-if="operation.paid === 1"
                                                                    >
                                                                        {{ $t("labels.paid") }}
                                                                    </v-chip>
                                                                    <v-chip
                                                                        small
                                                                        class="mt-0 pl-5 pr-5 pt-0 pb-0"
                                                                        color="red"
                                                                        text-color="white"
                                                                        v-else
                                                                    >
                                                                        {{ $t("labels.unpaid") }}
                                                                    </v-chip>
                                                                </td>
                                                            </tr>
                                                            
                                                        </td>
                                                        <td class="text-center pt-1" style="vertical-align: top;">
                                                            <tr>
                                                                <td>
                                                                    <strong>{{$store.getters.convertToCurrencyUs(operation.price)}}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr v-for="(treatment, d) in operation.treatments" :key="d">
                                                                <td v-if="(treatment.price != 0)" :class="[treatment.price < 0 ? 'red--text' : '', treatment.cancelled == 1 ? 'text-decoration-line-through' : '']">{{$store.getters.convertToCurrencyUs(treatment.price)}}</td>
                                                                <td v-else>-</td>
                                                            </tr>
                                                            <tr v-for="(medicine, f) in operation.medicines" :key="f">
                                                                <td v-if="(medicine.price != 0)" :class="[medicine.price < 0 ? 'red--text' : '', medicine.cancelled == 1 ? 'text-decoration-line-through' : '']">{{$store.getters.convertToCurrencyUs(medicine.price)}}</td>
                                                                <td v-else>-</td>
                                                            </tr>
                                                            <tr v-for="(item, c) in operation.items" :key="c">
                                                                <td v-if="(item.price != 0)" :class="[item.price < 0 ? 'red--text' : '', item.cancelled == 1 ? 'text-decoration-line-through' : '']">{{$store.getters.convertToCurrencyUs(item.price)}}</td>
                                                                <td v-else>-</td>
                                                            </tr>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: green;">
                                    {{ $t("labels.cardRegisterationLink") }}
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row align="center" justify="center">
                                    <v-col cols="12" xs="12" sm="2" md="2">
                                        <v-icon x-large color="success" class="text-center">
                                            mdi-check
                                        </v-icon>
                                    </v-col>
                                </v-row> 
                                <v-row align="center" justify="center">
                                    <v-col cols="12" xs="12" sm="8" md="10">
                                        <v-icon @click="copy">
                                            mdi-content-copy
                                        </v-icon>
                                        <textarea
                                        class="p-2 mt-1"
                                        style="width:100%; height: 150px; border: 1px solid #afadad; border-radius:12px" 
                                        v-on:focus="$event.target.select()" 
                                        ref="myinput" 
                                        readonly 
                                        :value="url_link ? url_link : 'Pls wait...'"/>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="dialog = false">OK</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_payment"
                    persistent
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row align="center" justify="center">
                                    <v-col cols="12" xs="12" sm="2" md="2">
                                        <v-icon x-large color="success" class="text-center">
                                            mdi-check
                                        </v-icon>
                                    </v-col>
                                </v-row> 
                                <v-row align="center" justify="center">
                                    <v-col cols="12" xs="12" sm="8" md="10" v-if="paid === 1">
                                        <h6 class="text-center">
                                            「既にお支払い済みです」
                                        </h6>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="8" md="10" v-else-if="subscription_status === true">
                                        <h6 class="text-center">
                                            「サブスクリプションがオンです。期日に自動で実行されます。」
                                        </h6>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="8" md="10" v-else-if="paid == 0 && subscription_status == false">
                                        <h5 class="text-center">
                                            下記お支払いを実行しますか？
                                        </h5>
                                        <div class="d-flex mt-12">
                                            <h6>患者ID : </h6>
                                            <h6 class="ml-3" style="font-weight:600">{{this.detailItem ? this.detailItem.patient_id : '' }}</h6>
                                        </div>
                                        <div class="d-flex mt-1">
                                            <h6>お名前 : </h6>
                                            <h6 class="ml-3" style="font-weight:600">{{this.detailItem ? this.detailItem.name : '' }}</h6>
                                        </div>
                                        <div class="d-flex mt-1">
                                            <h6>金額（税込み） : </h6>
                                            <h6 class="ml-3" style="font-weight:600">{{ detailTransaction ? $store.getters.convertToCurrencyUs(detailTransaction.price) : ''}}</h6>
                                        </div>
                                        <div class="d-flex mt-1">
                                            <h6>診療日時 : </h6>
                                            <h6 class="ml-3" style="font-weight:600">{{detailTransaction ? detailTransaction.consultation_date : '' }}</h6>
                                        </div>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4" v-if="paid === 1">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="dialog_payment = false">OK</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="4" v-else-if="subscription_status === true">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="dialog_payment = false">OK</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="4" v-if="paid == 0 && subscription_status == false">
                                    <v-btn type="button" block class="border-12 text-white p-4 text-h6" color="#e83e8c" @click="pay()">実行</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="4" v-if="paid == 0 && subscription_status == false">
                                    <v-btn block class="border-12 p-4 text-h6" color="#fff" @click="dialog_payment = false">閉じる</v-btn>
                                </v-col>
                                <!-- <v-col cols="12" xs="12" sm="3" md="4" v-if="paid == 1 && subscription_status == false">
                                    <v-btn block class="border-12 p-4 text-h6" color="#fff" @click="cancelPayment()">閉じる</v-btn>
                                </v-col> -->
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_cancel_payment"
                    persistent
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row align="center" justify="center">
                                    <v-col cols="12" xs="12" sm="2" md="2">
                                        <v-icon x-large color="success" class="text-center">
                                            mdi-check
                                        </v-icon>
                                    </v-col>
                                </v-row> 
                                <v-row align="center" justify="center">
                                    <v-col cols="12" xs="12" sm="8" md="10">
                                        <h5 class="text-center">
                                            下記お支払いのキャンセルを実行しますか。
                                        </h5>
                                        <div class="d-flex mt-12">
                                            <h6>患者ID : </h6>
                                            <h6 class="ml-3" style="font-weight:600">{{this.detailItem ? this.detailItem.patient_id : '' }}</h6>
                                        </div>
                                        <div class="d-flex mt-1">
                                            <h6>お名前 : </h6>
                                            <h6 class="ml-3" style="font-weight:600">{{this.detailItem ? this.detailItem.name : '' }}</h6>
                                        </div>
                                        <div class="d-flex mt-1">
                                            <h6>金額（税込み） : </h6>
                                            <h6 class="ml-3" style="font-weight:600">{{ detailTransaction ? $store.getters.convertToCurrencyUs(detailTransaction.price) : ''}}</h6>
                                        </div>
                                        <div class="d-flex mt-1">
                                            <h6>診療日時 : </h6>
                                            <h6 class="ml-3" style="font-weight:600">{{detailTransaction ? detailTransaction.consultation_date : '' }}</h6>
                                        </div>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn type="button" block class="border-12 text-white p-4 text-h6" color="#e83e8c" @click="cancelPayment()">実行</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="border-12 p-4 text-h6" color="#fff" @click="dialog_cancel_payment = false">閉じる</v-btn>
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

  export default {
    data() {
        return {
            breadcumbs: [
                {
                text: 'ホーム',
                disabled: false,
                href: '/staff/dashboard',
                },
                {
                text: '決済管理',
                disabled: true,
                href: 'breadcrumbs_link_2',
                },
                {
                text: '決済情報検索',
                disabled: true,
                href: 'breadcrumbs_link_2',
                }
            ],
            show: false,
            patientID: '',
            cardActives: [
                {value: 1, label: '登録済'},
                {value: 0, label: '未登録'},
                {value: -1, label: 'Not Search'},
            ],
            cardActive: '',
            name: '',
            status: '',
            statuses: [
                {value: 1, label: 'ON'},
                {value: 0, label: 'OFF'},
                {value: -1, label: 'Not Search'}, 
            ],
            headers: [
                { text: '患者ID', value: 'patient_id', sortable: false },
                { text: '名称', value: 'name', sortable: false },
                { text: '初診/再診', value: 'type_treatment', sortable: false },
                { text: '支払方法登録', value: 'card_status', sortable: false },
                { text: 'サブスク状態', value: 'subscription_status', sortable: false },
                { text: '経過日', value: 'elapsed_days', sortable: false },
                { text: '登録日', value: 'register_date', sortable: false },
                { text: 'Action', value: 'action' }
            ],
            payments: [],
            search: '',
            loading: false,
            options: {},
            totalItems: 10,
            pagination: 1,
            sortBy: 'desc',
            sortName: 'name',
            display: 'block',
            displayItem: 'none',
            detailItem: null,
            header_details: [
                { text: '診療日時', value: 'consultation_date', sortable: false },
                { text: '種別', value: 'type', sortable: false },
                { text: 'コース内容', value: 'course', sortable: false },
                { text: '決済状態', value: 'paid', sortable: false, align: 'center' },
                { text: '金額', value: 'price', sortable: false }
            ],
            operations: [],
            searchDetail: '',
            loadingDetail: false,
            detailTransaction: null,
            dialog: false,
            modal: false,
            subscription_status: null,
            shipping_date: '',
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            salon_code: '',
            date_of_first: '',
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
            url_link: '',
            dialog_payment: false,
            paid: null,
            dialog_cancel_payment: false,
            current_shipping_date: '',
            last_shipping_date: '',
            last_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            last_modal: false
        }
    },
    mounted() {
    },
    methods:{
        close(){
            this.display = 'block'
            this.displayItem = 'none'
            this.searchItems(this.pagination,10)
        },
        clear(){
            this.name = ''
            this.patientID = ''
            this.cardActive = ''
            this.status = ''
        },
        sortByFunc(sortBy){
            this.sortBy = this.sortBy === 'desc' ? 'asc' : 'desc';
            this.sortName = sortBy
            this.payments = []
            this.searchItems(1, 10)
        },
        async searchItems(page = 1, itemsPerPage = 10){
            console.log(this.status);
            this.loading = true
            this.pagination = page
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/payment_registrations`, {
                'name': this.name ? this.name : '',
                'patient_id': this.patientID ? parseInt(this.patientID) : '',
                'card_status': this.cardActive,
                'subscription_status': this.status === null ? '' : this.status,
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
                    this.loading = false
                    this.totalItems = res.data.extra
                    this.payments = res.data.value
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        showItem(item){
            console.log(item);
            this.detailItem = item
            this.subscription_status = item.subscription_status === 1 ? true : false
            console.log(this.subscription_status);
            this.display = 'none'
            this.displayItem = 'block'
            this.getDetailPayment()
            this.getPatientProfile()
        },
        handleClickDetail(value){
            console.log(value); 
            this.detailTransaction = value

            if (value.shipping_date != "----/--/--") {
                this.date = this.parseDate(value.shipping_date)
                this.last_date = this.parseDate(value.last_shipping_date)
                this.shipping_date = this.formatDate(this.date)
                this.last_shipping_date = this.formatDate(this.last_date)
                this.current_shipping_date = this.formatDate(this.date)
            } else {
                this.current_shipping_date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
                this.shipping_date = ''
                this.last_shipping_date = ''
            }     
        },
        async getDetailPayment(){
            this.operations = []

            await axios.post(`${process.env.VUE_APP_URL}/api/v1/payment_transaction`, {
                'patient_id': this.detailItem ? parseInt(this.detailItem.patient_id) : ''
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    if (res.data.value.length > 0) {
                        this.detailTransaction = res.data.value[0]
                        if (res.data.value[0].shipping_date != "----/--/--") {
                            this.date = this.parseDate(res.data.value[0].shipping_date)
                            this.last_date = this.parseDate(res.data.value[0].last_shipping_date)
                            this.shipping_date = this.formatDate(this.date)
                            this.last_shipping_date = this.formatDate(this.last_date)
                            this.current_shipping_date = this.formatDate(this.date)
                        } else {
                            this.current_shipping_date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
                        }                        
                        this.operations = res.data.value  
                    } else {
                        this.detailTransaction = null
                        this.shipping_date = ''
                        this.last_shipping_date = ''
                        this.current_shipping_date = ''
                        this.operations = []
                    }
                    
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        async getPatientProfile(){
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/profile`, {
                'id': this.detailItem ? parseInt(this.detailItem.patient_id) : ''
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    this.salon_code = res.data.value.salon_code
                    this.date_of_first = res.data.value.date_of_first
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        copy() {
            this.$refs.myinput.focus();
            document.execCommand('copy');

            this.snackbar = {
                color: "primary text-white",
                icon: "mdi-alert-circle",
                mode: "multi-line",
                position: "top",
                timeout: 7500,
                title: "Copied",
                visible: true
            };
        },
        async createLink(){
            this.dialog = true
            this.url_link = ''

            await axios.post(`${process.env.VUE_APP_URL}/api/v1/card_link_to_register`, {
                'patient_id': this.detailItem ? parseInt(this.detailItem.patient_id) : ''
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else if(res.data.error_message){
                    this.snackbar = {
                        color: "error text-white",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: res.data.error_message,
                        visible: true
                    };
                } else {
                    this.url_link = res.data.value.link
                }
            }).catch(err => {
                console.log(err.response);
            })
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
        async updateSubscriptionStatus(value){
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/patient/update_subscription_status`, {
                'id': this.detailItem ? parseInt(this.detailItem.patient_id) : '',
                'subscription_status': value === true ? 1 : 0,
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    
                    if (res.data.error_message) {
                        this.snackbar = {
                        color: "error text-white",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: res.data.error_message,
                        visible: true
                        };
                    } else {
                        this.subscription_status = value
                        this.getDetailPayment()
                        this.getPatientProfile()
                        this.snackbar = {
                            color: "success text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Success",
                            text: "Successfully update status",
                            visible: true
                        };
                    }
                    
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        payment(){
            this.dialog_payment = true
            console.log(this.subscription_status);
            this.paid = this.detailTransaction.paid
        },
        async pay(){
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/pay`, {
                'patient_id': this.detailItem ? parseInt(this.detailItem.patient_id) : '',
                'amount': this.detailTransaction ? parseInt(this.detailTransaction.price) : 0,
                'consultation_date': this.detailTransaction ? this.detailTransaction.consultation_date : 0
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    if (res.data.error_message.trim()) {
                        this.snackbar = {
                            color: "red text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: res.data.error_message,
                            visible: true
                        };
                    } else {
                        this.getDetailPayment()
                        this.getPatientProfile()

                        this.snackbar = {
                            color: "success text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Success",
                            text: "Successfully Paid",
                            visible: true
                        };
                        this.dialog_payment = false
                    }                                  
                    
                }
            }).catch(err => {
                console.log(err.response);
            })
        }, 
        async cancelPayment(){
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/cancel_payment`, {
                'patient_id': this.detailItem ? parseInt(this.detailItem.patient_id) : '',
                'amount': this.detailTransaction ? parseInt(this.detailTransaction.price) : 0,
                'consultation_date': this.detailTransaction ? this.detailTransaction.consultation_date : 0
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    if (res.data.error_message.trim()) {
                        this.snackbar = {
                            color: "red text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: res.data.error_message,
                            visible: true
                        };
                    } else {
                        this.getDetailPayment()
                        this.getPatientProfile()

                        this.snackbar = {
                            color: "success text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Success",
                            text: "注文のキャンセルに成功しました。",
                            visible: true
                        };
                        this.dialog_cancel_payment = false
                    }                    
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        async setShippingDate(){
            console.log(this.current_shipping_date, this.date)

            var date1 = new Date(this.current_shipping_date);
            var date2 = new Date(this.date);
            var diffTime = Math.abs(date1 - date2);
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");

            var diff = 0;

            if (date1 > date2) {
                diff = diff - (parseInt(diffDays) + 1)
            } else {
                diff = diff + (parseInt(diffDays) - 1) 
            }

            await axios.post(`${process.env.VUE_APP_URL}/api/v1/change_shipping_date_by_staff`, {
                'patient_id': this.detailItem ? parseInt(this.detailItem.patient_id) : '',
                'diff': diff
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    if (res.data.error_message.trim()) {
                        this.snackbar = {
                            color: "red text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: res.data.error_message,
                            visible: true
                        };
                    } else {
                        this.modal = false

                        this.getDetailPayment()
                        this.getPatientProfile()

                        this.snackbar = {
                            color: "success text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Success",
                            text: "Success change shipping date",
                            visible: true
                        };
                        this.dialog_cancel_payment = false
                    }                    
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        async setLastShippingDate(){
            // console.log(this.last_shipping_date, this.formatDate(this.last_date), this.detailTransaction.consultation_date);

            await axios.post(`${process.env.VUE_APP_URL}/api/v1/change_last_shipping_date_by_staff`, {
                'patient_id': this.detailItem ? parseInt(this.detailItem.patient_id) : '',
                'last_shipping_date': this.last_date ? this.formatDate(this.last_date) : '',
                'consultation_date': this.detailTransaction ? this.detailTransaction.consultation_date : ''
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                if (res.data.error_message === 'Expired Token' || res.data.error_message === 'Wrong Token') {
                    this.$store.dispatch("logoutAdmin").then(() => {
                        this.$router.push('/staff/login')
                    });
                } else {
                    if (res.data.error_message.trim()) {
                        this.snackbar = {
                            color: "red text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: res.data.error_message,
                            visible: true
                        };
                    } else {
                        this.last_modal = false

                        this.getDetailPayment()
                        this.getPatientProfile()

                        this.snackbar = {
                            color: "success text-white",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Success",
                            text: "Success change last shipping date",
                            visible: true
                        };
                        this.dialog_cancel_payment = false
                    }                    
                }
            }).catch(err => {
                console.log(err.response);
            })
        }
    },
    watch: {
        date (val) {
            this.shipping_date = this.formatDate(this.date)
        },
        last_date (val) {
            this.last_shipping_date = this.formatDate(this.last_date)
        },
        options: {
            handler () {
                const { page, itemsPerPage } = this.options
                this.searchItems(page, itemsPerPage)
            },
            deep: true,
        },
    }
  }
</script>
<style scoped>
.s {
  vertical-align: top;
}
</style>