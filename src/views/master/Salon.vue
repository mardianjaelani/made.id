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
        <v-row class="mt-8" align="center" justify="center" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.AgencyName") }}</h6>
                    <v-text-field
                        solo
                        :label="$t('labels.AgencyName')"
                        persistent-hint
                        required
                        v-model="AgencyName"
                        class="ma-0 pa-0 border-12 border-12"
                        hide-details=true
                    >
                    </v-text-field>
                </div>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.salonCode") }}</h6>
                    <v-text-field
                        solo
                        :label="$t('labels.salonCode')"
                        persistent-hint
                        required
                        v-model="salonCode"
                        class="ma-0 pa-0 border-12 border-12"
                        hide-details=true
                    >
                    </v-text-field>
                </div>
            </v-col>
        </v-row>
        <v-row class="mt-8" align="center" justify="center" v-show="display === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.BranchName") }}</h6>
                    <v-text-field
                        solo
                        :label="$t('labels.BranchName')"
                        persistent-hint
                        required
                        v-model="BranchName"
                        class="ma-0 pa-0 border-12 border-12"
                        hide-details=true
                    >
                    </v-text-field>
                </div>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="5" class="pt-0 pb-0">
                <div class="d-flex">
                    <h6 class="blue-lcd mr-5 mt-3">{{ $t("labels.SalonName") }}</h6>
                    <v-text-field
                        solo
                        :label="$t('labels.SalonName')"
                        persistent-hint
                        required
                        v-model="SalonName"
                        class="ma-0 pa-0 border-12 border-12"
                        hide-details=true
                    >
                    </v-text-field>
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
                    <v-card-title>
                        <v-row>
                            <v-col cols="12" class="text-right">
                                <v-btn color="secondary" class="text-white border-12" height="50px" @click="addSalon()">
                                    <v-icon>mdi-plus</v-icon> サロン
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="salons"
                            :options.sync="options"
                            :loading="loading"
                            loading-text="Please wait, retrieving data"
                            :server-items-length="totalItems"
                            :page.sync="pagination"
                            :search="search"
                            page-count="10"
                            class="elevation-1"
                        >
                            <template v-slot:[`header.agency_code`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.agency_name`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.salon_code`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.salon_name`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.branch_name`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.referral_fee`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.initial_fee`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`header.register_date`]="{ header }">
                                <button @click="sortByFunc(header.value)">{{header.text}}</button>
                                    <i v-if="sortBy === 'desc'" aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light" style="font-size: 18px;"></i>
                                    <i v-else aria-hidden="true"  @click="sortByFunc(header.value)" class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-down theme--light" style="font-size: 18px;"></i>
                            </template>
                            <template v-slot:[`item.action`]="{ item }">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon small class="mr-2" @click="showItem(item)" v-on="on">
                                            mdi-pencil
                                        </v-icon>
                                    </template>
                                    <span>Edit</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-10" v-show="displayAdd === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="12" md="12" class="pt-0 pb-0">
                <v-card class="rounded-xl">
                    <v-card-title>
                        <v-row align="center" justify="center" style="margin-top: -16px;">
                            <v-col cols="12" xs="12" sm="6" md="3" style="background: #e83e8c;border-bottom-left-radius: 30px;border-bottom-right-radius: 30px;">
                                <h4 class="text-white text-center" style="font-weight:700">
                                    サロン
                                </h4>
                                <h5 class="text-white text-center">サロン</h5>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <validation-observer
                            ref="observer"
                            v-slot="{ invalid }"
                        >
                            <form @submit.prevent="submit">
                                <v-container>
                                    <v-row class="mt-12">
                                        <v-col cols="12" xs="12" sm="6" md="4">
                                            <h6 class="blue-lcd">{{ $t("labels.salonCode") }}</h6>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                :name="$t('labels.salonCode')"
                                                rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.salonCode')"
                                                    persistent-hint
                                                    v-model="salon_code"
                                                    class="ma-0 pa-0 border-12"
                                                    :error-messages="errors"
                                                >
                                                </v-text-field> 
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="4">
                                            <h6 class="blue-lcd">{{ $t("labels.AgencyCode") }}</h6>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                :name="$t('labels.AgencyCode')"
                                                rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.AgencyCode')"
                                                    persistent-hint
                                                    v-model="agency_code"
                                                    class="ma-0 pa-0 border-12"
                                                    :error-messages="errors"
                                                >
                                                </v-text-field> 
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="4">
                                            <h6 class="blue-lcd">{{ $t("labels.AgencyName") }}</h6>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                :name="$t('labels.AgencyName')"
                                                rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.AgencyName')"
                                                    persistent-hint
                                                    v-model="agency_name"
                                                    class="ma-0 pa-0 border-12"
                                                    :error-messages="errors"
                                                >
                                                </v-text-field> 
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="3">
                                            <h6 class="blue-lcd">{{ $t("labels.SalonName") }}</h6>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                :name="$t('labels.SalonName')"
                                                rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.SalonName')"
                                                    persistent-hint
                                                    v-model="salon_name"
                                                    class="ma-0 pa-0 border-12"
                                                    :error-messages="errors"
                                                >
                                                </v-text-field> 
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="3">
                                            <h6 class="blue-lcd">{{ $t("labels.BranchName") }}</h6>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                :name="$t('labels.BranchName')"
                                                rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.BranchName')"
                                                    persistent-hint
                                                    v-model="branch_name"
                                                    class="ma-0 pa-0 border-12"
                                                    :error-messages="errors"
                                                >
                                                </v-text-field> 
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="3">
                                            <h6 class="blue-lcd">{{ $t("labels.ReferralFee") }}</h6>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                :name="$t('labels.ReferralFee')"
                                                rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.ReferralFee')"
                                                    persistent-hint
                                                    v-model="referral_fee"
                                                    class="ma-0 pa-0 border-12"
                                                    :error-messages="errors"
                                                >
                                                </v-text-field> 
                                            </validation-provider>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="3">
                                            <h6 class="blue-lcd">{{ $t("labels.InitialFee") }}</h6>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                :name="$t('labels.InitialFee')"
                                                rules="required"
                                            >
                                                <v-text-field
                                                    solo
                                                    :label="$t('labels.InitialFee')"
                                                    persistent-hint
                                                    v-model="initial_fee"
                                                    class="ma-0 pa-0 border-12"
                                                    :error-messages="errors"
                                                >
                                                </v-text-field> 
                                            </validation-provider>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="center" class="mt-lg-12">
                                        <v-col cols="12" xs="12" sm="6" md="2">
                                            <v-btn block class="rounded-l p-4 text-h6" color="#fff" @click="close()">{{ $t("buttons.back") }}</v-btn>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="6" md="2">
                                            <v-btn block class="rounded-l text-white p-4 text-h6" color="#e83e8c" type="submit" :disabled="invalid">{{ $t("buttons.save") }}</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </form>
                        </validation-observer>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-10" v-show="displayEdit === 'block' ? true : false">
            <v-col cols="12" xs="12" sm="12" md="12" class="pt-0 pb-0">
                <v-card class="rounded-xl">
                    <v-card-title>
                        <v-row align="center" justify="center" style="margin-top: -16px;">
                            <v-col cols="12" xs="12" sm="6" md="3" style="background: #e83e8c;border-bottom-left-radius: 30px;border-bottom-right-radius: 30px;">
                                <h4 class="text-white text-center" style="font-weight:700">
                                    サロン
                                </h4>
                                <h5 class="text-white text-center">サロン</h5>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <form @submit.prevent="submitEdit">
                            <v-container>
                                <v-row class="mt-12">
                                    <v-col cols="12" xs="12" sm="6" md="4">
                                        <h6 class="blue-lcd">{{ $t("labels.salonCode") }}</h6>
                                        <validation-provider
                                            v-slot="{ errors }"
                                            :name="$t('labels.salonCode')"
                                            rules="required"
                                        >
                                            <v-text-field
                                                solo
                                                :label="$t('labels.salonCode')"
                                                persistent-hint
                                                v-model="salon_code_edit"
                                                class="ma-0 pa-0 border-12"
                                                :error-messages="errors"
                                            >
                                            </v-text-field> 
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="4">
                                        <h6 class="blue-lcd">{{ $t("labels.AgencyCode") }}</h6>
                                        <validation-provider
                                            v-slot="{ errors }"
                                            :name="$t('labels.AgencyCode')"
                                            rules="required"
                                        >
                                            <v-text-field
                                                solo
                                                :label="$t('labels.AgencyCode')"
                                                persistent-hint
                                                v-model="agency_code_edit"
                                                class="ma-0 pa-0 border-12"
                                                :error-messages="errors"
                                            >
                                            </v-text-field> 
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="4">
                                        <h6 class="blue-lcd">{{ $t("labels.AgencyName") }}</h6>
                                        <validation-provider
                                            v-slot="{ errors }"
                                            :name="$t('labels.AgencyName')"
                                            rules="required"
                                        >
                                            <v-text-field
                                                solo
                                                :label="$t('labels.AgencyName')"
                                                persistent-hint
                                                v-model="agency_name_edit"
                                                class="ma-0 pa-0 border-12"
                                                :error-messages="errors"
                                            >
                                            </v-text-field> 
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="3">
                                        <h6 class="blue-lcd">{{ $t("labels.SalonName") }}</h6>
                                        <validation-provider
                                            v-slot="{ errors }"
                                            :name="$t('labels.SalonName')"
                                            rules="required"
                                        >
                                            <v-text-field
                                                solo
                                                :label="$t('labels.SalonName')"
                                                persistent-hint
                                                v-model="salon_name_edit"
                                                class="ma-0 pa-0 border-12"
                                                :error-messages="errors"
                                            >
                                            </v-text-field> 
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="3">
                                        <h6 class="blue-lcd">{{ $t("labels.BranchName") }}</h6>
                                        <validation-provider
                                            v-slot="{ errors }"
                                            :name="$t('labels.BranchName')"
                                            rules="required"
                                        >
                                            <v-text-field
                                                solo
                                                :label="$t('labels.BranchName')"
                                                persistent-hint
                                                v-model="branch_name_edit"
                                                class="ma-0 pa-0 border-12"
                                                :error-messages="errors"
                                            >
                                            </v-text-field> 
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="3">
                                        <h6 class="blue-lcd">{{ $t("labels.ReferralFee") }}</h6>
                                        <validation-provider
                                            v-slot="{ errors }"
                                            :name="$t('labels.ReferralFee')"
                                            rules="required"
                                        >
                                            <v-text-field
                                                solo
                                                :label="$t('labels.ReferralFee')"
                                                persistent-hint
                                                v-model="referral_fee_edit"
                                                class="ma-0 pa-0 border-12"
                                                :error-messages="errors"
                                            >
                                            </v-text-field> 
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="3">
                                        <h6 class="blue-lcd">{{ $t("labels.InitialFee") }}</h6>
                                        <validation-provider
                                            v-slot="{ errors }"
                                            :name="$t('labels.InitialFee')"
                                            rules="required"
                                        >
                                            <v-text-field
                                                solo
                                                :label="$t('labels.InitialFee')"
                                                persistent-hint
                                                v-model="initial_fee_edit"
                                                class="ma-0 pa-0 border-12"
                                                :error-messages="errors"
                                            >
                                            </v-text-field> 
                                        </validation-provider>
                                    </v-col>
                                </v-row>
                                <v-row justify="center" class="mt-lg-12">
                                    <v-col cols="12" xs="12" sm="6" md="2">
                                        <v-btn block class="rounded-l p-4 text-h6" color="#fff" @click="close()">{{ $t("buttons.back") }}</v-btn>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="2">
                                        <v-btn block class="rounded-l text-white p-4 text-h6" color="#e83e8c" type="submit">{{ $t("buttons.save") }}</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </form>
                    </v-card-text>
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
import { required, digits, email, max, regex, numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
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

extend('numeric', {
    ...numeric,
    message: '{_field_} must be numeric',
})

export default {
    components: {
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
                    text: 'マスター',
                    disabled: true,
                    href: 'breadcrumbs_link_2',
                },
                {
                    text: 'サロン',
                    disabled: true,
                    href: 'breadcrumbs_link_2',
                }
            ],
            display: 'block',
            displayAdd: 'none',
            displayEdit: 'none',
            AgencyName: '',
            salonCode: '',
            BranchName: '',
            SalonName: '',
            salons: [],
            headers: [
                { text: '代理店コード', value: 'agency_code', sortable: false },
                { text: '代理店名', value: 'agency_name', sortable: false },
                { text: 'サロンコード', value: 'salon_code', sortable: false },
                { text: 'サロン名', value: 'salon_name', sortable: false },
                { text: '営業所名', value: 'branch_name', sortable: false },
                { text: '再診フィー', value: 'referral_fee', sortable: false },
                { text: '初診フィー', value: 'initial_fee', sortable: false },
                { text: '登録日', value: 'register_date', sortable: false },
                { text: '', value: 'action', sortable: false }
            ],
            options: {},
            loading: false,
            totalItems: 10,
            pagination: 1,
            search: '',
            sortBy: 'asc',
            sortName: 'agency_name',
            salon_code: '',
            agency_code: '',
            agency_name: '',
            salon_name: '',
            branch_name: '',
            referral_fee: '',
            initial_fee: '',
            salon_code_edit: '',
            agency_code_edit: '',
            agency_name_edit: '',
            salon_name_edit: '',
            branch_name_edit: '',
            referral_fee_edit: '',
            initial_fee_edit: '',
            editItem: null
        }
    },
    mounted() {
    },
    methods:{
        addSalon(){
            this.displayAdd = 'block'
            this.display = 'none'
            this.displayEdit = 'none'
        },
        close(){
            this.displayAdd = 'none'
            this.displayEdit = 'none'
            this.display = 'block'
            this.searchItems(1, 10)
        },
        showItem(value){
            this.salon_code_edit = value.salon_code
            this.agency_code_edit = value.agency_code
            this.agency_name_edit = value.agency_name
            this.branch_name_edit = value.branch_name
            this.initial_fee_edit = value.initial_fee
            this.referral_fee_edit = value.referral_fee
            this.salon_name_edit = value.salon_name

            this.displayAdd = 'none'
            this.displayEdit = 'block'
            this.display = 'none'
            this.editItem = value

        },
        clearAdd(){
            this.salon_code = ''
            this.agency_code = ''
            this.agency_name = ''
            this.branch_name = ''
            this.initial_fee = ''
            this.referral_fee = ''
            this.salon_name = ''
        },
        clear(){
            this.AgencyName = ''
            this.salonCode = ''
            this.BranchName = ''
            this.SalonName = ''
        },
        sortByFunc(sortBy){
            this.sortBy = this.sortBy === 'desc' ? 'asc' : 'desc';
            this.sortName = sortBy
            this.salons = []
            this.searchItems(1, 10)
        },
        async submit(){
            this.$refs.observer.validate()  

            await axios.post(`${process.env.VUE_APP_URL}/api/v1/insert_salon`, {
                'salon_code': this.salon_code,
                'agency_code': this.agency_code,
                'agency_name': this.agency_name,
                'salon_name': this.salon_name,
                'branch_name': this.branch_name,
                'referral_fee' : parseInt(this.referral_fee),
                'initial_fee': parseInt(this.initial_fee)
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                console.log(res.data);
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
                    this.clearAdd()
                    this.snackbar = {
                        color: "primary text-white",
                        icon: "mdi-checkbox-marked-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Success",
                        text: "Successfully Add サロン",
                        visible: true
                    };
                    this.close()
                }
            }).catch(err => {
                console.log(err.response);
            })
            
        },
        async submitEdit(){
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/update_salon`, {
                'salon_code': this.salon_code_edit,
                'agency_code': this.agency_code_edit,
                'agency_name': this.agency_name_edit,
                'salon_name': this.salon_name_edit,
                'branch_name': this.branch_name_edit,
                'referral_fee' : parseInt(this.referral_fee_edit),
                'initial_fee': parseInt(this.initial_fee_edit)
            }, { 
                headers: { Authorization: `${this.$store.getters.isTokenAdmin}` } 
            })
            .then(res => {
                console.log(res.data);
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
                    this.clearAdd()
                    this.snackbar = {
                        color: "primary text-white",
                        icon: "mdi-checkbox-marked-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Success",
                        text: "Successfully update サロン",
                        visible: true
                    };
                    this.close()
                }
            }).catch(err => {
                console.log(err.response);
            })
        },
        async searchItems(page = 1, itemsPerPage = 10){
            this.loading = true
            this.pagination = page
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/salons`, {
                'salon_code': this.salonCode,
                'agency_name': this.AgencyName,
                'branch_name': this.BranchName,
                'salon_name': this.SalonName,
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
                    this.salons = res.data.value
                }
            }).catch(err => {
                console.log(err.response);
            })
        }
    },
    watch: {
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