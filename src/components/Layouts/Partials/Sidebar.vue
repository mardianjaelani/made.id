<template>
    <v-navigation-drawer v-model="$store.state.drawer" app :mini-variant="$store.state.mini" :expand-on-hover="$store.state.mini" mini-variant-width="70">
        <v-list-item class="pt-2">
            <v-list-item-icon class="mt-2 mr-3 mb-0">
                <v-img
                max-width="30"
                lazy-src="../../../assets/logo.png"
                src="../../../assets/logo.png"
                style="border-radius: 50%;"
                ></v-img>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>オンライン診療</v-list-item-title>
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

        <v-list shaped>
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
        <v-list shaped class="pt-0">
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
        <v-list shaped class="pt-0">
            <v-list-item
                v-for="item in itemes"
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
        <v-list shaped class="pt-0">
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
                { title: 'ホーム', icon: 'mdi-home', path: '/staff/dashboard' },
                { title: '予約', icon: 'mdi-calendar-check', path: '/staff/reservation' },
                { title: '来院者', icon: 'mdi-account-box', path: '/staff/visitor' }
            ],
            sidebars:[
                { title: '決済管理', icon: 'mdi-format-line-weight', path: '/staff/payment-manage', active: false,
                submenus: [
                    { title: '決済情報検索', icon: 'mdi-credit-card-outline', path: '/staff/payment-manage/search-info', active: false },
                    { title: '日計表アップロード', icon: 'mdi-cash-sync', path: '/staff/payment-manage/upload-info', active: false }
                ] },
                { title: 'マスター', icon: 'mdi-application', path: '/staff/master', active: false,
                submenus: [
                    { title: '施術', icon: 'mdi-doctor', path: '/staff/master/treatment', active: false },
                    { title: '薬剤', icon: 'mdi-pill', path: '/staff/master/medicine', active: false },
                    { title: '物品', icon: 'mdi-needle', path: '/staff/master/item', active: false },
                    { title: 'サロン', icon: 'mdi-bottle-tonic-plus-outline', path: '/staff/master/salon', active: false }
                ] },
            ],
            itemes: [
                { title: '売上管理', icon: 'mdi-account-wrench-outline', path: '/staff/sales' },
                // { title: '設定', icon: 'mdi-cog-outline', path: '/staff/setting' },
            ],
            settings:[
                { title: '設定', icon: 'mdi-cog-outline', path: '/staff/setting', active: false,
                submenus: [
                    { title: '来院者アップロード', icon: 'mdi-account-arrow-up-outline', path: '/staff/setting', active: false },
                    // { title: 'Video Stream', icon: 'mdi-video', path: '/staff/visitor/video-stream', active: false },
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

        this.itemes.forEach(element => {
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