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
        <v-row class="mt-1" align="center" justify="center" v-show="dialog">
            <v-col cols="12" xs="12" sm="12" md="10">
                <v-text-field
                    solo
                    :label="$t('labels.freeWordSearch')"
                    persistent-hint
                    required
                    v-model="search"
                    @keyup.enter="searchItems()"
                    class="ma-0 pa-0 border-12 text-right"
                    height="60"
                    append-icon="mdi-magnify"
                    hide-details
                >
                </v-text-field> 
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="10">
                <v-row class="text-right"  justify='end'>
                    <v-col cols="12" xs="12" sm="12" md="2">
                        <v-btn block color="secondary" class="text-white border-12" height="50px" @click="addItem()">
                            <v-icon>mdi-plus</v-icon> {{$t('labels.AddNewTreetment')}}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        
        <v-row class="mt-10" align="center" justify="center" v-if="dialog">
            <v-col cols="12" xs="12" sm="12" md="10">
                <v-card class="rounded-l" style="border-top: 3px solid #e83e8c;">
                    <v-card-text>
                        <v-simple-table
                            fixed-header
                        >
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            名前
                                        </th>
                                        <th class="text-left">
                                            編集
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                    v-for="treatment in treatments"
                                    :key="treatment.id"
                                    >
                                    <td>{{ treatment.name }}</td>
                                    <td>
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-icon small color="secondary" class="mr-2" @click="editItem(treatment)" v-on="on">
                                                    mdi-application-edit-outline
                                                </v-icon>
                                            </template>
                                            <span>編集</span>
                                        </v-tooltip>
                                    </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-show="dialogItem">
            <v-col cols="12">
                <v-card class="elevation-12 rounded-l" style="border-top: 3px solid #e83e8c;">
                    <v-card-title >
                        {{$t('labels.Information')}}
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
                            <v-row>
                                <v-col cols="12">
                                    <h6 class="font-weight-bold">{{$t('labels.CheckStock')}}</h6>                                    
                                </v-col>
                                <v-col cols="12" class="">
                                    <h6 class="blue-lcd">{{$t('labels.name')}}</h6>
                                    <v-text-field
                                        solo
                                        :label="$t('labels.name')"
                                        persistent-hint
                                        required
                                        v-model="name"
                                        class="ma-0 pa-0 border-12"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <h6 class="blue-lcd">{{$t('labels.PriceList')}}</h6>
                                    <v-simple-table
                                        fixed-header
                                    >
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-left">
                                                        {{$t('labels.name')}}
                                                    </th>
                                                    <th class="text-left">
                                                        回数
                                                    </th>
                                                    <th class="text-left">
                                                        {{$t('labels.price')}}
                                                    </th>
                                                    <th class="text-center">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="(stock, index) in stocks"
                                                    :key="index"
                                                >
                                                    <td>{{ stock.name }}</td>
                                                    <td>
                                                        {{ stock.stock }}
                                                    </td>
                                                    <td>
                                                        {{ stock.price }}
                                                    </td>
                                                    <td class="text-center">
                                                        <v-tooltip top class="pr-5">
                                                            <template v-slot:activator="{ on }">
                                                                <v-icon @click="deleteItem(stock, index)" v-on="on" color="error">
                                                                    mdi-trash-can-outline
                                                                </v-icon>
                                                            </template>
                                                            <span>{{$t('buttons.delete')}}</span>
                                                        </v-tooltip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <v-text-field
                                                            solo
                                                            persistent-hint
                                                            required
                                                            v-model="stock_name"
                                                            hide-details=true
                                                            class="mt-2 mb-2 border-12"
                                                        ></v-text-field>
                                                    </td>
                                                    <td>
                                                        <v-text-field
                                                            solo
                                                            persistent-hint
                                                            required
                                                            v-model="stock_stock"
                                                            hide-details=true
                                                            class="mt-2 mb-2 border-12"
                                                        ></v-text-field>
                                                    </td>
                                                    <td>
                                                        <v-text-field
                                                            solo
                                                            persistent-hint
                                                            required
                                                            v-model="stock_price"
                                                            hide-details=true
                                                            class="mt-2 mb-2 border-12"
                                                        ></v-text-field>
                                                    </td>
                                                    <td>
                                                        <v-btn block color="secondary" class="text-white border-12" height="50px" @click="addItemPrice()">
                                                            <v-icon>mdi-plus</v-icon>
                                                        </v-btn>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-divider dark></v-divider>
                    <v-card-actions color="grey">
                        <v-btn color="green" class="text-white border-12" height="40px">
                            <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="red" class="text-white border-12" height="40px">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
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
                    text: 'マスター',
                    disabled: true,
                    href: 'breadcrumbs_link_2',
                },
                {
                    text: '施術',
                    disabled: true,
                    href: 'breadcrumbs_link_2',
                }
            ],
            search: '',
            sortBy: 'desc',
            sortName: 'name',
            headers:[
                { text: '名前', value: 'name', sortable: true },
                { text: '編集', value: 'action', sortable: false, align:"center" },
            ],
            treatments: [],
            options: {},
            loading: false,
            totalItems: 10,
            pagination: 1,
            dialog: true,
            dialogItem: false,
            name: '',
            stocks: [
                {
                    id: 1,
                    name: 'AGAオンラインカウンセリング初診',
                    stock: 2,
                    price: 5200
                }
            ],
            stock_name: '',
            stock_stock: '',
            stock_price: ''
          }
      },
      mounted() {
        this.searchItems()
      },
      methods:{
        close(){
            this.dialogItem = false
            this.dialog = true
            this.name = ''
            this.searchItems()
        },
        addItem(){
            this.dialogItem = true
            this.dialog = false
            this.name = ''
        },
        editItem(item){
            this.dialogItem = true
            this.dialog = false
            this.name = item.name
        },
        async searchItems(){
            this.loading = true
            await axios.post(`${process.env.VUE_APP_URL}/api/v1/sell_entity_treatment`, {
                'name': this.search ? this.search : '',
                'sort_key': this.sortName,
                'order' : this.sortBy
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
                    this.treatments = res.data.value
                }
                
            }).catch(err => {
                console.log(err.response);
            })
        },
        sortByFunc(sortBy){
            this.sortBy = this.sortBy === 'desc' ? 'asc' : 'desc';
            this.sortName = sortBy
            this.treatments = []
            this.searchItems(1, 10)
        },
        addItemPrice(){
            this.stocks.push(
                { 
                    id : this.stocks.length + 1,
                    name: this.stock_name,
                    stock: this.stock_stock,
                    price: this.stock_price
                }
            );
            this.stock_name = ''
            this.stock_stock = ''
            this.stock_price = ''
        },
        deleteItem(stock, index){
            this.stocks.splice(index, 1);
        }
      },
      watch: {
        // options: {
        //     handler () {
        //         const { page, itemsPerPage } = this.options
        //         this.searchItems(page, itemsPerPage)
        //     },
        //     deep: true,
        // },
      }
    }
  </script>