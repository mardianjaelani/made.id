<template>
    <v-navigation-drawer v-model="$store.state.drawer" app :mini-variant="$store.state.mini" :expand-on-hover="$store.state.mini" mini-variant-width="70">
        <v-list-item class="pt-2">
            <v-list-item-icon class="mt-2 mr-3 mb-0">
                <v-img
                max-width="30"
                lazy-src="../../../assets/logo_made.png"
                src="../../../assets/logo_made.png"
                ></v-img>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Made.id</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider style="margin: 8px 0;"></v-divider>

        <v-list-item two-line style="padding: 0 8px;">
          <v-list-item-avatar>
            <img src="../../../assets/default-user.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{this.$store.state.admin.name}}</v-list-item-title>
            <v-list-item-subtitle>{{this.$store.state.admin.username}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list shaped dense>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="item.path"
                no-action
                color="secondary"
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-list shaped dense class="pt-0">
            <v-list-group
                v-for="item in sidebars"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.icon"
                no-action
                color="secondary"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="subItem in item.submenus"
                    :key="subItem.title"
                    :to="subItem.path"
                    v-model="subItem.active"
                >
                    <v-list-item-icon>
                        <v-icon>{{ subItem.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
        <v-list shaped dense class="pt-0 mt-0">
            <v-list-group
                v-for="item in settings"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.icon"
                no-action
                color="secondary"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="subItem in item.submenus"
                    :key="subItem.title"
                    :to="subItem.path"
                    v-model="subItem.active"
                >
                    <v-list-item-icon>
                        <v-icon>{{ subItem.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            menus: [],
            items: [
                { title: 'Dashboard', icon: 'mdi-home', path: '/staff/dashboard' },
                // { title: '予約', icon: 'mdi-calendar-check', path: '/staff/reservation' },
                // { title: '来院者', icon: 'mdi-account-box', path: '/staff/visitor' }
            ],
            sidebars:[
                { title: 'Transaksi', icon: 'mdi-format-line-weight', path: '/staff/payment-manage', active: false,
                submenus: [
                    { title: 'Penjualan', icon: 'mdi-credit-card-outline', path: '/staff/payment-manage/search-info', active: false },
                    { title: 'Pembelian', icon: 'mdi-cash-sync', path: '/staff/payment-manage/upload-info', active: false }
                ] },
                { title: 'Master', icon: 'mdi-application', path: '/staff/master', active: false,
                submenus: [
                    { title: 'Produk', icon: 'mdi-apple', path: '/staff/master/salon', active: false },
                    // { title: 'Harga Jual', icon: 'mdi-currency-usd', path: '/staff/master/treatment', active: false },
                    // { title: '薬剤', icon: 'mdi-pill', path: '/staff/master/medicine', active: false },
                    // { title: '物品', icon: 'mdi-needle', path: '/staff/master/item', active: false },
                ] },
            ],
            settings:[
                { title: 'Setting', icon: 'mdi-cog-outline', path: '/staff/setting', active: false,
                submenus: [
                    { title: 'Account', icon: 'mdi-account-arrow-up-outline', path: '/staff/setting', active: false },
                ] },
            ]
        }
    },
    mounted(){
        this.items.forEach(element => {
            let check = element.path
            if (check === window.location.pathname) {
                Object.assign(element, {active: true})
            }
        })

        this.sidebars.forEach(element => {
            let sidebar = element.submenus.filter(item => {
                return item.path == window.location.pathname
            })

            if (sidebar.length > 0) {
                Object.assign(element, {active: true})
                Object.assign(sidebar[0], {active: true})
            }
        })

        this.settings.forEach(element => {
            let sidebar = element.submenus.filter(item => {
                return item.path == window.location.pathname
            })

            if (sidebar.length > 0) {
                Object.assign(element, {active: true})
                Object.assign(sidebar[0], {active: true})
            }
        })
    },
    methods:{
    },
}
</script>